
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Mother of 2",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Nutriio's sprouted ragi flour has been a game-changer for my kids' nutrition. They love the taste and I love the health benefits!"
    },
    {
      name: "Rajesh Kumar",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The quality of superfoods is exceptional. I've seen significant improvements in my energy levels since switching to Nutriio."
    },
    {
      name: "Anita Patel",
      role: "Health Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I recommend Nutriio to all my clients. Their products are pure, organic, and deliver real health benefits."
    }
  ];

  return (
    <section className="py-16 bg-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-scale-in">
            What Our <span className="text-orange-600">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in animation-delay-200">Real stories from real families</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in opacity-0 hover:scale-105`}
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex items-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 transition-colors duration-300 hover:text-orange-600">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <Quote className="w-6 h-6 text-orange-300 ml-auto transform rotate-12 hover:rotate-0 transition-transform duration-300" />
              </div>
              
              <div className="flex mb-3 transform translate-x-2 hover:translate-x-0 transition-transform duration-300">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-yellow-400 fill-current transition-all duration-200 hover:scale-125"
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 italic leading-relaxed transition-colors duration-300 hover:text-gray-900">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
