
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Nutrient Boosters",
      description: "Nutrient-dense foods packed with vitamins and minerals",
      image: "https://i.pinimg.com/736x/7b/ff/f4/7bfff4fa12ac9b75bc6cefbbd9a8245b.jpg?w=300&h=200&fit=crop",
      color: "from-orange-500 to-amber-500",
      products: "4+ Products"
    },
    {
      id: 2,
      name: "Sprouted Flour", 
      description: "Easily digestible, nutrient-rich flours for all ages",
      image: "https://i.pinimg.com/736x/66/ac/ff/66acfff1f0d72aebfac412b5822b1804.jpg?w=300&h=200&fit=crop",
      color: "from-amber-500 to-orange-500",
      products: "12+ Varieties"
    },
    {
      id: 3,
      name: "Meal Moments",
      description: "Convenient, healthy meal solutions for busy families",
      image: "https://i.pinimg.com/736x/96/00/1e/96001ec5e2088ec4486d472fcc9bba0d.jpg?w=300&h=200&fit=crop",
      color: "from-orange-600 to-amber-600",
      products: "18+ Items"
    },
    {
      id: 4,
      name: "Healthy Bites",
      description: "Guilt-free snacking options for every craving",
      image: "https://i.pinimg.com/736x/37/c0/bc/37c0bc060908db489eec419954762236.jpg?w=300&h=200&fit=crop",
      color: "from-amber-600 to-orange-600",
      products: "30+ Options"
    },
    {
      id: 5,
      name: "Pure Extracts",
      description: "Cold-pressed, unrefined oils for cooking and wellness",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      color: "from-orange-500 to-amber-500",
      products: "8+ Varieties"
    },
    {
      id: 6,
      name: "Activated Millet Flours",
      description: "Unprocessed, mineral-rich sweeteners and salts",
      image: "https://i.pinimg.com/736x/11/66/b8/1166b8888b880f4c20567311276b75cf.jpg?w=300&h=200&fit=crop",
      color: "from-amber-500 to-orange-500",
      products: "15+ Types"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"> Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From superfoods to ready-to-cook meals, discover products crafted for your family's health and happiness
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-32 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
                  <span className="text-xs md:text-sm font-medium text-gray-700">{category.products}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-6">
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-xs md:text-base mb-2 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {category.description}
                </p>
                
                <div className="flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group text-xs md:text-base">
                  Explore Category
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-2xl transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
