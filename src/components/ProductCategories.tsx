
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: "SuperFoods",
      description: "Nutrient-dense foods packed with vitamins and minerals",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      color: "from-purple-500 to-pink-500",
      products: "25+ Products"
    },
    {
      id: 2,
      name: "Sprouted Flour", 
      description: "Easily digestible, nutrient-rich flours for all ages",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
      color: "from-amber-500 to-orange-500",
      products: "12+ Varieties"
    },
    {
      id: 3,
      name: "Ready to Cook",
      description: "Convenient, healthy meal solutions for busy families",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop",
      color: "from-green-500 to-emerald-500",
      products: "18+ Items"
    },
    {
      id: 4,
      name: "Healthy Snacks",
      description: "Guilt-free snacking options for every craving",
      image: "https://images.unsplash.com/photo-1599909533026-128f7ad90043?w=300&h=200&fit=crop",
      color: "from-blue-500 to-cyan-500",
      products: "30+ Options"
    },
    {
      id: 5,
      name: "Organic Oils",
      description: "Cold-pressed, unrefined oils for cooking and wellness",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop",
      color: "from-yellow-500 to-amber-500",
      products: "8+ Varieties"
    },
    {
      id: 6,
      name: "Natural Salts & Jaggery",
      description: "Unprocessed, mineral-rich sweeteners and salts",
      image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=300&h=200&fit=crop",
      color: "from-red-500 to-pink-500",
      products: "15+ Types"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From superfoods to ready-to-cook meals, discover products crafted for your family's health and happiness
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">{category.products}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group">
                  Explore Category
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-2xl transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
