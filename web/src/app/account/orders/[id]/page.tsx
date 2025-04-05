import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";

type OrderPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  return {
    title: `Order ${params.id} | Sonam International`,
    description: `View details for order ${params.id} at Sonam International.`,
  };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/login?callbackUrl=/account/orders/" + params.id);
  }
  
  // In a real app, we would fetch the order details from the database
  // For now, use mock data
  const order = {
    id: params.id,
    date: "2023-04-01T12:00:00Z",
    status: "delivered",
    total: 129.99,
    subtotal: 119.99,
    tax: 10.00,
    shipping: 0,
    discount: 0,
    payment_method: "Credit Card (ending in 1234)",
    shipping_address: {
      name: "John Doe",
      address_line1: "123 Main St",
      address_line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "United States",
    },
    items: [
      {
        id: "item-1",
        product_id: "product-1",
        name: "Classic T-Shirt",
        variant: "Medium, Blue",
        price: 29.99,
        quantity: 2,
        image: "/placeholder.jpg",
      },
      {
        id: "item-2",
        product_id: "product-2",
        name: "Slim Fit Jeans",
        variant: "32x32, Black",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.jpg",
      },
    ],
    timeline: [
      {
        status: "delivered",
        date: "2023-04-05T14:30:00Z",
        description: "Package delivered",
      },
      {
        status: "shipped",
        date: "2023-04-03T09:15:00Z",
        description: "Order shipped via USPS",
      },
      {
        status: "processing",
        date: "2023-04-02T16:45:00Z",
        description: "Order processed and ready for shipment",
      },
      {
        status: "pending",
        date: "2023-04-01T12:00:00Z",
        description: "Order placed",
      },
    ],
  };
  
  // Check if order exists
  if (!order) {
    notFound();
  }
  
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
      hour: 'numeric',
      minute: 'numeric',
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <Link href="/account/orders" className="text-primary-600 hover:text-primary-700">
          &larr; Back to Orders
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">Order #{order.id}</h2>
                  <p className="text-gray-600">Placed on {formatDate(order.date)}</p>
                </div>
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Items</h3>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 mr-4 relative overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-gray-900 font-medium">{item.name}</h4>
                          {item.variant && (
                            <p className="text-sm text-gray-600">{item.variant}</p>
                          )}
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900 font-medium">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <Link
                          href={`/products/${item.product_id}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">Order Timeline</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-8">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    {index < order.timeline.length - 1 && (
                      <div className="absolute top-6 left-3 w-0.5 h-full -ml-px bg-gray-200"></div>
                    )}
                    
                    <div className="flex items-start">
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded-full ${
                        getStatusColor(event.status).split(' ')[0]
                      } mr-4`}>
                        <span className="h-2 w-2 rounded-full bg-current"></span>
                      </div>
                      
                      <div>
                        <p className="text-gray-900 font-medium">{event.description}</p>
                        <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900">{formatPrice(order.subtotal)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900">{formatPrice(order.shipping)}</p>
              </div>
              
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-gray-600">Discount</p>
                  <p className="text-red-600">-{formatPrice(order.discount)}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-900">{formatPrice(order.tax)}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-medium text-gray-900">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            
            <div className="space-y-1">
              <p className="font-medium">{order.shipping_address.name}</p>
              <p>{order.shipping_address.address_line1}</p>
              {order.shipping_address.address_line2 && (
                <p>{order.shipping_address.address_line2}</p>
              )}
              <p>
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
              </p>
              <p>{order.shipping_address.country}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Payment Information</h3>
            
            <p>{order.payment_method}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
