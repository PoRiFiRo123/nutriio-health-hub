
import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, Leaf, Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';

const HeroSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
      title: "Premium Superfoods",
      subtitle: "Nutrition for every age group"
    },
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop", 
      title: "Sprouted Flours",
      subtitle: "Ancient grains for modern health"
    },
    {
      url: "https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=600&h=400&fit=crop",
      title: "Healthy Snacks",
      subtitle: "Guilt-free indulgence"
    }
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/nutriio", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/nutriio", label: "Instagram" },
    { icon: Twitter, url: "https://twitter.com/nutriio", label: "Twitter" },
    { icon: Youtube, url: "https://youtube.com/nutriio", label: "YouTube" }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoPlay = () => {
      api.scrollNext();
    };

    const interval = setInterval(autoPlay, 3000);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 lg:py-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full blur-xl transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 rounded-full blur-xl transition-transform duration-1000"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div 
            className="space-y-6 lg:space-y-8 order-1 lg:order-1 text-center lg:text-left transition-transform duration-1000"
            style={{ transform: `translateX(${scrollY * -0.1}px)` }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
                <Leaf className="w-4 h-4 mr-2" />
                100% Natural & Organic
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Nourish Your
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent block">
                  Healthy Life
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Discover premium superfoods, sprouted flours, and healthy snacks crafted with love by Pavana & Deepak. Every product is designed to fuel your wellness journey.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-medium text-gray-700 text-sm lg:text-base">Certified Organic</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-medium text-gray-700 text-sm lg:text-base">Family Health</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-sm lg:text-base"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="border-2 border-orange-600 text-orange-600 px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors text-sm lg:text-base"
              >
                Learn More
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-orange-100 transition-all duration-300 hover:scale-110 shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-orange-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Hero Carousel */}
          <div 
            className="relative order-2 lg:order-2 w-full max-w-lg mx-auto lg:max-w-none transition-transform duration-1000"
            style={{ transform: `translateX(${scrollY * 0.1}px)` }}
          >
            <Carousel setApi={setApi} className="w-full" opts={{
              align: "start",
              loop: true,
            }}>
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl lg:rounded-3xl p-4 lg:p-8 transform hover:scale-105 transition-transform duration-500">
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-2xl">
                        <img 
                          src={image.url}
                          alt={image.title}
                          className="w-full h-48 lg:h-64 object-cover rounded-lg lg:rounded-xl"
                        />
                        <div className="mt-3 lg:mt-4 text-center">
                          <h3 className="font-bold text-gray-800 text-sm lg:text-base">{image.title}</h3>
                          <p className="text-gray-600 text-xs lg:text-sm mt-1">{image.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>

            {/* Floating Cards */}
            <div className="absolute -top-2 lg:-top-4 -left-2 lg:-left-4 bg-white rounded-lg lg:rounded-xl p-2 lg:p-4 shadow-lg animate-bounce">
              <div className="flex items-center space-x-1 lg:space-x-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs lg:text-sm font-medium">Fresh & Natural</span>
              </div>
            </div>

            <div className="absolute -bottom-2 lg:-bottom-4 -right-2 lg:-right-4 bg-white rounded-lg lg:rounded-xl p-2 lg:p-4 shadow-lg animate-pulse">
              <div className="text-center">
                <div className="text-lg lg:text-2xl font-bold text-orange-600">150+</div>
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
