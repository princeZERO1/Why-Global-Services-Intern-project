import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart data when user logs in or app initializes with valid token
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please log in to add items to your cart');
      return false;
    }

    try {
      setCartLoading(true);
      const { data } = await api.post('/cart/add', {
        productId: product._id,
        quantity,
        price: product.price
      });
      setCart(data);
      toast.success(`${product.name} added to cart!`);
      return true;
    } catch (error) {
      toast.error('Failed to add to cart');
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    try {
      const { data } = await api.put('/cart/update', { productId, quantity });
      setCart(data);
    } catch (error) {
      toast.error('Error updating quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      setCart(data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };
  
  const clearCart = () => {
      setCart({ items: [] });
  }

  const cartTotal = cart.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const cartCount = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{
      cart,
      cartLoading,
      cartTotal,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      fetchCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
