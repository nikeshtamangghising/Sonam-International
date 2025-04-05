import { NextRequest, NextResponse } from 'next/server';

// Mock products data (simplified version of the products in the products route)
const mockProducts = [
  {
    id: 'product-1',
    sku: 'WS-T-001',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    price: 29.99,
    sale_price: null,
    images: [
      {
        id: 'image-1',
        url: '/images/products/white-tshirt-1.jpg',
        alt_text: 'White T-Shirt Front View',
        is_primary: true,
      }
    ],
    variants: [
      {
        id: 'variant-1',
        sku: 'WS-T-001-S',
        name: 'Small',
        price_adjustment: 0,
      },
      {
        id: 'variant-2',
        sku: 'WS-T-001-M',
        name: 'Medium',
        price_adjustment: 0,
      }
    ]
  },
  {
    id: 'product-2',
    sku: 'MS-J-001',
    name: 'Men\'s Denim Jacket',
    slug: 'mens-denim-jacket',
    price: 89.99,
    sale_price: 69.99,
    images: [
      {
        id: 'image-3',
        url: '/images/products/denim-jacket-1.jpg',
        alt_text: 'Denim Jacket Front View',
        is_primary: true,
      }
    ],
    variants: [
      {
        id: 'variant-4',
        sku: 'MS-J-001-M',
        name: 'Medium',
        price_adjustment: 0,
      },
      {
        id: 'variant-5',
        sku: 'MS-J-001-L',
        name: 'Large',
        price_adjustment: 0,
      }
    ]
  }
];

// Mock cart data
const mockCart = {
  id: 'cart-1',
  items: [
    {
      id: 'item-1',
      product_id: 'product-1',
      variant_id: 'variant-1',
      quantity: 2,
      product: {
        id: 'product-1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        sale_price: null,
        image: '/images/products/white-tshirt-1.jpg',
      },
      variant: {
        id: 'variant-1',
        name: 'Small',
        price_adjustment: 0,
      }
    }
  ],
  total_items: 2,
  subtotal: 59.98,
  total: 59.98,
  tax_amount: 0,
  shipping_amount: 0,
  discount_amount: 0,
};

export async function GET(request: NextRequest) {
  try {
    // In a real app, we would get the cart from the database based on the user's session
    // For now, just return the mock cart
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to get cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real app, we would create a new cart in the database
    // For now, just return the mock cart
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Create cart error:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}
