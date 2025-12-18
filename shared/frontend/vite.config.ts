import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: './', // Use relative paths for assets
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api/elasticsearch': {
          target: env.VITE_ELASTICSEARCH_URL || 'http://localhost:9200',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/elasticsearch/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Add the API key header if configured
              const apiKey = env.VITE_ELASTICSEARCH_APIKEY;
              if (apiKey) {
                proxyReq.setHeader('Authorization', `ApiKey ${apiKey}`);
              }
            });
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});

