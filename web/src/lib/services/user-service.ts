import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcrypt";
import { User, UserProfile, Address } from "@prisma/client";

export type CreateUserData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
};

export type UpdateUserData = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export type CreateProfileData = {
  profile_picture?: string;
  date_of_birth?: Date;
  gender?: string;
  bio?: string;
  marketing_consent?: boolean;
};

export type CreateAddressData = {
  address_type: "shipping" | "billing";
  is_default?: boolean;
  first_name: string;
  last_name: string;
  company?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
};

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(data: CreateUserData): Promise<User> {
    const { email, password, first_name, last_name, phone } = data;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        status: "active",
        role: "customer",
      },
    });
    
    return user;
  }
  
  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  
  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  
  /**
   * Update user
   */
  static async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const updateData: any = { ...data };
    
    // If password is provided, hash it
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(data.password, salt);
      delete updateData.password;
    }
    
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  
  /**
   * Create or update user profile
   */
  static async createOrUpdateProfile(userId: string, data: CreateProfileData): Promise<UserProfile> {
    const existingProfile = await prisma.userProfile.findUnique({
      where: { user_id: userId },
    });
    
    if (existingProfile) {
      return await prisma.userProfile.update({
        where: { user_id: userId },
        data,
      });
    } else {
      return await prisma.userProfile.create({
        data: {
          ...data,
          user_id: userId,
        },
      });
    }
  }
  
  /**
   * Add address to user
   */
  static async addAddress(userId: string, data: CreateAddressData): Promise<Address> {
    // If this is the default address, unset any existing default of the same type
    if (data.is_default) {
      await prisma.address.updateMany({
        where: {
          user_id: userId,
          address_type: data.address_type,
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }
    
    return await prisma.address.create({
      data: {
        ...data,
        user_id: userId,
      },
    });
  }
  
  /**
   * Get user addresses
   */
  static async getUserAddresses(userId: string): Promise<Address[]> {
    return await prisma.address.findMany({
      where: { user_id: userId },
      orderBy: [
        { is_default: "desc" },
        { created_at: "desc" },
      ],
    });
  }
  
  /**
   * Get user with profile and addresses
   */
  static async getUserWithDetails(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        addresses: true,
      },
    });
  }
}
