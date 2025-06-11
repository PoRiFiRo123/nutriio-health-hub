
import React from 'react';
import { BookOpen, ArrowRight, Lightbulb, Heart, Shield } from 'lucide-react';

const EducationalContent = () => {
  const articles = [
    {
      icon: Heart,
      title: "Benefits of Sprouted Grains",
      description: "Learn how sprouting enhances nutritional value and makes grains easier to digest.",
      readTime: "3 min read"
    },
    {
      icon: Shield,
      title: "Superfoods for Kids",
      description: "Discover the best superfoods to boost your child's immunity and growth.",
      readTime: "5 min read"
    },
    {
      icon: Lightbulb,
      title: "Healthy Snacking Tips",
      description: "Smart snacking strategies for busy families without compromising nutrition.",
      readTime: "4 min read"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4 animate-scale-in">
            <BookOpen className="w-4 h-4 mr-2" />
            Learn & Grow
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-fade-in animation-delay-200">
            Why <span className="text-orange-600">Choose Us?</span>
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in animation-delay-300">Empowering you with products for better health choices</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div 
              key={index} 
              className={`group cursor-pointer animate-fade-in opacity-0`}
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 group-hover:-translate-y-2 hover:scale-105">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <article.icon className="w-6 h-6 text-orange-600 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-orange-600 transform translate-y-2 group-hover:translate-y-0">{article.title}</h3>
                <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700 transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100">{article.description}</p>
                
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                  {/* <span className="text-sm text-gray-500">{article.readTime}</span>
                  <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 animate-fade-in animation-delay-600">
          {/* <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Explore All Articles
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default EducationalContent;
