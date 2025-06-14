import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface Address {
  id: string;
  type: string;
  full_name: string;
  phone_number: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, shippingCost, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAddresses();
      fetchProfile();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      
      setAddresses(data || []);
      if (data && data.length > 0) {
        const defaultAddress = data.find(addr => addr.is_default) || data[0];
        setSelectedAddressId(defaultAddress.id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setCustomerDetails(prev => ({
          ...prev,
          name: data.full_name || '',
          email: user?.email || '',
          phone: data.phone_number || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!selectedAddress && (!customerDetails.name || !customerDetails.address)) {
      toast({
        title: "Missing Information",
        description: "Please select an address or fill in delivery details",
        variant: "destructive"
      });
      return null;
    }

    try {
      // Generate order number
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');

      if (orderNumberError) throw orderNumberError;

      // Create order in database
      const shippingAddress = selectedAddress ? {
        full_name: selectedAddress.full_name,
        phone_number: selectedAddress.phone_number,
        address_line_1: selectedAddress.address_line_1,
        address_line_2: selectedAddress.address_line_2,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postal_code: selectedAddress.postal_code,
        country: selectedAddress.country
      } : {
        full_name: customerDetails.name,
        phone_number: customerDetails.phone,
        address_line_1: customerDetails.address,
        city: customerDetails.city,
        postal_code: customerDetails.pincode,
        state: 'Unknown',
        country: 'India'
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          order_number: orderNumberData,
          total_amount: totalPrice + shippingCost,
          shipping_address: shippingAddress,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
        amount: Math.round((totalPrice + shippingCost) * 100), // Amount in paise
        currency: 'INR',
        name: 'Nutriio',
        description: 'Healthy Food Products',
        image: '/favicon.ico',
        handler: async (response: RazorpayResponse) => {
          try {
            console.log('Payment successful:', response);
            
            // Create order only after successful payment
            const order = await createOrder();
            if (!order) {
              throw new Error('Failed to create order');
            }

            // Update order with payment details
            await supabase
              .from('orders')
              .update({
                razorpay_payment_id: response.razorpay_payment_id,
                payment_status: 'paid',
                status: 'confirmed'
              })
              .eq('id', order.id);

            clearCart();
            navigate('/payment/success');
          } catch (error) {
            console.error('Payment update error:', error);
            navigate('/payment/failure');
          }
        },
        prefill: {
          name: customerDetails.name || user.email,
          email: user.email,
          contact: customerDetails.phone
        },
        theme: {
          color: '#ea580c'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            navigate('/payment/failure');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      navigate('/payment/failure');
      setLoading(false);
    }
  };

  const isEligibleForOnlinePayment = (postalCode: string) => {
    return postalCode.startsWith('5600');
  };

  const handleWhatsAppBooking = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    const postalCode = selectedAddress?.postal_code || customerDetails.pincode;
    const name = selectedAddress?.full_name || customerDetails.name;
    const phone = selectedAddress?.phone_number || customerDetails.phone;
    const address = selectedAddress ? 
      `${selectedAddress.address_line_1}, ${selectedAddress.city}` : 
      `${customerDetails.address}, ${customerDetails.city}`;

    const message = `Hello, I would like to place an order:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Address: ${address}\n` +
      `Postal Code: ${postalCode}\n\n` +
      `Order Items:\n${items.map(item => 
        `${item.name} x ${item.quantity}${item.weight ? ` (${item.weight} gm)` : ''} = ₹${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')}\n\n` +
      `Total Amount: ₹${(totalPrice + shippingCost).toFixed(2)}`;

    const whatsappUrl = `https://wa.me/917259232905?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-orange-600">Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/products')} className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 w-full sm:w-auto">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
              
              <div>
                <Label htmlFor="address-select">Select Delivery Address</Label>
                <Select value={selectedAddressId} onValueChange={setSelectedAddressId}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-500">
                    <SelectValue placeholder="Select an address" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((address) => (
                      <SelectItem key={address.id} value={address.id}>
                        {address.type.charAt(0).toUpperCase() + address.type.slice(1)} - {address.address_line_1}, {address.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(!addresses.length || !selectedAddressId) && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="border-orange-200 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="border-orange-200 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={customerDetails.address}
                      onChange={handleInputChange}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={customerDetails.city}
                        onChange={handleInputChange}
                        className="border-orange-200 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={customerDetails.pincode}
                        onChange={handleInputChange}
                        className="border-orange-200 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {addresses.length === 0 && (
                <div className="text-center py-4 border border-orange-200 rounded-lg bg-orange-50">
                  <p className="text-sm text-orange-700 mb-2">No saved addresses found</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/profile?tab=addresses')}
                    className="border-orange-300 text-orange-700"
                  >
                    Add Address in Profile
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Order Summary</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="mt-1 space-y-1">
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        {item.weight && (
                          <p className="text-xs text-gray-600">
                            Weight: {parseInt(item.weight) * item.quantity} gm
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-sm">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Weight Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Weight Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Weight</span>
                    <span className="font-medium">
                      {items.reduce((sum, item) => sum + (parseInt(item.weight || '0') * item.quantity), 0)} gm
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Cost */}
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Shipping Cost</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {(() => {
                        const totalWeight = items.reduce((sum, item) => sum + (parseInt(item.weight || '0') * item.quantity), 0);
                        if (totalWeight < 3000) return 'Standard delivery (0-3kg)';
                        if (totalWeight < 7000) return 'Medium delivery (3-7kg)';
                        if (totalWeight < 15000) return 'Large delivery (7-15kg)';
                        return 'Extra large delivery (15kg+)';
                      })()}
                    </p>
                  </div>
                  <span className="font-medium">₹{shippingCost}</span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shippingCost}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-orange-600">₹{totalPrice + shippingCost}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="mt-6 space-y-3">
                {isEligibleForOnlinePayment ? (
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={handlePayment}
                    disabled={loading || !selectedAddressId}
                  >
                    {loading ? 'Processing...' : `Pay ₹${(totalPrice + shippingCost).toFixed(2)}`}
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleWhatsAppBooking}
                    disabled={loading || !selectedAddressId}
                  >
                    Book via WhatsApp
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
