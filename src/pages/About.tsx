
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
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-600">Nutriio</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded with a passion for health and wellness, Nutriio brings you the finest 
              organic products to nourish your family's journey toward better health.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Founders
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                <span className="text-orange-600">Nishit & Deepak</span><br />
                Health Enthusiasts & Entrepreneurs
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                With backgrounds in nutrition and sustainable agriculture, Nishit and Deepak 
                founded Nutriio to bridge the gap between traditional wisdom and modern health needs. 
                Their commitment to quality and purity drives every decision we make.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=500&h=400&fit=crop" 
                alt="Nishit and Deepak - Nutriio Founders"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Certified Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-600">Mission</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To empower families with access to pure, organic, and nutritious products that support 
              healthy living at every stage of life. We believe that good nutrition should be simple, 
              accessible, and delicious.
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Health Revolution</h3>
              <p className="text-lg opacity-90">
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
