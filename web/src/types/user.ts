export type Address = {
  id: string;
  address_type: 'shipping' | 'billing';
  is_default: boolean;
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

export type UserProfile = {
  id: string;
  profile_picture?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  bio?: string;
  preferences?: {
    [key: string]: any;
  };
  marketing_consent: boolean;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'customer' | 'admin' | 'staff';
  profile?: UserProfile;
  addresses: Address[];
  created_at: string;
  updated_at: string;
  last_login?: string;
};
