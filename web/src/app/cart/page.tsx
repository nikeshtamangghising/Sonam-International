'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

export const metadata = {
  title: "Shopping Cart | Sonam International",
  description: "View and manage your shopping cart at Sonam International.",
};

export default function CartPage() {
  const { cart, loading, error, updateCartItem, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="flex justify-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="flex justify-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                An error occurred while loading your cart. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/products" className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-700">Product</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="text-sm font-medium text-gray-700">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="text-sm font-medium text-gray-700">Quantity</h3>
              </div>
              <div className="col-span-2 text-right">
                <h3 className="text-sm font-medium text-gray-700">Total</h3>
              </div>
            </div>
            
            {cart.items.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-6 flex items-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mr-4">
                      {item.product.image && (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-gray-600">{item.variant.name}</p>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 text-center">
                    <p className="text-gray-900">
                      {formatPrice(item.product.sale_price || item.product.price)}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateCartItem(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-8 border-t border-b border-gray-300 text-center"
                      />
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 text-right">
                    <p className="text-gray-900 font-medium">
                      {formatPrice((item.product.sale_price || item.product.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link href="/products" className="text-primary-600 hover:text-primary-700">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </span>
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900">{formatPrice(cart.subtotal)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900">{formatPrice(cart.shipping_amount)}</p>
              </div>
              
              {cart.discount_amount > 0 && (
                <div className="flex justify-between">
                  <p className="text-gray-600">Discount</p>
                  <p className="text-red-600">-{formatPrice(cart.discount_amount)}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-900">{formatPrice(cart.tax_amount)}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-medium text-gray-900">{formatPrice(cart.total)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                href="/checkout"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-4">
                <svg className="h-8 w-auto text-gray-400" fill="currentColor" viewBox="0 0 36 24" aria-hidden="true">
                  <path d="M33 4a4 4 0 00-4-4H7a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V4z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M13 10a2 2 0 11-4 0 2 2 0 014 0z" fill="currentColor" />
                  <path d="M27 10a2 2 0 11-4 0 2 2 0 014 0z" fill="currentColor" />
                </svg>
                <svg className="h-8 w-auto text-gray-400" viewBox="0 0 36 24" fill="currentColor" aria-hidden="true">
                  <path d="M33 4a4 4 0 00-4-4H7a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V4z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 16h4" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg className="h-8 w-auto text-gray-400" viewBox="0 0 36 24" fill="currentColor" aria-hidden="true">
                  <path d="M33 4a4 4 0 00-4-4H7a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V4z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M18 12a4 4 0 100-8 4 4 0 000 8z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
