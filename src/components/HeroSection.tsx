
import React from 'react';
import { ArrowRight, Shield, Leaf, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4 mr-2" />
                100% Natural & Organic
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Nourish Your
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                  Healthy Life
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover premium superfoods, sprouted flours, and healthy snacks crafted with love by Nishit & Deepak. Every product is designed to fuel your wellness journey.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">Certified Organic</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">Family Health</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop" 
                  alt="Healthy Food Products" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-800">Premium Superfoods</h3>
                  <p className="text-gray-600 text-sm mt-1">Nutrition for every age group</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Fresh & Natural</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-pulse">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">150+</div>
                <div className="text-xs text-gray-600">Happy Families</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
