import { PrismaClient } from '@prisma/client'

/**
 * Singleton pattern for Prisma Client
 * This ensures we only create one instance of PrismaClient in development
 * and reuse it across hot reloads to prevent connection exhaustion
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
