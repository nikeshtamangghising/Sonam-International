'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilter from '@/components/product/ProductFilter';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  
  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // In a real app, we would fetch from an API
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock products
        const mockProducts = Array.from({ length: 6 }, (_, i) => ({
          id: `product-${i + 1}`,
          name: `Product ${i + 1} matching "${query}"`,
          price: 49.99 + i * 10,
          sale_price: i % 3 === 0 ? 39.99 + i * 10 : null,
          slug: `product-${i + 1}`,
          brand: {
            id: 'brand-1',
            name: 'Brand Name',
            slug: 'brand-name',
          },
          images: [
            {
              id: `image-${i + 1}`,
              url: '/placeholder.jpg',
              alt_text: `Product ${i + 1}`,
              is_primary: true,
              sort_order: 0,
            },
          ],
        }));
        
        setProducts(mockProducts);
        setPagination({
          page: 1,
          limit: 12,
          total: mockProducts.length,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        });
        
        // Mock categories and brands
        setCategories([
          { id: 'cat-1', name: 'Category 1', slug: 'category-1' },
          { id: 'cat-2', name: 'Category 2', slug: 'category-2' },
        ]);
        
        setBrands([
          { id: 'brand-1', name: 'Brand 1', slug: 'brand-1' },
          { id: 'brand-2', name: 'Brand 2', slug: 'brand-2' },
        ]);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {query ? `Search Results for "${query}"` : 'Search Products'}
        </h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="flex">
            <input
              type="text"
              name="search"
              placeholder="Search for products..."
              defaultValue={query}
              className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {query && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-1/4">
            <ProductFilter
              categories={categories}
              brands={brands}
              selectedCategory={searchParams.get('category') || undefined}
              selectedBrand={searchParams.get('brand') || undefined}
              minPrice={searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice') as string) : undefined}
              maxPrice={searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice') as string) : undefined}
              featured={searchParams.get('featured') === 'true' ? true : undefined}
            />
          </div>
          
          {/* Products */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing {products.length} results for "{query}"
                  </p>
                  
                  <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                    <select
                      id="sort"
                      className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      defaultValue={searchParams.get('sortBy') || 'relevance'}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
                
                <ProductGrid products={products} />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-500">
                  We couldn't find any products matching "{query}". Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
