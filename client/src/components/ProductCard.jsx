import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <Link to={`/products/${product._id}`} className="relative group block overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded z-20">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
            Out of Stock
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {product.category}
          </p>
          <div className="flex items-center text-yellow-400 text-sm">
            <FiStar className="fill-current" />
            <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products/${product._id}`}>
          <h3 className="font-heading font-semibold text-gray-900 text-lg mb-1 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4">{product.unit}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-heading font-bold text-2xl text-primary">₹{product.price}</span>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-secondary shadow-md hover:shadow-lg'}`}
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
