import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // Matches the Vite server started by the test:e2e scripts.
        baseUrl: 'http://127.0.0.1:4173',
        supportFile: false,
    },
});
