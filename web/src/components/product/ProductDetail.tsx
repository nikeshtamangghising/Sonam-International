'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Product, ProductVariant, Brand, Category, ProductImage, Review } from '@prisma/client';

type ProductDetailProps = {
  product: Product & {
    brand: Brand;
    categories: {
      category: Category;
    }[];
    images: ProductImage[];
    variants: (ProductVariant & {
      attributes: {
        attribute: {
          id: string;
          name: string;
          display_name: string;
          type: string;
        };
        value: string;
      }[];
      images: ProductImage[];
    })[];
    reviews: (Review & {
      user: {
        id: string;
        first_name: string;
        last_name: string;
      };
    })[];
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, loading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Get all available attributes
  const attributes = product.variants.reduce((acc, variant) => {
    variant.attributes.forEach((attr) => {
      const attributeName = attr.attribute.name;
      if (!acc[attributeName]) {
        acc[attributeName] = {
          id: attr.attribute.id,
          name: attributeName,
          displayName: attr.attribute.display_name,
          values: new Set(),
        };
      }
      acc[attributeName].values.add(attr.value);
    });
    return acc;
  }, {} as Record<string, { id: string; name: string; displayName: string; values: Set<string> }>);
  
  // Convert to array and sort values
  const attributesList = Object.values(attributes).map((attr) => ({
    ...attr,
    values: Array.from(attr.values).sort(),
  }));
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Calculate average rating
  const averageRating = product.reviews.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;
  
  // Handle add to cart
  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity, selectedVariant || undefined);
      // Show success message or open cart drawer
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };
  
  // Get images to display
  const displayImages = selectedVariant
    ? product.variants.find((v) => v.id === selectedVariant)?.images.length
      ? product.variants.find((v) => v.id === selectedVariant)!.images
      : product.images
    : product.images;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div>
          <div className="relative h-96 w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {displayImages.length > 0 ? (
              <Image
                src={displayImages[activeImageIndex].url}
                alt={displayImages[activeImageIndex].alt_text || product.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          {displayImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {displayImages.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative h-20 bg-gray-100 rounded-md overflow-hidden ${
                    index === activeImageIndex ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text || `${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">
                  {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              
              <Link href={`/brands/${product.brand.slug}`} className="text-primary-600 hover:underline">
                {product.brand.name}
              </Link>
            </div>
            
            <div className="mb-4">
              {product.sale_price ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-red-600 mr-2">
                    {formatPrice(parseFloat(product.sale_price.toString()))}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(parseFloat(product.price.toString()))}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(parseFloat(product.price.toString()))}
                </span>
              )}
            </div>
            
            <div className="prose prose-sm text-gray-500 mb-6">
              <p>{product.description_short}</p>
            </div>
          </div>
          
          {/* Variants */}
          {attributesList.length > 0 && (
            <div className="mb-6">
              {attributesList.map((attribute) => (
                <div key={attribute.id} className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{attribute.displayName}</h3>
                  <div className="flex flex-wrap gap-2">
                    {attribute.values.map((value) => {
                      // Find variants with this attribute value
                      const variantsWithValue = product.variants.filter((variant) =>
                        variant.attributes.some(
                          (attr) => attr.attribute.name === attribute.name && attr.value === value
                        )
                      );
                      
                      // Check if any variant with this value is selected
                      const isSelected = selectedVariant
                        ? variantsWithValue.some((v) => v.id === selectedVariant)
                        : false;
                      
                      return (
                        <button
                          key={value}
                          className={`px-3 py-1 border rounded-md ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            // If there's only one variant with this value, select it
                            if (variantsWithValue.length === 1) {
                              setSelectedVariant(variantsWithValue[0].id);
                            }
                            // Otherwise, we'd need a more complex selection logic
                          }}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button className="flex-1 border border-gray-300 bg-white text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Add to Wishlist
            </button>
          </div>
          
          {/* Categories */}
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Categories:{' '}
              {product.categories.map((pc, index) => (
                <span key={pc.category.id}>
                  <Link href={`/categories/${pc.category.slug}`} className="text-primary-600 hover:underline">
                    {pc.category.name}
                  </Link>
                  {index < product.categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-t border-gray-200 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'description'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'details'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description_long || '' }} />
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Product Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{product.brand.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{product.weight} kg</span>
                  </li>
                </ul>
              </div>
              
              {product.dimensions && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Dimensions</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Length</span>
                      <span className="font-medium">{(product.dimensions as any).length} cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Width</span>
                      <span className="font-medium">{(product.dimensions as any).width} cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium">{(product.dimensions as any).height} cm</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      Based on {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                </div>
              </div>
              
              {product.reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <h4 className="ml-2 text-sm font-medium text-gray-900">{review.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        By {review.user.first_name} {review.user.last_name} on{' '}
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8">
                <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
