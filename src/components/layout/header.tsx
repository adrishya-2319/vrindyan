import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="relative group">
              {/* Krishna's Flute Logo */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-white">
                    <div className="relative w-full h-full">
                      {/* Stylized Flute Shape */}
                      <div className="absolute inset-x-0 top-1/2 h-1 bg-white/90 transform -translate-y-1/2 rounded-full"></div>
                      <div className="absolute left-1/4 top-1/4 w-1 h-6 bg-white/90 rounded-full"></div>
                      <div className="absolute left-2/4 top-1/4 w-1 h-6 bg-white/90 rounded-full"></div>
                      <div className="absolute left-3/4 top-1/4 w-1 h-6 bg-white/90 rounded-full"></div>
                      {/* Peacock Feather Accent */}
                      <div className="absolute -top-1 right-0 w-3 h-3 bg-white/90 rounded-full transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-lg group-hover:bg-purple-500/20 transition-colors duration-300"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vrindyan
              </span>
              <span className="text-sm font-medium text-gray-500">Software</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Services
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-xs text-white animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                  <span className="text-sm font-medium hidden md:inline">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={() => signOut()} 
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500 h-9 px-4 text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin"
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus-visible:ring-indigo-500 h-9 px-4 text-sm"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity md:hidden",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-1.5 text-white">
                    {/* Simplified Flute for Mobile */}
                    <div className="relative w-full h-full">
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/90 transform -translate-y-1/2 rounded-full"></div>
                      <div className="absolute left-1/4 top-1/4 w-0.5 h-4 bg-white/90 rounded-full"></div>
                      <div className="absolute left-2/4 top-1/4 w-0.5 h-4 bg-white/90 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Vrindyan
                </span>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={toggleSidebar}
            >
              Services
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={toggleSidebar}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={toggleSidebar}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}