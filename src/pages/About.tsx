
import React from 'react';
import { Users, Award, Leaf, Heart, Shield, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "We source only certified organic ingredients, ensuring purity and quality in every product."
    },
    {
      icon: Heart,
      title: "Family Health",
      description: "Our products are designed with families in mind, suitable for all age groups from 6 months and above."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous testing and quality control measures ensure that every product meets our high standards."
    },
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're committed to making healthy nutrition accessible and affordable for every family."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              About <span className="text-orange-600">Nutriio</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed px-4">
              Founded with a passion for health and wellness, Nutriio brings you the finest 
              organic products to nourish your family's journey toward better health.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Founders
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                <span className="text-orange-600">Pavana & Deepak</span><br />
                Health Enthusiasts & Entrepreneurs
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Pavana and Deepak, the powerhouse behind Nutriio, believe in the power of nutrition to transform lives. Their journey began four years ago with a simple yet profound goal: to provide children with healthy, natural alternatives to the artificially flavored foods dominating the market. Starting with their signature nutritional health mixes for kids, they quickly realized the need for wholesome, nutritious options for people of all ages. This led them to expand their offerings to include sprouted flours, activated millets, and ready-to-cook products, all designed to nourish and support a healthy lifestyle from 6 months onwards.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-sm">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">5+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
                {/* Pavana's Image */}
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                    alt="Pavana - Co-founder of Nutriio"
                    className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Pavana</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Co-founder & CEO</p>
                  </div>
                </div>

                {/* Deepak's Image */}
                <div className="relative group mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                    alt="Deepak - Co-founder of Nutriio"
                    className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Deepak</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Co-founder & CTO</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white rounded-xl p-2 sm:p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                  <span className="text-xs sm:text-sm font-medium">Certified Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our <span className="text-orange-600">Mission</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
              Our mission is to nurture a generation that naturally embraces healthy eating, starting with the well-being of children. By fostering these habits early on, we aim to create a positive ripple effect that extends to families and communities, benefiting society as a whole. At Nutriio, we believe that healthy eating should be effortless and accessible, making it more than just a choice—it’s a way of life.
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Join Our Health Revolution</h3>
              <p className="text-base sm:text-lg opacity-90">
                Together, we're building a healthier tomorrow, one family at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
