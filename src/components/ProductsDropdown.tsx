
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

const ProductsDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        to="/products" 
        className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors"
      >
        <span>Products</span>
        <ChevronDown className="w-4 h-4" />
      </Link>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            <Link 
              to="/products" 
              className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-orange-50 hover:text-orange-600"
            >
              All Products
            </Link>
            
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  {category.name}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
