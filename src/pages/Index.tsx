
import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import FeaturedBlogSection from '../components/FeaturedBlogSection';
import Testimonials from '../components/Testimonials';
import EducationalContent from '../components/EducationalContent';
import AboutCompany from '../components/AboutCompany';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial load animation
    setIsLoaded(true);

    // Set up intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all sections except hero (which has its own animation)
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <ProductCategories />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <FeaturedProducts />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <FeaturedBlogSection />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <Testimonials />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <EducationalContent />
      </div>
      <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <AboutCompany />
      </div>
    </div>
  );
};

export default Index;
