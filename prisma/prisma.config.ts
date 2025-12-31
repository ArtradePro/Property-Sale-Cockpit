let defineConfig: any;
try {
  // Dynamically import to avoid type error if not present at build time
  defineConfig = require('@prisma/internals').defineConfig;
} catch (e) {
  defineConfig = (c: any) => c;
}

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
});
