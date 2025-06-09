
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  ShoppingCart, 
  Menu, 
  User, 
  LogOut, 
  Package,
  MapPin,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SearchHeader from './SearchHeader';
import ProductsDropdown from './ProductsDropdown';

interface Category {
  id: string;
  name: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      if (data && Array.isArray(data)) {
        setCategories(data as Category[]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (email: string) => {
    return email?.charAt(0).toUpperCase() || 'U';
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${categoryName}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Nutriio Logo" 
              className="h-10 w-140"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <ProductsDropdown />
            <Link to="/blog" className="text-gray-700 hover:text-orange-600 transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block">
            <SearchHeader />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-600">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-orange-100 text-orange-700">
                          {getInitials(user.email || '')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=orders')}>
                      <Package className="w-4 h-4 mr-2" />
                      Order History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile?tab=addresses')}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Addresses
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Cart for non-authenticated users */}
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-600">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Sign In Button */}
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Search Bar - Mobile */}
            <div className="flex-1">
              <SearchHeader />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-600">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-orange-100 text-orange-700">
                          {getInitials(user.email || '')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col space-y-2">
                    <Link 
                      to="/" 
                      className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    
                    {/* Products with Categories */}
                    <Collapsible open={isProductsOpen} onOpenChange={setIsProductsOpen}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-0 h-auto text-gray-700 hover:text-orange-600 transition-colors py-2"
                        >
                          Products
                          {isProductsOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 mt-2 space-y-2">
                        <Link 
                          to="/products" 
                          className="block text-gray-600 hover:text-orange-600 transition-colors py-1 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          All Products
                        </Link>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className="block text-left text-gray-600 hover:text-orange-600 transition-colors py-1 text-sm w-full"
                          >
                            {category.name}
                          </button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Link 
                      to="/blog" 
                      className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link 
                      to="/about" 
                      className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link 
                      to="/contact" 
                      className="text-gray-700 hover:text-orange-600 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>

                  {user ? (
                    <div className="pt-4 border-t space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile');
                          setIsOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile?tab=orders');
                          setIsOpen(false);
                        }}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Order History
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile?tab=addresses');
                          setIsOpen(false);
                        }}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Addresses
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => {
                          navigate('/auth');
                          setIsOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
