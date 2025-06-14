import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, shippingCost } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">Add some healthy products to get started!</p>
          <Button onClick={() => navigate('/products')} className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
            Shop Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Cart View */}
          <div className="lg:hidden space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    {item.weight && (
                      <p className="text-gray-600 text-sm">Weight: {item.weight} gm</p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Cart View */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600">₹{item.price}</p>
                          {item.weight && (
                            <p className="text-gray-600 text-sm">Weight: {item.weight} gm</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Order Summary</h2>
              
              {/* Items Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span>₹{totalPrice}</span>
                </div>
                
                {/* Weight Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Weight Summary</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span>{item.weight ? `${parseInt(item.weight) * item.quantity} gm` : 'N/A'}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between font-medium">
                        <span>Total Weight</span>
                        <span>{items.reduce((sum, item) => sum + (parseInt(item.weight || '0') * item.quantity), 0)} gm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Cost */}
                <div className="bg-orange-50 rounded-lg p-4">
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
              </div>

              {/* Total */}
              <div className="border-t pt-4 space-y-2">
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

              <Button
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
