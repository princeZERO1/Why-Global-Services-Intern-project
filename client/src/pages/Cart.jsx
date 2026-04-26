import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiShield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const deliveryFee = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + deliveryFee;

  if (!user) {
    return (
      <div className="bg-background min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-4xl text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4">Please Log In</h2>
          <p className="text-gray-500 mb-8">You need to log in to view and manage your cart.</p>
          <button onClick={() => navigate('/login')} className="w-full btn-primary py-3">Sign In</button>
        </div>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-64 h-64 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any fresh groceries to your cart yet.</p>
          <Link to="/products" className="btn-primary inline-flex items-center">
            Start Shopping <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between border-b border-gray-100 pb-4 mb-6 font-semibold text-gray-500 sm:flex">
                  <div className="w-1/2">Product</div>
                  <div className="w-1/4 text-center">Quantity</div>
                  <div className="w-1/4 text-right">Total</div>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                    {cart.items.map((item) => (
                      <motion.div 
                        key={item.productId._id}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-4 border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-1/2">
                          <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
                          <div>
                            <Link to={`/products/${item.productId._id}`}>
                              <h3 className="font-heading font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1">{item.productId.name}</h3>
                            </Link>
                            <p className="text-gray-500 text-sm mt-1">₹{item.price}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center w-full sm:w-1/2">
                          <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                            <button 
                              onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary"
                            >
                              <FiMinus />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary"
                            >
                              <FiPlus />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-lg text-gray-900 min-w-[70px] text-right">₹{item.price * item.quantity}</span>
                            <button 
                              onClick={() => removeFromCart(item.productId._id)}
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h3 className="text-xl font-heading font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">{deliveryFee === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-accent text-center bg-orange-50 py-2 rounded">
                    Add ₹{500 - cartTotal} more to get Free Delivery!
                  </p>
                )}
                
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                  <span className="font-bold text-primary text-2xl">₹{finalTotal}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex">
                  <input type="text" placeholder="Coupon Code" className="w-full border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none focus:border-primary text-sm" />
                  <button className="bg-gray-900 text-white px-4 rounded-r-lg text-sm font-medium hover:bg-gray-800 transition-colors">Apply</button>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-4 text-lg flex justify-center items-center group shadow-xl shadow-green-500/20"
              >
                Proceed to Checkout
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <FiShield className="text-primary" /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
