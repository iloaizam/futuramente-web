import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localEvidenceRoot = path.resolve(__dirname, 'local-evidencias');

function localEvidenceVideosPlugin() {
  return {
    name: 'local-evidence-videos',
    configureServer(server) {
      server.middlewares.use('/local-evidencias', (req, res, next) => {
        const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
        const filePath = path.resolve(localEvidenceRoot, `.${requestPath}`);

        if (!filePath.startsWith(localEvidenceRoot)) {
          next();
          return;
        }

        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next();
          return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const mimeType =
          extension === '.mp4'
            ? 'video/mp4'
            : extension === '.mov'
              ? 'video/quicktime'
              : 'application/octet-stream';

        res.setHeader('Content-Type', mimeType);
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localEvidenceVideosPlugin()],
  base: '/',
});
