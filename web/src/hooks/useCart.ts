'use client';

import { useState, useEffect } from 'react';
import { apiClient, API_ENDPOINTS } from '@/lib/api';
import { Product, ProductVariant } from '@/types';

type CartItem = {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  product: Partial<Product>;
  variant?: Partial<ProductVariant>;
};

type Cart = {
  id: string;
  items: CartItem[];
  total_items: number;
  subtotal: number;
  total: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
};

type UseCartReturn = {
  cart: Cart | null;
  loading: boolean;
  error: Error | null;
  addToCart: (productId: string, quantity: number, variantId?: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

// Mock initial cart data for development
const mockCart: Cart = {
  id: 'cart-123',
  items: [],
  total_items: 0,
  subtotal: 0,
  total: 0,
  tax_amount: 0,
  shipping_amount: 0,
  discount_amount: 0,
};

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load cart from local storage or API on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        
        // In a real app, we would fetch the cart from the API
        // const response = await apiClient.get<Cart>(API_ENDPOINTS.CART.BASE);
        // setCart(response);
        
        // For now, use mock data or localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        } else {
          setCart(mockCart);
          localStorage.setItem('cart', JSON.stringify(mockCart));
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (productId: string, quantity: number, variantId?: string) => {
    try {
      setLoading(true);
      
      // In a real app, we would call the API
      // const response = await apiClient.post<Cart>(API_ENDPOINTS.CART.ADD, {
      //   product_id: productId,
      //   variant_id: variantId,
      //   quantity,
      // });
      // setCart(response);
      
      // For now, update the local cart
      if (cart) {
        // Find if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(
          (item) => item.product_id === productId && item.variant_id === variantId
        );
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity += quantity;
          
          setCart({
            ...cart,
            items: updatedItems,
            total_items: cart.total_items + quantity,
            // In a real app, we would recalculate these values based on product prices
            subtotal: cart.subtotal + (quantity * 99.99),
            total: cart.total + (quantity * 99.99),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `item-${Date.now()}`,
            product_id: productId,
            variant_id: variantId,
            quantity,
            product: {
              id: productId,
              name: 'Product Name', // This would come from the API
              price: 99.99, // This would come from the API
            },
          };
          
          setCart({
            ...cart,
            items: [...cart.items, newItem],
            total_items: cart.total_items + quantity,
            // In a real app, we would recalculate these values based on product prices
            subtotal: cart.subtotal + (quantity * 99.99),
            total: cart.total + (quantity * 99.99),
          });
        }
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item to cart'));
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      
      // In a real app, we would call the API
      // const response = await apiClient.put<Cart>(`${API_ENDPOINTS.CART.UPDATE}/${itemId}`, {
      //   quantity,
      // });
      // setCart(response);
      
      // For now, update the local cart
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.id === itemId);
        
        if (itemIndex >= 0) {
          const oldQuantity = cart.items[itemIndex].quantity;
          const quantityDiff = quantity - oldQuantity;
          
          const updatedItems = [...cart.items];
          updatedItems[itemIndex].quantity = quantity;
          
          setCart({
            ...cart,
            items: updatedItems,
            total_items: cart.total_items + quantityDiff,
            // In a real app, we would recalculate these values based on product prices
            subtotal: cart.subtotal + (quantityDiff * 99.99),
            total: cart.total + (quantityDiff * 99.99),
          });
        }
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update cart item'));
      console.error('Error updating cart item:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      
      // In a real app, we would call the API
      // const response = await apiClient.delete<Cart>(`${API_ENDPOINTS.CART.REMOVE}/${itemId}`);
      // setCart(response);
      
      // For now, update the local cart
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.id === itemId);
        
        if (itemIndex >= 0) {
          const removedItem = cart.items[itemIndex];
          const updatedItems = cart.items.filter((item) => item.id !== itemId);
          
          setCart({
            ...cart,
            items: updatedItems,
            total_items: cart.total_items - removedItem.quantity,
            // In a real app, we would recalculate these values based on product prices
            subtotal: cart.subtotal - (removedItem.quantity * 99.99),
            total: cart.total - (removedItem.quantity * 99.99),
          });
        }
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove item from cart'));
      console.error('Error removing from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      
      // In a real app, we would call the API
      // const response = await apiClient.delete<Cart>(API_ENDPOINTS.CART.CLEAR);
      // setCart(response);
      
      // For now, reset the local cart
      setCart(mockCart);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to clear cart'));
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
