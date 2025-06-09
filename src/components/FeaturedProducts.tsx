
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Sprouted 4 in 1 Health Mix",
      description: "Nutriio’s Sprouted 4-in-1 Health Mix blends sprouted ragi, wheat, bajra, and jowar for a protein- and fiber-rich boost.",
      price: 210,
      originalPrice: 260,
      rating: 4.8,
      reviews: 156,
      image: "https://i.pinimg.com/736x/93/05/a5/9305a58f1147bb6a09558a264affa50c.jpg?w=300&h=300&fit=crop",
      badge: "Bestseller",
      ageGroup: "6 months+",
      slug: "sprouted-four-in-one"
    },
    {
      id: 2,
      name: "Sprouted Whole Wheat Flour",
      description: "Nutriio's Sprouted Whole Wheat Flour is a nutrient-rich, easily digestible flour made from sprouted whole grains.",
      price: 140,
      originalPrice: 190,
      rating: 4.9,
      reviews: 89,
      image: "https://i.pinimg.com/736x/9b/38/79/9b387998d9cd5e81cc7bf55d143d9df3.jpg?w=300&h=300&fit=crop",
      badge: "New",
      ageGroup: "All ages",
      slug: "organic-quinoa"
    },
    {
      id: 3,
      name: "Sprouted Millet Butter Cookies",
      description: "Nutriio's Sprouted Millet Butter Cookies blend ragi, bajra, and jowar with creamy butter for a tasty, nutritious snack.",
      price: 130,
      originalPrice: 180,
      rating: 4.7,
      reviews: 234,
      image: "https://i.pinimg.com/736x/4b/73/c4/4b73c4622c1d5fccc5aa1ab48abd42f4.jpg?w=300&h=300&fit=crop",
      badge: "Popular",
      ageGroup: "2 years+",
      slug: "sprouted-millet-butter-cookies"
    },
    {
      id: 4,
      name: "Sprouted Peanut Chutney Pudi",
      description: "Nutriio’s Sprouted Peanut Chutney Pudi combines sprouted peanuts and spices for a protein-rich, gut-friendly boost.",
      price: 399,
      originalPrice: 449,
      rating: 4.6,
      reviews: 78,
      image: "https://i.pinimg.com/736x/de/00/03/de000324bada3eebaed7a5c5e5b3ac5c.jpg?w=300&h=300&fit=crop",
      badge: "Organic",
      ageGroup: "All ages",
      slug: "sprouted-peanut-chutney-pudi"
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured
            <span className="bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent"> Products</span>
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
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
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
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
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
                  <div className="text-sm text-orange-600 font-medium">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="w-full mt-4 bg-gradient-to-r from-orange-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
            className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
