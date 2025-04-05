import { NextRequest, NextResponse } from 'next/server';

// Mock user data for development (same as in login route)
const mockUsers = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    password: 'password123', // In a real app, this would be hashed
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1234567890',
    status: 'active',
    role: 'customer',
    profile: {
      id: 'profile-1',
      profile_picture: '/images/users/john-doe.jpg',
      date_of_birth: '1990-01-01',
      gender: 'male',
      marketing_consent: true,
    },
    addresses: [
      {
        id: 'address-1',
        address_type: 'shipping',
        is_default: true,
        first_name: 'John',
        last_name: 'Doe',
        address_line1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US',
        phone: '+1234567890',
      }
    ],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    last_login: '2023-04-01T12:00:00Z',
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, we would verify the JWT token from the cookie
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // In a real app, we would decode the token and find the user by ID
    // For now, just return the first mock user
    const user = mockUsers[0];
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Remove sensitive information before returning user data
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Failed to get current user' },
      { status: 500 }
    );
  }
}
