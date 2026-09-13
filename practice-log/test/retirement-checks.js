import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
for (const path of ['log/index.html', 'log/host/index.html', 'practice-map/index.html']) {
  const html = read(path);
  assert(html.includes('This chapter has closed.'), path);
  assert(html.includes('noindex,follow'), path);
  assert(html.includes('no-referrer'), path);
  assert(!html.includes('workers.dev'), path);
  assert(!html.includes('fetch('), path);
}
for (const path of ['index.html', 'about/index.html', 'dana/index.html', 'work-with-john/index.html', 'beyond-belief/index.html']) {
  assert(!/href="[^"?]*(?:practice-map|log)\//.test(read(path)), path);
}
assert(!read('sitemap.xml').includes('https://spacetobe.xyz/practice-map/'));
assert(!read('beyond-belief/index.html').includes('The Practice Log'));
assert(read('beyond-belief/index.html').includes('Two things to support your practice.'));
assert(read('practice-log/wrangler.toml').includes('PRACTICE_LOG_RETIRED = "true"'));
console.log('Retirement pages, navigation, sitemap, course promises and local flag verified.');
