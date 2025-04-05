export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Sonam International</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Welcome to Sonam International, where fashion meets quality and style meets affordability. 
            We are a premier clothing retailer dedicated to bringing you the latest trends and timeless 
            classics from around the world.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, Sonam International began with a simple mission: to make high-quality 
            fashion accessible to everyone. What started as a small boutique has grown into a 
            thriving online marketplace, offering a carefully curated selection of clothing and 
            accessories for men and women.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">
                We source our products from trusted manufacturers who share our commitment to 
                quality and ethical production practices.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We strive to provide exceptional service 
                and a seamless shopping experience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainable Fashion</h3>
              <p className="text-gray-600">
                We are committed to promoting sustainable fashion practices and reducing our 
                environmental impact.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Global Inspiration</h3>
              <p className="text-gray-600">
                Our collections are inspired by global fashion trends, bringing you unique 
                styles from around the world.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            Behind Sonam International is a dedicated team of fashion enthusiasts, designers, 
            and customer service professionals. We work together to bring you the best shopping 
            experience possible, from product selection to delivery.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Future</h2>
          <p className="text-gray-600">
            As we continue to grow, we remain committed to our core values while embracing 
            innovation and new opportunities. We look forward to serving you and being your 
            trusted partner in fashion for years to come.
          </p>
        </div>
      </div>
    </div>
  );
} 