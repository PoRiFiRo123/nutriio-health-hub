
import React from 'react';
import { Users, Award, Leaf, Heart } from 'lucide-react';

const AboutCompany = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Founded by <span className="text-orange-600">Pavana & Deepak</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Nutriio was born from a simple belief: every family deserves access to pure, nutritious food. 
              Founded by health enthusiasts Pavana and Deepak, we're committed to bringing you the finest 
              organic products that nourish your body and soul.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Happy Families</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Organic Products</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=500&h=400&fit=crop" 
                alt="Nutriio Founders"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Natural & Pure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
