import { prisma } from "./db";
import { seedCategories } from "./categories/seedCategories";

async function seed() {
  try {
    await seedCategories()
    await prisma.$disconnect();
  } catch (error) {
    console.log('Error while seeding db: ', error)
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed()
