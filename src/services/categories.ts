import { prisma } from "@/prisma/db";
import { Category } from "@prisma/client";

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      cacheStrategy: {
        ttl: 43200, // 12 hours
        swr: 300, // 5 minutes
      } as never,
      orderBy: { type: "asc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};