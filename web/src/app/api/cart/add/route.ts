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

export async function POST(request: NextRequest) {
  try {
    const { product_id, variant_id, quantity } = await request.json();
    
    // Validate input
    if (!product_id || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }
    
    // Find product
    const product = mockProducts.find(p => p.id === product_id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find variant if provided
    let variant = null;
    if (variant_id) {
      variant = product.variants.find(v => v.id === variant_id);
      if (!variant) {
        return NextResponse.json(
          { error: 'Variant not found' },
          { status: 404 }
        );
      }
    }
    
    // In a real app, we would add the item to the cart in the database
    // For now, just return a mock updated cart
    
    // Check if the item is already in the cart
    const existingItemIndex = mockCart.items.findIndex(
      item => item.product_id === product_id && item.variant_id === variant_id
    );
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...mockCart.items];
      updatedItems[existingItemIndex].quantity += quantity;
      
      const updatedCart = {
        ...mockCart,
        items: updatedItems,
        total_items: mockCart.total_items + quantity,
        subtotal: mockCart.subtotal + (quantity * product.price),
        total: mockCart.total + (quantity * product.price),
      };
      
      return NextResponse.json(updatedCart);
    } else {
      // Add new item
      const newItem = {
        id: `item-${Date.now()}`,
        product_id,
        variant_id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          image: product.images[0]?.url,
        },
        variant: variant ? {
          id: variant.id,
          name: variant.name,
          price_adjustment: variant.price_adjustment,
        } : null,
      };
      
      const updatedCart = {
        ...mockCart,
        items: [...mockCart.items, newItem],
        total_items: mockCart.total_items + quantity,
        subtotal: mockCart.subtotal + (quantity * product.price),
        total: mockCart.total + (quantity * product.price),
      };
      
      return NextResponse.json(updatedCart);
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}
