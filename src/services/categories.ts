import { prisma } from "@/prisma/db";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories: Category[] = await prisma.category.findMany({
      orderBy: { type: "asc" },
    });
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};