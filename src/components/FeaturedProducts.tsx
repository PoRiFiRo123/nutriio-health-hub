
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Sprouted Ragi Mix",
      description: "Rich in calcium, perfect for growing kids",
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      badge: "Bestseller",
      ageGroup: "6 months+",
      slug: "sprouted-ragi-mix"
    },
    {
      id: 2,
      name: "Organic Quinoa",
      description: "Complete protein superfood for active lifestyles",
      price: 199,
      originalPrice: 229,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      badge: "New",
      ageGroup: "All ages",
      slug: "organic-quinoa"
    },
    {
      id: 3,
      name: "Millet Cookie Mix",
      description: "Healthy baking mix for homemade treats",
      price: 149,
      originalPrice: 179,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1599909533026-128f7ad90043?w=300&h=300&fit=crop",
      badge: "Popular",
      ageGroup: "2 years+",
      slug: "millet-cookie-mix"
    },
    {
      id: 4,
      name: "Cold-Pressed Coconut Oil",
      description: "Virgin coconut oil for cooking and wellness",
      price: 399,
      originalPrice: 449,
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      badge: "Organic",
      ageGroup: "All ages",
      slug: "cold-pressed-coconut-oil"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured
            <span className="bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent"> Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked products loved by families nationwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleProductClick(product.slug)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button 
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                {/* Age Group */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-gray-700">{product.ageGroup}</span>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="w-full mt-4 bg-gradient-to-r from-orange-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/products')}
            className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
