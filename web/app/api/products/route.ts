import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential cotton t-shirt in classic white',
    price: 24.99,
    imageUrl: 'https://example.com/images/white-tshirt.jpg',
    slug: 'classic-white-tshirt',
    category: {
      name: "Men's Clothing",
      slug: 'mens-clothing'
    }
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    description: 'Light and breezy floral print dress',
    price: 79.99,
    imageUrl: 'https://example.com/images/floral-dress.jpg',
    slug: 'floral-summer-dress',
    category: {
      name: "Women's Clothing",
      slug: 'womens-clothing'
    }
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    description: 'Stylish leather crossbody bag with adjustable strap',
    price: 89.99,
    imageUrl: 'https://example.com/images/leather-bag.jpg',
    slug: 'leather-crossbody-bag',
    category: {
      name: 'Accessories',
      slug: 'accessories'
    }
  },
  {
    id: '4',
    name: 'Classic Leather Sneakers',
    description: 'Comfortable leather sneakers for everyday wear',
    price: 129.99,
    imageUrl: 'https://example.com/images/leather-sneakers.jpg',
    slug: 'classic-leather-sneakers',
    category: {
      name: 'Footwear',
      slug: 'footwear'
    }
  },
  {
    id: '5',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with modern fit',
    price: 89.99,
    imageUrl: 'https://example.com/images/denim-jacket.jpg',
    slug: 'denim-jacket',
    category: {
      name: "Men's Clothing",
      slug: 'mens-clothing'
    }
  },
  {
    id: '6',
    name: 'Silk Scarf',
    description: 'Elegant silk scarf with floral pattern',
    price: 34.99,
    imageUrl: 'https://example.com/images/silk-scarf.jpg',
    slug: 'silk-scarf',
    category: {
      name: 'Accessories',
      slug: 'accessories'
    }
  }
];

export async function GET() {
  try {
    // Return mock data
    return NextResponse.json(mockProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      categoryIds,
      images
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        },
        images: {
          create: images.map((image: string) => ({
            url: image
          }))
        }
      },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        images: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 