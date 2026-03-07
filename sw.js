const CACHE_NAME = 'fund-pwa-v2';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // 对于 API 请求直接放行，静态资源优先使用缓存
  if (event.request.url.includes('eastmoney.com') || event.request.url.includes('baidu.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
