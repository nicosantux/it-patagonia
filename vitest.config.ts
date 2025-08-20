import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['./src/**/*.test.{ts,tsx}'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
