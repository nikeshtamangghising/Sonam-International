import { NextResponse } from 'next/server';

// Mock data for categories
const mockCategories = [
  {
    id: '1',
    name: "Women's Clothing",
    description: "Stylish and comfortable clothing for women",
    slug: "womens-clothing",
    productCount: 24,
    imageUrl: "https://example.com/images/womens-clothing.jpg"
  },
  {
    id: '2',
    name: "Men's Clothing",
    description: "Contemporary fashion for modern men",
    slug: "mens-clothing",
    productCount: 18,
    imageUrl: "https://example.com/images/mens-clothing.jpg"
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Complete your look with our trendy accessories',
    slug: 'accessories',
    productCount: 12,
    imageUrl: "https://example.com/images/accessories.jpg"
  },
  {
    id: '4',
    name: 'Footwear',
    description: 'Comfortable and stylish footwear for all occasions',
    slug: 'footwear',
    productCount: 15,
    imageUrl: "https://example.com/images/footwear.jpg"
  }
];

export async function GET() {
  try {
    // Return mock data
    return NextResponse.json(mockCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 