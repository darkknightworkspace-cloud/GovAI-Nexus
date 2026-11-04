import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import http from 'http';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

/**
 * Ensures the app is accessible on port 4000 (custom non-3000 / non-5000 port)
 * while maintaining compatibility with cloud preview proxies.
 */
function dualPortListenerPlugin(targetSecondaryPort = 4000): Plugin {
  return {
    name: 'govai-dual-port-listener',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();
        const activePort = typeof address === 'object' && address ? address.port : 4000;
        const mirrorPort = activePort === targetSecondaryPort ? 3000 : targetSecondaryPort;

        const mirrorServer = http.createServer((req, res) => {
          const proxyReq = http.request(
            {
              hostname: '127.0.0.1',
              port: activePort,
              path: req.url,
              method: req.method,
              headers: req.headers,
            },
            (proxyRes) => {
              res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
              proxyRes.pipe(res, {end: true});
            }
          );
          proxyReq.on('error', () => {
            res.statusCode = 502;
            res.end();
          });
          req.pipe(proxyReq, {end: true});
        });

        mirrorServer.on('error', () => {
          // Ignore if mirror port is already occupied
        });

        mirrorServer.listen(mirrorPort, '0.0.0.0');
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), dualPortListenerPlugin(4000)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 4000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 4000,
      host: '0.0.0.0',
    },
  };
});
