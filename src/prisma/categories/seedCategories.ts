import { prisma } from "../db";
import { categories } from "./data";

export async function seedCategories() {
  try {
    console.log('Seeding categories...')
    // Check if any categories exist in the database
    const existingCategories = await prisma.category.findMany();

    if (existingCategories.length === 0) {

      // Insert categories into the database
      await prisma.category.createMany({
        data: categories,
      });

      console.log('Categories imported successfully.');
    } else {
      console.log('Categories already exist, skipping import.');
    }
  } catch (error) {
    console.error('Error importing categories:', error);
  }
}