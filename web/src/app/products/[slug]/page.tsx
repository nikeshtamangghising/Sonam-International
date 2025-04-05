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
  try {
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
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return {
      title: "Error | Sonam International",
      description: "An error occurred while loading the product.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await ProductService.getProductBySlug(params.slug);

    if (!product) {
      notFound();
    }

    // Get related products
    let relatedProducts = [];
    try {
      relatedProducts = await ProductService.getRelatedProducts(product.id);
    } catch (relatedError) {
      console.error("Error fetching related products:", relatedError);
      // Continue with empty related products
    }

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
  } catch (error) {
    console.error("Error fetching product:", error);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Failed to load product. Please try again later.</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href="/products" className="inline-block bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Back to Products
          </a>
        </div>
      </div>
    );
  }
}
