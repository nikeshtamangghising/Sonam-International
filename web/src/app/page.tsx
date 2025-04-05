import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="w-full h-full relative">
              {/* Placeholder for hero image - replace with actual image */}
              <div className="w-full h-full bg-gray-800"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Elevate Your Style
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the latest fashion trends at Sonam International. Quality clothing for every occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link href="/new-arrivals" className="btn bg-white text-gray-900 hover:bg-gray-100">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Shop by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women's Category */}
            <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <div className="w-full h-full bg-gray-300"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Women</h3>
                  <Link href="/categories/women" className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>

            {/* Men's Category */}
            <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <div className="w-full h-full bg-gray-300"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Men</h3>
                  <Link href="/categories/men" className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <div className="w-full h-full bg-gray-300"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                  <Link href="/categories/accessories" className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Featured Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards would be dynamically generated here */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card group">
                <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                  <div className="w-full h-full bg-gray-200"></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 mx-1">
                      Quick View
                    </button>
                    <button className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-700 mx-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1">Product Name {item}</h3>
                <p className="text-gray-600 mb-2">Category</p>
                <p className="font-bold">$99.99</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Stay updated with our latest collections and exclusive offers.</p>

            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="btn btn-primary py-3"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
