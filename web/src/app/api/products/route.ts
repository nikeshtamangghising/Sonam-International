import { NextRequest, NextResponse } from 'next/server';

// Mock data for development
const mockProducts = [
  {
    id: 'product-1',
    sku: 'WS-T-001',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    brand_id: 'brand-1',
    brand_name: 'Sonam Basics',
    description_short: 'A comfortable and versatile white t-shirt for everyday wear.',
    description_long: 'This classic white t-shirt is made from 100% organic cotton, providing both comfort and durability. Perfect for casual outings or as a layering piece, it features a regular fit and crew neck design.',
    price: 29.99,
    sale_price: null,
    cost_price: 12.50,
    is_active: true,
    is_featured: true,
    tax_category_id: 'tax-1',
    weight: 0.2,
    dimensions: {
      length: 30,
      width: 20,
      height: 2
    },
    meta_title: 'Classic White T-Shirt | Sonam Clothing',
    meta_description: 'Shop our comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    categories: [
      {
        id: 'category-1',
        name: 'Women',
        slug: 'women',
        is_primary: false
      },
      {
        id: 'category-2',
        name: 'T-Shirts',
        slug: 't-shirts',
        is_primary: true
      }
    ],
    variants: [
      {
        id: 'variant-1',
        sku: 'WS-T-001-S',
        name: 'Small',
        price_adjustment: 0,
        stock_quantity: 25,
        is_active: true,
        attributes: {
          size: 'S'
        }
      },
      {
        id: 'variant-2',
        sku: 'WS-T-001-M',
        name: 'Medium',
        price_adjustment: 0,
        stock_quantity: 30,
        is_active: true,
        attributes: {
          size: 'M'
        }
      },
      {
        id: 'variant-3',
        sku: 'WS-T-001-L',
        name: 'Large',
        price_adjustment: 0,
        stock_quantity: 20,
        is_active: true,
        attributes: {
          size: 'L'
        }
      }
    ],
    images: [
      {
        id: 'image-1',
        url: '/images/products/white-tshirt-1.jpg',
        alt_text: 'White T-Shirt Front View',
        is_primary: true,
        sort_order: 1
      },
      {
        id: 'image-2',
        url: '/images/products/white-tshirt-2.jpg',
        alt_text: 'White T-Shirt Back View',
        is_primary: false,
        sort_order: 2
      }
    ],
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 'product-2',
    sku: 'MS-J-001',
    name: 'Men\'s Denim Jacket',
    slug: 'mens-denim-jacket',
    brand_id: 'brand-2',
    brand_name: 'Sonam Premium',
    description_short: 'A stylish denim jacket for men.',
    description_long: 'This classic denim jacket features a comfortable fit and timeless design. Made from high-quality denim fabric, it\'s perfect for layering in any season. Features include button closure, chest pockets, and adjustable cuffs.',
    price: 89.99,
    sale_price: 69.99,
    cost_price: 35.00,
    is_active: true,
    is_featured: true,
    tax_category_id: 'tax-1',
    weight: 0.8,
    dimensions: {
      length: 35,
      width: 25,
      height: 5
    },
    meta_title: 'Men\'s Denim Jacket | Sonam Clothing',
    meta_description: 'Shop our stylish men\'s denim jacket. Perfect for casual wear and layering in any season.',
    categories: [
      {
        id: 'category-3',
        name: 'Men',
        slug: 'men',
        is_primary: true
      },
      {
        id: 'category-4',
        name: 'Jackets',
        slug: 'jackets',
        is_primary: false
      }
    ],
    variants: [
      {
        id: 'variant-4',
        sku: 'MS-J-001-M',
        name: 'Medium',
        price_adjustment: 0,
        stock_quantity: 15,
        is_active: true,
        attributes: {
          size: 'M'
        }
      },
      {
        id: 'variant-5',
        sku: 'MS-J-001-L',
        name: 'Large',
        price_adjustment: 0,
        stock_quantity: 20,
        is_active: true,
        attributes: {
          size: 'L'
        }
      },
      {
        id: 'variant-6',
        sku: 'MS-J-001-XL',
        name: 'Extra Large',
        price_adjustment: 5.00,
        stock_quantity: 10,
        is_active: true,
        attributes: {
          size: 'XL'
        }
      }
    ],
    images: [
      {
        id: 'image-3',
        url: '/images/products/denim-jacket-1.jpg',
        alt_text: 'Denim Jacket Front View',
        is_primary: true,
        sort_order: 1
      },
      {
        id: 'image-4',
        url: '/images/products/denim-jacket-2.jpg',
        alt_text: 'Denim Jacket Back View',
        is_primary: false,
        sort_order: 2
      }
    ],
    created_at: '2023-02-10T14:30:00Z',
    updated_at: '2023-02-10T14:30:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Filter products based on query parameters
    let filteredProducts = [...mockProducts];
    
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categories.some(cat => cat.slug === category)
      );
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.is_featured);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Return response
    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page,
        limit,
        pages: Math.ceil(filteredProducts.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real app, we would validate the request and save to database
    const body = await request.json();
    
    // For now, just return a mock response
    return NextResponse.json(
      { message: 'Product created successfully', product: { id: 'new-product-id', ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
