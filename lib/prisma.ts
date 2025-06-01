import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// This is important - prevents Prisma from being bundled with client code
declare global {
  var prisma: PrismaClient | undefined;
}

// Ensure PrismaClient is only instantiated on the server side
let prisma: PrismaClient;

if (typeof window === 'undefined') {
  // Server-side only
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    // In development, use a global variable to preserve connection between hot reloads
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        log: ['query', 'error', 'warn'],
      });
    }
    prisma = global.prisma;
  }
}

export { prisma };
