import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-12 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
        <Link to="/products" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-primary/10 p-8 text-center border-b border-gray-100">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30"
          >
            <FiCheckCircle className="text-5xl" />
          </motion.div>
          <h1 className="text-3xl font-heading font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 font-medium">Thank you for shopping with FreshCart.</p>
        </div>
        
        <div className="p-8">
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-medium text-gray-900">{order._id}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium text-gray-900">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-lg text-primary">₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-blue-100 bg-blue-50/50 rounded-xl mb-8">
            <FiPackage className="text-2xl text-blue-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
              <p className="text-gray-600 text-sm">Your items will be delivered to {order.deliveryAddress.city} by tomorrow, 8:00 PM.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/orders" className="btn-outline flex items-center justify-center">
              View Order History
            </Link>
            <Link to="/products" className="btn-primary flex items-center justify-center group shadow-md shadow-primary/20">
              Continue Shopping <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
