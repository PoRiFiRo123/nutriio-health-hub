
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import SearchHeader from './SearchHeader';

const Header = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const productCategories = [
    'SuperFoods',
    'Sprouted Flour', 
    'Ready to Cook',
    'Healthy Snacks',
    'Organic Oils',
    'Natural Salts & Jaggery'
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setIsMobileMenuOpen(false);
  };

  const handleProductsClick = () => {
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">N</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Nutriio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </button>
            
            <div className="relative group">
              <button 
                onClick={handleProductsClick}
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors group"
              >
                Products
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Hover Dropdown */}
              <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl border border-gray-200 rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => navigate('/products')}
                  className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded cursor-pointer text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  All Products
                </button>
                {productCategories.map((category) => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded cursor-pointer text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => navigate('/blog')} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Blog
            </button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              About
            </button>
            <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Contact
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:block flex-1 max-w-sm mx-4">
            <SearchHeader />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-orange-50 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-orange-50 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden py-2 border-t border-gray-100">
          <SearchHeader />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <button 
              onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              Home
            </button>
            
            <div className="px-4">
              <div className="text-gray-700 font-medium py-2">
                <button 
                  onClick={() => { navigate('/products'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left hover:text-orange-600 transition-colors"
                >
                  Products
                </button>
              </div>
              <div className="pl-4 space-y-1">
                <button 
                  onClick={() => { navigate('/products'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left py-1 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  All Products
                </button>
                {productCategories.map((category) => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="block w-full text-left py-1 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { navigate('/blog'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
