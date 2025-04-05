'use client';

import { Product } from "@prisma/client";
import ProductCard from "./ProductCard";

type ProductWithRelations = Product & {
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    id: string;
    url: string;
    alt_text: string | null;
    is_primary: boolean;
    sort_order: number;
  }[];
  categories?: {
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
};

type ProductGridProps = {
  products: ProductWithRelations[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">No products found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        // Get primary category
        const primaryCategory = product.categories?.find((c) => c.category)?.category;
        
        // Get primary image
        const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
        
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={parseFloat(product.price.toString())}
            salePrice={product.sale_price ? parseFloat(product.sale_price.toString()) : undefined}
            image={primaryImage?.url || ''}
            category={primaryCategory?.name || ''}
            slug={product.slug}
          />
        );
      })}
    </div>
  );
}
