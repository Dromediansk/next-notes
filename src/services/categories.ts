import { prisma } from "@/prisma/db";
import { Category } from "@prisma/client";

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      cacheStrategy: {
        ttl: 30,
        swr: 60,
      },
      orderBy: { type: "asc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};