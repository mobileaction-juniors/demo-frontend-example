import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'esnext',
        outDir: 'dist',
        assetsDir: '',
        assetsInlineLimit: 0,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
});