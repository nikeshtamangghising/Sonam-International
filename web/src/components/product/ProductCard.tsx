'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  slug: string;
};

const ProductCard = ({
  id,
  name,
  price,
  salePrice,
  image,
  category,
  slug,
}: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    // Add to cart functionality will be implemented later
    console.log(`Added ${name} to cart`);
  };

  const handleQuickView = () => {
    // Quick view functionality will be implemented later
    console.log(`Quick view for ${name}`);
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={`/products/${slug}`}>
          <div className="relative h-64 w-full">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
        </Link>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Sale badge */}
        {salePrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Sale
          </div>
        )}
        
        {/* Action buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 mx-1"
          >
            Quick View
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-700 mx-1"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-medium text-lg mb-1 hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{category}</p>
        <div className="flex items-center">
          {salePrice ? (
            <>
              <span className="font-bold text-red-500 mr-2">{formatPrice(salePrice)}</span>
              <span className="text-gray-500 line-through text-sm">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="font-bold">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
