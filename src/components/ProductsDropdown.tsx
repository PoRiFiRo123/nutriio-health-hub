
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}

const ProductsDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const fetchCategoriesAndProducts = async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, slug, category_id')
        .order('name')
        .limit(10); // Limit to avoid too many items in dropdown

      if (productsError) throw productsError;

      setCategories(categoriesData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category_id === categoryId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
        <span>Products</span>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white max-h-96 overflow-y-auto">
        <DropdownMenuItem asChild>
          <Link to="/products" className="font-medium">
            View All Products
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {loading ? (
          <DropdownMenuItem disabled>
            Loading...
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            {categories.map((category) => (
              <div key={category.id}>
                <DropdownMenuItem asChild>
                  <Link 
                    to={`/products?category=${category.id}`} 
                    className="font-medium text-orange-600"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
                {getProductsByCategory(category.id).slice(0, 3).map((product) => (
                  <DropdownMenuItem key={product.id} asChild>
                    <Link 
                      to={`/products/${product.slug}`} 
                      className="pl-6 text-sm text-gray-600"
                    >
                      {product.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
            
            {products.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Featured Products</DropdownMenuLabel>
                {products.slice(0, 5).map((product) => (
                  <DropdownMenuItem key={product.id} asChild>
                    <Link to={`/products/${product.slug}`} className="text-sm">
                      {product.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductsDropdown;
