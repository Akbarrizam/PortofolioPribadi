import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-cv-pdf',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/CV') {
            res.setHeader('Content-Type', 'application/pdf');
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5177,
    strictPort: true,
  },
});
