
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';

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
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  const fetchProduct = async (productSlug: string) => {
    try {
      const { data: productData, error: productError } = await supabase
        .from('products' as any)
        .select('*')
        .eq('slug', productSlug)
        .single();
      
      if (productError) throw productError;
      setProduct(productData);

      if (productData?.category_id) {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories' as any)
          .select('*')
          .eq('id', productData.category_id)
          .single();
        
        if (!categoryError) {
          setCategory(categoryData);
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
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
        });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
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
          <div className="space-y-6">
            <div>
              {category && (
                <p className="text-green-600 font-medium mb-2">{category.name}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
              )}

              <div className="text-3xl font-bold text-green-600 mb-6">
                ₹{product.price}
              </div>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.in_stock ? (
                <span className="text-green-600">✓ In Stock</span>
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
          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Product Details</h2>
              <div className="prose max-w-none">
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
