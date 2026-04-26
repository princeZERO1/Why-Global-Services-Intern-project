import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTruck, FiShield, FiCreditCard, FiClock } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?sort=newest');
        setFeaturedProducts(data.slice(0, 8)); // Get first 8 products
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Fruits', image: '/images/fruits.png', color: 'bg-orange-100' },
    { name: 'Vegetables', image: '/images/vegetables.png', color: 'bg-green-100' },
    { name: 'Dairy', image: '/images/dairy.png', color: 'bg-blue-100' },
    { name: 'Beverages', image: '/images/beverages.png', color: 'bg-red-100' },
    { name: 'Snacks', image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'bg-yellow-100' },
    { name: 'Bakery', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'bg-amber-100' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-background"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-green-50 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                100% Organic & Fresh
              </span>
              <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-gray-900 leading-tight mb-6">
                Fresh Groceries <br />
                <span className="text-primary">Delivered Fast</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Shop from a wide range of fresh fruits, vegetables, dairy, and pure organic products directly sourced from farms.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary flex items-center justify-center text-lg px-8 py-3">
                  Shop Now <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>
              <img 
                src="/images/hero.png" 
                alt="Fresh Groceries Banner" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white object-cover h-[500px] w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center text-2xl mb-4">
                <FiTruck />
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-sm text-gray-500">For orders over ₹500</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FiShield />
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-sm text-gray-500">Safe & secure payments</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orange-100 text-accent rounded-full flex items-center justify-center text-2xl mb-4">
                <FiClock />
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Same Day</h3>
              <p className="text-sm text-gray-500">Guaranteed delivery</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <FiCreditCard />
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-500">No questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-500">Discover all fresh and organic products.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={index} to={`/products?category=${category.name}`}>
              <motion.div 
                whileHover={{ y: -5 }}
                className={`${category.color} rounded-2xl p-6 flex flex-col items-center text-center transition-shadow hover:shadow-md cursor-pointer`}
              >
                <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded-full mb-4 shadow-sm" />
                <h3 className="font-heading font-semibold text-gray-900">{category.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-500">Top quality picks just for you.</p>
            </div>
            <Link to="/products" className="text-primary font-semibold hover:underline flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-accent rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-12 md:p-16 relative z-10 text-white">
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 font-semibold mb-4 text-sm">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4">
                Get 20% Off On <br /> Organic Vegetables
              </h2>
              <p className="mb-8 text-white/90 text-lg">Use code <strong className="bg-white text-accent px-2 py-1 rounded">FRESH20</strong> at checkout.</p>
              <Link to="/products?category=Vegetables" className="bg-white text-accent font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block">
                Claim Offer
              </Link>
            </div>
            <div className="h-full hidden md:block">
              <img 
                src="/images/promo.png" 
                alt="Vegetables Basket" 
                className="w-full h-full object-cover rounded-l-[100px] shadow-[-20px_0_30px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
