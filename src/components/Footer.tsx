
import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Nutriio</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Premium superfoods, sprouted flours, and healthy snacks crafted with love for your family's wellness journey.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-orange-500 transition-colors">Home</a></li>
                <li><a href="/products" className="text-gray-300 hover:text-orange-500 transition-colors">Products</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/products?category=SuperFoods" className="text-gray-300 hover:text-orange-500 transition-colors">SuperFoods</a></li>
                <li><a href="/products?category=Sprouted%20Flour" className="text-gray-300 hover:text-orange-500 transition-colors">Sprouted Flour</a></li>
                <li><a href="/products?category=Ready%20to%20Cook" className="text-gray-300 hover:text-orange-500 transition-colors">Ready to Cook</a></li>
                <li><a href="/products?category=Healthy%20Snacks" className="text-gray-300 hover:text-orange-500 transition-colors">Healthy Snacks</a></li>
                <li><a href="/products?category=Organic%20Oils" className="text-gray-300 hover:text-orange-500 transition-colors">Organic Oils</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    123 Health Street,<br />
                    Wellness City, WC 12345
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-300 text-sm">hello@nutriio.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Nutriio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Return Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
