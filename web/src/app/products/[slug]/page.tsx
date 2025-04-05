import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductService } from "@/lib/services/product-service";
import ProductDetail from "@/components/product/ProductDetail";
import ProductGrid from "@/components/product/ProductGrid";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await ProductService.getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found | Sonam International",
    };
  }
  
  return {
    title: `${product.name} | Sonam International`,
    description: product.meta_description || product.description_short || `Shop ${product.name} at Sonam International.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await ProductService.getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }
  
  // Get related products
  const relatedProducts = await ProductService.getRelatedProducts(product.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
