'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading: cartLoading, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isClient, setIsClient] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    card_number: '',
    card_name: '',
    expiry_date: '',
    cvv: '',
    billing_same_as_shipping: true,
  });
  
  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (isClient && cart && cart.items.length === 0 && !cartLoading) {
      router.push('/cart');
    }
  }, [cart, cartLoading, isClient, router]);
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
    window.scrollTo(0, 0);
  };
  
  // Handle order placement
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      // In a real app, we would call an API to place the order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart
      await clearCart();
      
      // Redirect to success page
      router.push('/checkout/success?order_id=123456');
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Loading state
  if (!isClient || cartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Empty cart
  if (cart && cart.items.length === 0) {
    return null; // Will redirect to cart
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'shipping' ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
            } font-bold text-sm`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${
              step === 'shipping' ? 'bg-gray-300' : 'bg-primary-600'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'payment' ? 'bg-primary-600 text-white' : step === 'review' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-600'
            } font-bold text-sm`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${
              step === 'review' ? 'bg-primary-600' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            } font-bold text-sm`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className={step === 'shipping' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
              Shipping
            </div>
            <div className={step === 'payment' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
              Payment
            </div>
            <div className={step === 'review' ? 'text-primary-600 font-medium' : 'text-gray-600'}>
              Review
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Shipping Step */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.first_name}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, first_name: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.last_name}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, last_name: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="address_line1"
                        name="address_line1"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={shippingInfo.address_line1}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address_line1: e.target.value })}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={shippingInfo.address_line2}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address_line2: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postal_code"
                          name="postal_code"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={shippingInfo.postal_code}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postal_code: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="NP">Nepal</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link
                        href="/cart"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        &larr; Back to Cart
                      </Link>
                      
                      <button
                        type="submit"
                        className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Payment Step */}
              {step === 'payment' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Payment Information</h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <label htmlFor="card_number" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="card_number"
                        name="card_number"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={paymentInfo.card_number}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, card_number: e.target.value })}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="card_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="card_name"
                        name="card_name"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={paymentInfo.card_name}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, card_name: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiry_date"
                          name="expiry_date"
                          placeholder="MM/YY"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={paymentInfo.expiry_date}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry_date: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          id="billing_same"
                          name="billing_same"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={paymentInfo.billing_same_as_shipping}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, billing_same_as_shipping: e.target.checked })}
                        />
                        <label htmlFor="billing_same" className="ml-2 block text-sm text-gray-900">
                          Billing address is the same as shipping address
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        &larr; Back to Shipping
                      </button>
                      
                      <button
                        type="submit"
                        className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Review Step */}
              {step === 'review' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Review Your Order</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>
                        {shippingInfo.first_name} {shippingInfo.last_name}
                      </p>
                      <p>{shippingInfo.address_line1}</p>
                      {shippingInfo.address_line2 && <p>{shippingInfo.address_line2}</p>}
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postal_code}
                      </p>
                      <p>{shippingInfo.country}</p>
                      <p>{shippingInfo.phone}</p>
                      <p>{shippingInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Payment Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>
                        Card ending in {paymentInfo.card_number.slice(-4)}
                      </p>
                      <p>
                        Expires: {paymentInfo.expiry_date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Order Items</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {cart && cart.items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            {item.variant && <p className="text-sm text-gray-600">{item.variant.name}</p>}
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {formatPrice((item.product.sale_price || item.product.price) * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      &larr; Back to Payment
                    </button>
                    
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              {cart && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
