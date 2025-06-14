import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
}

const Footer = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      if (data && Array.isArray(data)) {
        setCategories(data as Category[]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const productCategories = [
    'SuperFoods',
    'Sprouted Flour', 
    'Ready to Cook',
    'Healthy Snacks',
    'Natural Oils',
    'Natural Salts & Jaggery'
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/nutriio.in", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/nutriioproducts", label: "Instagram" },
    // { icon: Twitter, url: "https://twitter.com/nutriio", label: "Twitter" },
    { icon: Youtube, url: "https://youtube.com/@nutriioproducts9982", label: "YouTube" }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-gradient-to-r  rounded-full flex items-center justify-center">
                  <img src="/favicon.ico" alt="Nutriio Logo" className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Nutriio</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Premium superfoods, sprouted flours, and healthy snacks crafted with love for your family's wellness journey.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/')} 
                    className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/products')} 
                    className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/blog')} 
                    className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/about')} 
                    className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')} 
                    className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Categories</h4>
              <ul className="space-y-2">
                {loading ? (
                  <li className="text-gray-300 text-sm">Loading categories...</li>
                ) : (
                  categories.map((category) => (
                    <li key={category.id}>
                      <button 
                        onClick={() => handleCategoryClick(category.name)}
                        className="text-gray-300 hover:text-orange-500 transition-colors text-left"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                  Jaya Nagar 1st Block,<br />
                  Bengaluru, Karnataka 560011
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-300 text-sm">+91 72592 32905</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-300 text-sm">hello@nutriio.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Nutriio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
