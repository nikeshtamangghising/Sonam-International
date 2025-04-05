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

export async function POST(request: NextRequest) {
  try {
    const { email, password, first_name, last_name, phone } = await request.json();
    
    // Validate input
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'Email, password, first name, and last name are required' },
        { status: 400 }
      );
    }
    
    // Check if email is already in use
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already in use' },
        { status: 409 }
      );
    }
    
    // In a real app, we would hash the password and save the user to the database
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password, // In a real app, this would be hashed
      first_name,
      last_name,
      phone,
      status: 'active',
      role: 'customer',
      profile: {
        id: `profile-${Date.now()}`,
        marketing_consent: false,
      },
      addresses: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // In a real app, we would generate a JWT token here
    const token = 'mock-jwt-token';
    
    // Remove sensitive information before returning user data
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Set cookie with token
    const response = NextResponse.json({
      user: userWithoutPassword,
      token
    }, { status: 201 });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
