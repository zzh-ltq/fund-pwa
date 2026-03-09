// 这是用来“杀死”旧版错误缓存的强制卸载脚本
self.addEventListener('install', function(e) {
  self.skipWaiting(); // 强制立即接管当前页面
});

self.addEventListener('activate', function(e) {
  // 1. 强制注销自己
  self.registration.unregister();
  
  // 2. 清除所有旧缓存的壳
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });

  // 3. 强制刷新用户的页面，让他们看到最新的 index.html
  clients.claim().then(() => {
    clients.matchAll().then(clients => {
      clients.forEach(client => client.navigate(client.url));
    });
  });
});
