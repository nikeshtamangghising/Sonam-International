import { Address } from './user';
import { Product, ProductVariant } from './product';

export type OrderItem = {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  product?: Partial<Product>;
  variant?: Partial<ProductVariant>;
};

export type Order = {
  id: string;
  user_id?: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  shipping_address: Address;
  billing_address: Address;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_method: string;
  tracking_number?: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
};
