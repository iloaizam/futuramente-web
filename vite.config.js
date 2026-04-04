import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localEvidenceRoot = path.resolve(__dirname, 'local-evidencias');

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.mp4') return 'video/mp4';
  if (extension === '.mov') return 'video/quicktime';
  return 'application/octet-stream';
}

function resolveLocalEvidenceFile(requestUrl = '') {
  const [pathname] = requestUrl.split('?');
  const decoded = decodeURIComponent(pathname || '/');
  const normalizedPath = decoded.replace(/^\/local-evidencias/, '');
  const filePath = path.resolve(localEvidenceRoot, `.${normalizedPath}`);

  if (!filePath.startsWith(localEvidenceRoot)) return null;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return null;

  return filePath;
}

function streamLocalEvidenceVideo(req, res, next) {
  const filePath = resolveLocalEvidenceFile(req.url || '/');
  if (!filePath) {
    next();
    return;
  }

  const stat = fs.statSync(filePath);
  const total = stat.size;
  const mimeType = getMimeType(filePath);
  const range = req.headers.range;

  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Type', mimeType);

  if (!range) {
    res.statusCode = 200;
    res.setHeader('Content-Length', total);

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);
  if (!match) {
    res.statusCode = 416;
    res.setHeader('Content-Range', `bytes */${total}`);
    res.end();
    return;
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Number(match[2]) : total - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= total) {
    res.statusCode = 416;
    res.setHeader('Content-Range', `bytes */${total}`);
    res.end();
    return;
  }

  res.statusCode = 206;
  res.setHeader('Content-Length', end - start + 1);
  res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  fs.createReadStream(filePath, { start, end }).pipe(res);
}

function localEvidenceVideosPlugin() {
  return {
    name: 'local-evidence-videos',
    configureServer(server) {
      server.middlewares.use('/local-evidencias', streamLocalEvidenceVideo);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/local-evidencias', streamLocalEvidenceVideo);
    },
  };
}

export default defineConfig({
  plugins: [react(), localEvidenceVideosPlugin()],
  base: '/',
});
