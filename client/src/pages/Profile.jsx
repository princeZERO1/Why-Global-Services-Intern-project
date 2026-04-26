import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiMapPin, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (activeTab === 'orders' && orders.length === 0) {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', formData);
      setUser({ ...user, ...data });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
    'Delivered': 'bg-primary/20 text-secondary border-primary/30',
    'Cancelled': 'bg-red-100 text-red-700 border-red-200'
  };

  if (!user) return null;

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-linear-to-r from-primary/10 to-primary/5 text-center border-b border-gray-100">
                <div className="w-20 h-20 bg-white shadow-inner rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-primary mb-3">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900">{user.name}</h3>
                <p className="text-gray-500 text-sm truncate">{user.email}</p>
              </div>
              
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiUser className="text-lg" /> Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiPackage className="text-lg" /> My Orders
                </button>
                
                <div className="border-t border-gray-100 my-2"></div>
                
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="text-lg" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grow">
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">Profile Details</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input-field bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="Add your phone number"
                    />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="btn-primary w-full md:w-auto">Update Profile</button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {loadingOrders ? (
                  <div className="flex justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-300">
                      <FiPackage />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">No orders found</h3>
                    <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                    <Link to="/products" className="btn-primary">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 p-4 sm:px-6 flex flex-wrap justify-between items-center border-b border-gray-100 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Order Placed</p>
                            <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total</p>
                            <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                          </div>
                          <div className="text-right grow sm:flex-none">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-6 justify-between items-center">
                          <div className="flex -space-x-4">
                            {order.items.slice(0, 4).map((item, index) => (
                              <div key={index} className="w-14 h-14 rounded-full border-2 border-white bg-gray-100 overflow-hidden shrink-0 z-10" style={{ zIndex: 10 - index }}>
                                {item.productId ? (
                                  <img src={item.productId?.image} alt="Product" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-white">Item</div>
                                )}
                              </div>
                            ))}
                            {order.items.length > 4 && (
                              <div className="w-14 h-14 rounded-full border-2 border-white bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0 z-0">
                                +{order.items.length - 4}
                              </div>
                            )}
                          </div>
                          <Link to={`/order-confirmation/${order._id}`} className="btn-outline px-6 py-2 text-sm shrink-0">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
