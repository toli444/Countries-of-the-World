import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Countries-of-the-World',
    plugins: [react(), viteTsconfigPaths()],
    server: {
        port: 7000
    }
});
