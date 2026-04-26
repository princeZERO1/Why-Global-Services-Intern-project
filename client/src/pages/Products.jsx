import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Bakery', 'Beverages']);
  
  // Filters state
  const [category, setCategory] = useState(initialCategory || 'All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    // Debounced search
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = `/products?sort=${sort}`;
      if (category !== 'All') query += `&category=${category}`;
      if (search) query += `&keyword=${search}`;

      const { data } = await api.get(query);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setSearchParams(newCat === 'All' ? {} : { category: newCat });
  };

  return (
    <div className="bg-background min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">All Products</h1>
            <p className="text-gray-500 mt-1">Showing {products.length} results</p>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field max-w-xs"
            />
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field max-w-[150px] bg-white cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Top Rated</option>
            </select>
            
            <button 
              className="md:hidden btn-outline p-2 flex items-center justify-center rounded-lg"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4 pb-4 border-b border-gray-100">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${category === cat ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => { setCategory('All'); setSearchParams({}); setSearch(''); setSort('newest'); }}
                className="w-full mt-6 text-sm text-gray-500 underline hover:text-primary transition-colors text-center"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 h-80 animate-pulse border border-gray-100 flex flex-col">
                    <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-auto"></div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-10 bg-gray-200 rounded-full w-10"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiFilter className="text-3xl text-gray-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setCategory('All'); setSearch(''); }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl p-6 md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="font-heading font-bold text-xl">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                  <FiX />
                </button>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2 mb-8">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${category === cat ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => { setIsMobileFiltersOpen(false); }}
                className="w-full btn-primary py-3"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
