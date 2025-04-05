import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

export type ProductFilterOptions = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popularity";
  page?: number;
  limit?: number;
};

export class ProductService {
  /**
   * Get all products with filtering and pagination
   */
  static async getProducts(options: ProductFilterOptions = {}) {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      featured,
      sortBy = "newest",
      page = 1,
      limit = 10,
    } = options;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ProductWhereInput = {
      is_active: true,
    };

    // Add category filter
    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
          },
        },
      };
    }

    // Add brand filter
    if (brand) {
      where.brand = {
        slug: brand,
      };
    }

    // Add price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description_short: { contains: search, mode: "insensitive" } },
        { description_long: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add featured filter
    if (featured !== undefined) {
      where.is_featured = featured;
    }

    // Build order by
    let orderBy: Prisma.ProductOrderByWithRelationInput = {};
    
    switch (sortBy) {
      case "price_asc":
        orderBy = { price: "asc" };
        break;
      case "price_desc":
        orderBy = { price: "desc" };
        break;
      case "popularity":
        orderBy = { order_items: { _count: "desc" } };
        break;
      case "newest":
      default:
        orderBy = { created_at: "desc" };
        break;
    }

    // Get products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          images: {
            where: {
              variant_id: null,
            },
            orderBy: [
              { is_primary: "desc" },
              { sort_order: "asc" },
            ],
            take: 1,
          },
          variants: {
            where: {
              is_active: true,
            },
            select: {
              id: true,
              sku: true,
              name: true,
              price_adjustment: true,
              stock_quantity: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  /**
   * Get product by slug
   */
  static async getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: {
        slug,
        is_active: true,
      },
      include: {
        brand: true,
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: [
            { is_primary: "desc" },
            { sort_order: "asc" },
          ],
        },
        variants: {
          where: {
            is_active: true,
          },
          include: {
            attributes: {
              include: {
                attribute: true,
              },
            },
            images: {
              orderBy: [
                { is_primary: "desc" },
                { sort_order: "asc" },
              ],
            },
          },
        },
        reviews: {
          where: {
            status: "approved",
          },
          include: {
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(limit: number = 8) {
    return await prisma.product.findMany({
      where: {
        is_active: true,
        is_featured: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          where: {
            variant_id: null,
          },
          orderBy: [
            { is_primary: "desc" },
            { sort_order: "asc" },
          ],
          take: 1,
        },
      },
    });
  }

  /**
   * Get new arrivals
   */
  static async getNewArrivals(limit: number = 8) {
    return await prisma.product.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          where: {
            variant_id: null,
          },
          orderBy: [
            { is_primary: "desc" },
            { sort_order: "asc" },
          ],
          take: 1,
        },
      },
    });
  }

  /**
   * Get related products
   */
  static async getRelatedProducts(productId: string, limit: number = 4) {
    // Get the product's categories
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        categories: {
          select: {
            category_id: true,
          },
        },
      },
    });

    if (!product) {
      return [];
    }

    // Get category IDs
    const categoryIds = product.categories.map((pc) => pc.category_id);

    // Find products in the same categories
    return await prisma.product.findMany({
      where: {
        id: { not: productId },
        is_active: true,
        categories: {
          some: {
            category_id: {
              in: categoryIds,
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          where: {
            variant_id: null,
          },
          orderBy: [
            { is_primary: "desc" },
            { sort_order: "asc" },
          ],
          take: 1,
        },
      },
    });
  }

  /**
   * Get all categories
   */
  static async getCategories() {
    return await prisma.category.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        sort_order: "asc",
      },
    });
  }

  /**
   * Get category by slug
   */
  static async getCategoryBySlug(slug: string) {
    return await prisma.category.findUnique({
      where: {
        slug,
        is_active: true,
      },
    });
  }

  /**
   * Get all brands
   */
  static async getBrands() {
    return await prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}
