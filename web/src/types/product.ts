export type ProductVariant = {
  id: string;
  sku: string;
  name: string;
  price_adjustment: number;
  stock_quantity: number;
  is_active: boolean;
  attributes: {
    [key: string]: string;
  };
};

export type ProductImage = {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand_id: string;
  brand_name?: string;
  description_short: string;
  description_long: string;
  price: number;
  sale_price?: number;
  cost_price: number;
  is_active: boolean;
  is_featured: boolean;
  tax_category_id: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  meta_title?: string;
  meta_description?: string;
  categories: {
    id: string;
    name: string;
    slug: string;
    is_primary: boolean;
  }[];
  variants: ProductVariant[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
};
