import {defineConfig, UserConfigExport} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        "import.meta.vitest": "undefined"
    },
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        testMatch: ['./tests/**/*.test.tsx'],
        globals: true
    }
} as UserConfigExport)
