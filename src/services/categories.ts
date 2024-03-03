import { acceleratedPrisma } from "@/prisma/db";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories: Category[] = await acceleratedPrisma.category.findMany({
      orderBy: { type: "asc" },
      cacheStrategy: { ttl: 86400 } // 1 day
    });
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};