import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 glass-effect border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FiShoppingBag className="text-3xl text-primary" />
            <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">
              Fresh<span className="text-primary">Cart</span>
            </span>
          </Link>

          {/* Desktop Search (Optional, visually there) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-400 text-lg" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="font-medium text-gray-700 hover:text-primary transition-colors">All Products</Link>
            
            {user ? (
              <div className="relative group cursor-pointer flex items-center gap-2">
                <FiUser className="text-xl text-gray-600" />
                <span className="font-medium text-gray-700">{user.name.split(' ')[0]}</span>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-6 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right border border-gray-100">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">My Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg">Logout</button>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="font-medium text-gray-700 hover:text-primary transition-colors">Sign In</Link>
                <Link to="/register" className="btn-primary py-1.5 px-5 text-sm">Sign Up</Link>
              </div>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
              <FiShoppingBag className="text-2xl" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700">
              <FiShoppingBag className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
              <div className="relative mt-4 mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-100 border-none rounded-lg py-2 pl-4 pr-10 focus:outline-none"
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
              </div>

              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-gray-700">All Products</Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-100 py-3">
                    <p className="font-semibold text-gray-900 mb-2">Hello, {user.name}</p>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600">My Profile</Link>
                    <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600">My Orders</Link>
                    <button onClick={handleLogout} className="block py-2 text-red-600 w-full text-left">Logout</button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border border-gray-300 rounded-lg text-gray-700 font-medium">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 bg-primary text-white rounded-lg font-medium">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
