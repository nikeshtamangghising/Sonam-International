import { Metadata } from "next";
import Link from "next/link";
import { ProductService } from "@/lib/services/product-service";

export const metadata: Metadata = {
  title: "Categories | Sonam International",
  description: "Browse all product categories at Sonam International.",
};

export default async function CategoriesPage() {
  const categories = await ProductService.getCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-gray-200">
              {category.image_url && (
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">{category.name}</h2>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{category.description || `Browse our ${category.name} collection`}</p>
              <p className="mt-2 text-primary-600 group-hover:text-primary-700 font-medium">
                Shop Now <span aria-hidden="true">&rarr;</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
