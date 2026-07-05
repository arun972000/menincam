/**
 * Emits dist/sitemap.xml after `vite build` (wired into the build script in
 * package.json). robots.txt already advertises /sitemap.xml — this makes it
 * real. Keep ROUTES in sync with src/App.jsx when pages are added.
 *
 * Set SITE_URL (env) or edit the fallback below when the real domain is live.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = (process.env.SITE_URL || 'https://menincam.example.com').replace(/\/$/, '');

const ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.7' },
  { path: '/services', priority: '0.9' },
  { path: '/packages', priority: '0.9' },
  { path: '/contact', priority: '0.8' },
  { path: '/faq', priority: '0.6' },
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'dist');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, 'sitemap.xml');
writeFileSync(outFile, xml);
console.log(`✓ sitemap.xml written (${ROUTES.length} routes) → ${outFile}`);
