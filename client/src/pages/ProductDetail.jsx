import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiHeart, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error("Error loading product");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-12 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12">
          
          {/* Image Section */}
          <div className="lg:w-1/2 relative group">
            {product.stock <= 5 && product.stock > 0 && (
              <span className="absolute top-4 left-4 bg-accent text-white font-bold px-3 py-1 rounded shadow-md z-10">
                Low Stock
              </span>
            )}
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8 h-full min-h-[400px]">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={product.image} 
                alt={product.name} 
                className="max-h-[400px] object-contain origin-center cursor-crosshair"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            
            <div className="flex items-center text-yellow-500 mb-4 bg-yellow-50 w-max px-3 py-1 rounded-full">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : "text-yellow-200"} />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">{product.rating} / 5</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 text-lg mb-6">{product.unit} • {product.brand || 'FreshCart'}</p>

            <div className="flex items-end mb-8">
              <span className="text-4xl font-heading font-bold text-primary">₹{product.price}</span>
              <span className="text-gray-400 line-through ml-3 text-xl font-medium">₹{Math.round(product.price * 1.2)}</span>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                {product.stock > 0 ? (
                  <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded text-sm font-medium">
                    <FiCheck className="mr-1" /> In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500 bg-red-50 px-3 py-1 rounded text-sm font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-8 border-t border-gray-100">
              
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-gray-200 rounded-full h-14 bg-gray-50/50">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-5 text-gray-600 hover:text-primary disabled:opacity-50 transition-colors"
                  disabled={product.stock === 0}
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-5 text-gray-600 hover:text-primary disabled:opacity-50 transition-colors"
                  disabled={product.stock === 0}
                >
                  <FiPlus />
                </button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center font-bold text-lg rounded-full h-14 transition-colors shadow-lg ${product.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed hidden' : 'bg-primary text-white hover:bg-secondary'}`}
              >
                <FiShoppingBag className="mr-2 text-xl" /> Add to Cart
              </motion.button>
              
              <button 
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
                }}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'}`}
              >
                <FiHeart className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

          </div>
        </div>
        
        {/* Detail Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {['details', 'nutrition', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-heading font-semibold transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900 bg-gray-50/50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Product Details</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description} Ensure you get the absolute best quality products sourced directly from farmers.
                  Our team meticulously checks the quality to make sure there are no compromises.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Premium {product.category}</li>
                  <li>Weight/Volume: {product.unit}</li>
                  <li>Locally sourced where possible</li>
                  <li>100% Quality guarantee</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Nutritional Information</h3>
                <p className="text-gray-500 italic mb-4">Approximate values per 100g/100ml.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Calories</p>
                    <p className="font-bold text-lg text-gray-900">45 kcal</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Protein</p>
                    <p className="font-bold text-lg text-gray-900">1.2 g</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Carbs</p>
                    <p className="font-bold text-lg text-gray-900">10 g</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Fat</p>
                    <p className="font-bold text-lg text-gray-900">0.2 g</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-heading font-bold">Customer Reviews</h3>
                  <button className="text-primary font-semibold hover:underline">Write a Review</button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2].map(review => (
                    <div key={review} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center font-bold text-gray-500">
                          U{review}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">User {review}</p>
                          <div className="flex text-yellow-400 text-xs">
                            {[...Array(5)].map((_, i) => <FiStar key={i} className={i < 4 ? "fill-current" : ""} />)}
                          </div>
                        </div>
                        <span className="ml-auto text-xs text-gray-400">2 weeks ago</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">Excellent quality product. Will definitely be buying again! Arrived fresh and well packaged.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
