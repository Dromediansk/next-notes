import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

let prismaClient: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;
  }

  return prismaClient;
}

export const prisma = getPrismaClient()