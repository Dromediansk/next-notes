import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const createStandardPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
};

// Singleton pattern for creating an accelerated PrismaClient instance.
const createAcceleratedPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate());
};

// Define a type for the accelerated client.
type PrismaClientAccelerated = ReturnType<typeof createAcceleratedPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  standardPrisma?: PrismaClient;
  acceleratedPrisma?: PrismaClientAccelerated;
};

const prisma = globalForPrisma.standardPrisma ?? createStandardPrismaClient();
const acceleratedPrisma =
  globalForPrisma.acceleratedPrisma ?? createAcceleratedPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.standardPrisma = prisma;
  globalForPrisma.acceleratedPrisma = acceleratedPrisma;
}

export { prisma, acceleratedPrisma };