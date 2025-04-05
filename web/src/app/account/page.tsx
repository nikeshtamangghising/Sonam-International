import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Account | Sonam International",
  description: "Manage your account, orders, and preferences at Sonam International.",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/login?callbackUrl=/account");
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {session.user.name || session.user.email}
              </h2>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="block px-4 py-2 rounded-md bg-primary-50 text-primary-700 font-medium">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/account/addresses" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                    Addresses
                  </Link>
                </li>
                <li>
                  <Link href="/account/profile" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/account/wishlist" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/auth/logout" className="block px-4 py-2 rounded-md text-red-600 hover:bg-red-50">
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
                <p className="text-gray-600 mb-4">
                  View and track your recent orders.
                </p>
                <Link href="/account/orders" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Orders <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Shipping Addresses</h3>
                <p className="text-gray-600 mb-4">
                  Manage your shipping and billing addresses.
                </p>
                <Link href="/account/addresses" className="text-primary-600 hover:text-primary-700 font-medium">
                  Manage Addresses <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Account Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1">{session.user.name || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">{session.user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="mt-1">April 2023</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/account/profile" className="text-primary-600 hover:text-primary-700 font-medium">
                  Edit Profile <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
