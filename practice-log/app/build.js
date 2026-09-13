// Retirement safeguard: never rebuild an active app over the closed routes.
// Historical client source remains available for recovery, not publication.
import { readFileSync } from 'node:fs';
for (const route of ['../../log/index.html', '../../log/host/index.html']) {
  const html = readFileSync(new URL(route, import.meta.url), 'utf8');
  if (!html.includes('This chapter has closed.') || !html.includes('noindex,follow') || html.includes('workers.dev')) {
    throw new Error('Practice Log retirement page is missing or contains an active client.');
  }
}
console.log('Practice Log is retired; no client was rebuilt.');
