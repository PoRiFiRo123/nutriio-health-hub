
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import EducationalContent from '../components/EducationalContent';
import AboutCompany from '../components/AboutCompany';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials />
      <EducationalContent />
      <AboutCompany />
    </div>
  );
};

export default Index;
