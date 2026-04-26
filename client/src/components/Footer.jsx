import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiShoppingBag, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FiShoppingBag className="text-3xl text-primary" />
              <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">
                Fresh<span className="text-primary">Cart</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Fresh. Fast. Delivered. Your premium grocery destination bringing the absolute best of nature directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-gray-900 text-lg mb-4">Shop Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/products?category=Fruits" className="text-gray-500 hover:text-primary text-sm transition-colors">Fresh Fruits</Link></li>
              <li><Link to="/products?category=Vegetables" className="text-gray-500 hover:text-primary text-sm transition-colors">Vegetables</Link></li>
              <li><Link to="/products?category=Dairy" className="text-gray-500 hover:text-primary text-sm transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/products?category=Snacks" className="text-gray-500 hover:text-primary text-sm transition-colors">Snacks & Beverages</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-gray-900 text-lg mb-4">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary text-sm transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Returns & Refunds</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-gray-900 text-lg mb-4">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">Subscribe to get offers and the latest news.</p>
            <form className="flex" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-50 border border-gray-200 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 rounded-r-lg hover:bg-secondary transition-colors flex items-center justify-center"
              >
                <FiMail />
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Made with ✨ for the Internship Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
