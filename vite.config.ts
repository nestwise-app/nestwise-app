import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                additionalData: `@use "${path.join(process.cwd(), 'src/shared/ui/styles/_mantine.scss').replace(/\\/g, '/')}" as mantine;`,
            },
        },
    },
    resolve: {
        alias: {
            '~': '/src',
        },
    },
});
