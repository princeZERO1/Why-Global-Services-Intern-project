import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiCreditCard } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + deliveryFee;

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to checkout');
      navigate('/login');
    } else if (!cart?.items?.length) {
      navigate('/products');
    }
  }, [user, cart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderItems = cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price
      }));

      const { data } = await api.post('/orders', {
        orderItems,
        deliveryAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: finalTotal
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${data._id}`);
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!cart?.items?.length) return null;

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Delivery Address */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span> 
                  Delivery Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address / Block / Appt</label>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span> 
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'Card' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Card"
                      checked={formData.paymentMethod === 'Card'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary focus:ring-primary" 
                    />
                    <FiCreditCard className="ml-4 mr-3 text-2xl text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Pay securely with your bank card</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'UPI' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary focus:ring-primary" 
                    />
                    <div className="ml-4 mr-3 font-bold text-gray-400 text-xl tracking-widest bg-gray-100 px-2 rounded">UPI</div>
                    <div>
                      <p className="font-medium text-gray-900">UPI Payments</p>
                      <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm, etc</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'Cash on Delivery' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary focus:ring-primary" 
                  />
                  <FiCheckCircle className="ml-4 mr-3 text-2xl text-gray-400" />
                  <div>
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action */}
              <div className="hidden lg:block">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg font-bold shadow-xl shadow-green-500/20 disabled:opacity-70 flex justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Placing Order...</span>
                  ) : `Place Order (₹${finalTotal})`}
                </button>
              </div>

            </form>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h3 className="text-xl font-heading font-bold mb-6">Order Items</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.productId.name}</p>
                      <p className="text-xs text-gray-500">{item.productId.unit}</p>
                    </div>
                    <div className="font-semibold text-sm">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dashed border-gray-200 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium text-gray-900">{deliveryFee === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-primary">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit} // On mobile
                className="w-full btn-primary py-4 mt-8 text-lg font-bold shadow-xl shadow-green-500/20 disabled:opacity-70 flex justify-center lg:hidden"
              >
                {isSubmitting ? (
                  <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Placing Order...</span>
                ) : `Place Order`}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 bg-green-50 p-3 rounded-lg">
                <FiShield className="text-lg" /> 
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
