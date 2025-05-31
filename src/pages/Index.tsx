
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
