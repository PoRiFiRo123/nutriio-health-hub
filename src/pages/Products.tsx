import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';
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
}

interface Category {
  id: string;
  name: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let { data: productsData, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      if (productsData) {
        setProducts(productsData);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      let { data: categoriesData, error } = await supabase
        .from('categories')
        .select('*');

      if (error) throw error;

      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error.message);
    }
  };

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

  const filteredProducts = products.filter(product => {
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === '' || product.category_id === selectedCategory;
    return searchMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search and Filter Section */}
        <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center">
          {/* Search Bar */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-span-1 md:col-span-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-md border border-gray-200 bg-white focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-xl">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const itemQuantity = getItemQuantity(product.id);
              
              return (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <CardContent className="p-0 relative">
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden bg-white">
                      <img
                        src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-lg leading-tight line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-xs lg:text-sm line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg lg:text-xl font-bold text-orange-600">
                          ₹{product.price}
                        </div>
                        {product.rating && (
                          <div className="flex items-center text-yellow-500">
                            <span className="text-xs lg:text-sm">★ {product.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Cart Actions */}
                      <div className="pt-2">
                        {itemQuantity === 0 ? (
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.in_stock}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-sm lg:text-base h-9 lg:h-10"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        ) : (
                          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md h-9 lg:h-10 px-2">
                            <button
                              className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                              onClick={() => handleQuantityChange(product, -1)}
                            >
                              <Minus className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600" />
                            </button>
                            
                            <span className="font-bold text-orange-600 text-sm lg:text-base">
                              {itemQuantity} in cart
                            </span>
                            
                            <button
                              className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                              onClick={() => handleQuantityChange(product, 1)}
                            >
                              <Plus className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className="text-xs lg:text-sm">
                        {product.in_stock ? (
                          <span className="text-orange-600">✓ In Stock</span>
                        ) : (
                          <span className="text-red-600">✗ Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* No Products Found */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-8">
            <div className="text-xl">No products found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
