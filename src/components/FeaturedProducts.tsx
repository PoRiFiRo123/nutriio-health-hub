import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  rating: number;
  stock: number;
  in_stock: boolean;
  slug: string;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(8);

        if (error) {
          console.error("Error fetching products:", error);
        }

        if (data) {
          setProducts(data as Product[]);
        }
      } catch (error) {
        console.error("Unexpected error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleQuantityChange = (product: Product, change: number) => {
    const currentQuantity = getItemQuantity(product.id);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity >= 0) {
      updateQuantity(product.id, newQuantity);
      
      if (change > 0) {
        toast({
          title: "Item added",
          description: `${product.name} quantity increased.`,
          duration: 2000,
        });
      } else if (newQuantity === 0) {
        toast({
          title: "Removed from cart",
          description: `${product.name} has been removed from your cart.`,
          duration: 2000,
        });
      } else {
        toast({
          title: "Item removed",
          description: `${product.name} quantity decreased.`,
          duration: 2000,
        });
      }
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-gray-500">Explore our curated selection of top-rated products</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => {
            const itemQuantity = getItemQuantity(product.id);
            
            return (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="font-bold text-orange-600 text-sm sm:text-base">
                      ₹{product.price}
                    </div>

                    {itemQuantity === 0 ? (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.in_stock}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm h-8 sm:h-9"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md h-8 sm:h-9 px-1 sm:px-2">
                        <button
                          className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                          onClick={() => handleQuantityChange(product, -1)}
                        >
                          <Minus className="w-3 h-3 text-orange-600" />
                        </button>
                        
                        <span className="font-bold text-orange-600 text-xs sm:text-sm px-1">
                          {itemQuantity}
                        </span>
                        
                        <button
                          className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                          onClick={() => handleQuantityChange(product, 1)}
                        >
                          <Plus className="w-3 h-3 text-orange-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
