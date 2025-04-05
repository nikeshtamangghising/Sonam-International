'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Category, Brand } from '@prisma/client';

type ProductFilterProps = {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string;
  selectedBrand?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
};

export default function ProductFilter({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  featured,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [priceRange, setPriceRange] = useState({
    min: minPrice || '',
    max: maxPrice || '',
  });
  
  const [showFeatured, setShowFeatured] = useState(featured || false);
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (selectedBrand) {
      params.set('brand', selectedBrand);
    }
    
    if (priceRange.min) {
      params.set('minPrice', priceRange.min.toString());
    }
    
    if (priceRange.max) {
      params.set('maxPrice', priceRange.max.toString());
    }
    
    if (showFeatured) {
      params.set('featured', 'true');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    router.push(pathname);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    
    if (e.target.value) {
      params.set('category', e.target.value);
    } else {
      params.delete('category');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    
    if (e.target.value) {
      params.set('brand', e.target.value);
    } else {
      params.delete('brand');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Categories */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Brands */}
      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <select
          id="brand"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedBrand || ''}
          onChange={handleBrandChange}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Price Range */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            id="featured"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            checked={showFeatured}
            onChange={(e) => setShowFeatured(e.target.checked)}
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            Featured Products
          </label>
        </div>
      </div>
      
      {/* Filter Actions */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={applyFilters}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
