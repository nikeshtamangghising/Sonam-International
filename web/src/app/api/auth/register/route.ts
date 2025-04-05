import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/lib/services/user-service";

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, password, phone } = await request.json();

    // Validate input
    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    try {
      // Create user
      const user = await UserService.createUser({
        email,
        password,
        first_name,
        last_name,
        phone,
      });

      // Create default profile
      await UserService.createOrUpdateProfile(user.id, {
        marketing_consent: false,
      });

      // Return success response
      return NextResponse.json(
        {
          message: "User registered successfully",
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        },
        { status: 201 }
      );
    } catch (err: any) {
      // Handle duplicate email error
      if (err.message === "User with this email already exists") {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 409 }
        );
      }
      throw err;
    }
  } catch (error: any) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
