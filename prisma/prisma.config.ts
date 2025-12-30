import { defineConfig } from '@prisma/cli';

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || "postgresql://USER:PASSWORD@localhost:5432/property_cockpit",
  },
});
