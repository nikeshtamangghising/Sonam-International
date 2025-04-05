import { Metadata } from "next";
import { ProductService } from "@/lib/services/product-service";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilter from "@/components/product/ProductFilter";

export const metadata: Metadata = {
  title: "Shop All Products | Sonam International",
  description: "Browse our collection of high-quality clothing and accessories.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parse search params
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 12;
  const category = searchParams.category as string | undefined;
  const brand = searchParams.brand as string | undefined;
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice as string) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice as string) : undefined;
  const search = searchParams.search as string | undefined;
  const featured = searchParams.featured === "true" ? true : undefined;
  const sortBy = searchParams.sortBy as "price_asc" | "price_desc" | "newest" | "popularity" | undefined;

  // Fetch products
  const { products, pagination } = await ProductService.getProducts({
    page,
    limit,
    category,
    brand,
    minPrice,
    maxPrice,
    search,
    featured,
    sortBy,
  });

  // Fetch categories and brands for filters
  const [categories, brands] = await Promise.all([
    ProductService.getCategories(),
    ProductService.getBrands(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-1/4">
          <ProductFilter
            categories={categories}
            brands={brands}
            selectedCategory={category}
            selectedBrand={brand}
            minPrice={minPrice}
            maxPrice={maxPrice}
            featured={featured}
          />
        </div>
        
        {/* Products */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                defaultValue={sortBy || "newest"}
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          
          <ProductGrid products={products} />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`px-3 py-2 border border-gray-300 ${
                      pageNum === pagination.page
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
