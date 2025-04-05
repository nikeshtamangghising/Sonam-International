import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Orders | Sonam International",
  description: "View and track your orders at Sonam International.",
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/login?callbackUrl=/account/orders");
  }
  
  // In a real app, we would fetch the user's orders from the database
  // For now, use mock data
  const orders = [
    {
      id: "ORD123456",
      date: "2023-04-01",
      status: "delivered",
      total: 129.99,
      items: 3,
    },
    {
      id: "ORD123455",
      date: "2023-03-15",
      status: "shipped",
      total: 79.99,
      items: 2,
    },
    {
      id: "ORD123454",
      date: "2023-02-28",
      status: "processing",
      total: 49.99,
      items: 1,
    },
  ];
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
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
                  <Link href="/account" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders" className="block px-4 py-2 rounded-md bg-primary-50 text-primary-700 font-medium">
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">Order History</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/account/orders/${order.id}`} className="text-primary-600 hover:text-primary-900">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
