import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  detailed_description: string;
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

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  const fetchProduct = async (productSlug: string) => {
    try {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productSlug)
        .single();
      
      if (productError) throw productError;
      if (productData && typeof productData === 'object' && 'id' in productData) {
        const typedProduct = productData as Product;
        setProduct(typedProduct);

        if (typedProduct.category_id) {
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('id', typedProduct.category_id)
            .single();
          
          if (!categoryError && categoryData && typeof categoryData === 'object' && 'id' in categoryData) {
            setCategory(categoryData as Category);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
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
    }
  };

  const handleQuantityChange = (change: number) => {
    if (product) {
      const currentQuantity = getItemQuantity(product.id);
      const newQuantity = currentQuantity + change;
      if (newQuantity >= 0) {
        updateQuantity(product.id, newQuantity);
        
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const itemQuantity = getItemQuantity(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              {category && (
                <p className="text-orange-600 font-medium mb-2">{category.name}</p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {product.name}
              </h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
              )}

              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4 sm:mb-6">
                ₹{product.price}
              </div>

              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4">
              {itemQuantity === 0 ? (
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 h-10 sm:h-11 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md h-10 sm:h-11 px-4">
                  <button
                    className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <Minus className="w-4 h-4 text-orange-600" />
                  </button>
                  
                  <span className="font-bold text-orange-600 text-base sm:text-lg">
                    {itemQuantity} in cart
                  </span>
                  
                  <button
                    className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.in_stock ? (
                <span className="text-orange-600">✓ In Stock</span>
              ) : (
                <span className="text-red-600">✗ Out of Stock</span>
              )}
              {product.stock && (
                <span className="text-gray-500 ml-2">({product.stock} available)</span>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {product.detailed_description && (
          <Card className="mt-8 sm:mt-12">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Product Details</h2>
              <div className="prose max-w-none text-sm sm:text-base">
                <div dangerouslySetInnerHTML={{ __html: product.detailed_description }} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
