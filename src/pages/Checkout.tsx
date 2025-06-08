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
  const { items, totalPrice, clearCart } = useCart();
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
          total_amount: totalPrice,
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
      // Create order first
      const order = await createOrder();
      if (!order) {
        setLoading(false);
        return;
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
        amount: Math.round(totalPrice * 100), // Amount in paise
        currency: 'INR',
        name: 'Nutriio',
        description: 'Healthy Food Products',
        image: '/favicon.ico',
        handler: async (response: RazorpayResponse) => {
          try {
            console.log('Payment successful:', response);
            
            // Update order status
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
        notes: {
          order_id: order.id,
          order_number: order.order_number
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
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Delivery Details */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700 text-lg md:text-xl">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.length > 0 && (
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
              )}

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
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700 text-lg md:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-48 overflow-y-auto space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <hr className="border-orange-200" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-600">₹{totalPrice.toFixed(2)}</span>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
              >
                {loading ? 'Processing...' : `Pay ₹${totalPrice.toFixed(2)}`}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
