
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
}

interface SearchHeaderProps {
  onSearch?: (term: string) => void;
}

const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      searchProducts(searchTerm);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const searchProducts = async (term: string) => {
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${term}%,description.ilike.%${term}%`)
        .limit(5);
      
      if (error) throw error;
      if (data && Array.isArray(data)) {
        setSearchResults(data as Product[]);
      }
      setShowResults(true);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProductClick = (slug: string) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/products/${slug}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 h-9 sm:h-10 text-sm"
          onFocus={() => searchTerm.length > 2 && setShowResults(true)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"}
                      alt={product.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                      <p className="text-sm font-semibold text-green-600">₹{product.price}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 bg-gray-50 text-center">
                  <button
                    onClick={() => {
                      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
                      clearSearch();
                    }}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View all results for "{searchTerm}"
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No products found for "{searchTerm}"
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchHeader;
