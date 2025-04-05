import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Sonam International",
  description: "Learn about Sonam International, our story, mission, and values.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Sonam International</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-600 mb-8">
            Sonam International is a premier clothing retailer dedicated to providing high-quality, 
            stylish apparel for men and women. Founded with a passion for fashion and a commitment 
            to excellence, we strive to offer our customers the best shopping experience possible.
          </p>
          
          <div className="my-12 relative h-96 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Store Image</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p>
            Established in 2010, Sonam International began as a small boutique in Kathmandu, Nepal. 
            Our founder, Sonam Sherpa, had a vision to create a clothing brand that combined traditional 
            craftsmanship with modern design. What started as a modest shop has now grown into an 
            international brand with a presence in multiple countries.
          </p>
          
          <p>
            Over the years, we have expanded our collection to include a wide range of clothing items, 
            from casual wear to formal attire, all while maintaining our commitment to quality and style. 
            Our journey has been marked by a dedication to innovation, sustainability, and customer satisfaction.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">Our Mission</h2>
          <p>
            At Sonam International, our mission is to provide our customers with clothing that not only 
            looks good but feels good too. We believe that fashion should be accessible to everyone, 
            which is why we offer a diverse range of styles at competitive prices.
          </p>
          
          <p>
            We are committed to:
          </p>
          
          <ul>
            <li>Providing high-quality clothing that stands the test of time</li>
            <li>Offering a diverse range of styles to suit different tastes and preferences</li>
            <li>Ensuring an exceptional shopping experience, both online and in-store</li>
            <li>Practicing ethical and sustainable business operations</li>
            <li>Supporting the communities in which we operate</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">Our Values</h2>
          <p>
            Our values guide everything we do at Sonam International:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p>
                We are committed to using the finest materials and craftsmanship in all our products.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p>
                We continuously strive to innovate and improve our designs and processes.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p>
                We are dedicated to minimizing our environmental impact through sustainable practices.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 mt-8">Join Us</h2>
          <p>
            We invite you to explore our collection and experience the Sonam International difference. 
            Whether you're shopping for everyday essentials or special occasion attire, we have something 
            for everyone.
          </p>
          
          <p>
            Thank you for choosing Sonam International. We look forward to serving you and being a part 
            of your fashion journey.
          </p>
        </div>
      </div>
    </div>
  );
}
