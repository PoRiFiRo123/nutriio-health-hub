import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, ShoppingCart, Heart, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/use-mobile';
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

interface Category {
  id: string;
  name: string;
}

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      if (data && Array.isArray(data)) {
        setProducts(data as Product[]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      if (data && Array.isArray(data)) {
        setCategories(data as Category[]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      const category = categories.find(cat => cat.name === selectedCategory);
      if (category) {
        filtered = filtered.filter(product => product.category_id === category.id);
      }
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const currentQuantity = getItemQuantity(productId);
    const newQuantity = currentQuantity + change;
    const product = products.find(p => p.id === productId);
    
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
      
      if (product) {
        if (change > 0) {
          toast({
            title: "Added to cart",
            description: `${product.name} quantity increased`,
            duration: 3000,
          });
        } else if (newQuantity === 0) {
          toast({
            title: "Removed from cart",
            description: `${product.name} has been removed from your cart`,
            duration: 3000,
          });
        } else {
          toast({
            title: "Updated cart",
            description: `${product.name} quantity decreased`,
            duration: 3000,
          });
        }
      }
    }
  };

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">
              Our <span className="text-orange-600">Products</span>
            </h1>
          </div>  
          <p className="text-gray-600 text-lg mt-4">
            Discover our range of healthy, natural products for your family
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Row Above Product Grid */}
        {/* {selectedCategory !== 'all' && (
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-orange-600 capitalize">{selectedCategory}</span>
            <span className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</span>
          </div>
        )} */}
        {/* Mobile Filter Section */}
        {isMobile ? (
          <div className="mb-6">
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </div>
                  {isFilterOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Products Grid for Mobile */}
            <div className="mt-6">
              {selectedCategory !== 'all' && (
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-orange-600 capitalize">{selectedCategory}</span>
                  <span className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => {
                  const itemQuantity = getItemQuantity(product.id);
                  
                  return (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product.slug)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                          alt={product.name}
                          className="w-full h-32 object-contain bg-[#dbe1e1] group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.in_stock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold text-xs">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-3 flex flex-col h-32">
                        <h3 className="font-semibold mb-2 line-clamp-2 text-sm flex-grow">{product.name}</h3>
                        
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-orange-600 text-sm">
                              ₹{product.price}
                            </span>
                            {product.rating && (
                              <div className="flex items-center">
                                <span className="text-yellow-500 text-xs">★</span>
                                <span className="text-xs text-gray-600 ml-1">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                          </div>

                          {itemQuantity === 0 ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              disabled={!product.in_stock}
                              className="w-full bg-orange-600 hover:bg-orange-700 text-xs py-1 h-7"
                            >
                              <ShoppingCart className="mr-1 w-3 h-3" />
                              {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          ) : (
                            <div className="w-full flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md py-1 px-2">
                              <button
                                className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product.id, -1);
                                }}
                              >
                                <Minus className="w-3 h-3 text-orange-600" />
                              </button>
                              
                              <span className="font-bold text-orange-600 text-xs">
                                {itemQuantity}
                              </span>
                              
                              <button
                                className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product.id, 1);
                                }}
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

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Desktop Layout with Sidebar and Products Side by Side */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Products Grid */}
            <div className="lg:w-3/4">
              {selectedCategory !== 'all' && (
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-orange-600 capitalize">{selectedCategory}</span>
                  <span className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</span>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const itemQuantity = getItemQuantity(product.id);
                  
                  return (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product.slug)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                          alt={product.name}
                          className="w-full h-64 object-contain bg-[#dbe1e1] group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.in_stock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4 flex flex-col h-72">
                        <h3 className="font-semibold mb-4 line-clamp-2 text-lg">{product.name}</h3>
                        
                        <div className="mt-auto">
                          <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-orange-600 text-xl">
                              ₹{product.price}
                            </span>
                            {product.rating && (
                              <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm text-gray-600 ml-1">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                          </div>

                          {itemQuantity === 0 ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              disabled={!product.in_stock}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                              <ShoppingCart className="mr-1 w-4 h-4" />
                              {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          ) : (
                            <div className="w-full flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md py-3 px-4">
                              <button
                                className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product.id, -1);
                                }}
                              >
                                <Minus className="w-4 h-4 text-orange-600" />
                              </button>
                              
                              <span className="font-bold text-orange-600 text-base">
                                {itemQuantity}
                              </span>
                              
                              <button
                                className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(product.id, 1);
                                }}
                              >
                                <Plus className="w-4 h-4 text-orange-600" />
                              </button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
