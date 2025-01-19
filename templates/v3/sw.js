console.log('Service Worker');
const CACHE_NAME = 'v1_pwa_app_cache';
const urlsToCache = [
  './',
  'index.html',
  'styles.css',
  'script_pwa.js',
  'logo.png',
  'images/.*',

];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => {
            self.skipWaiting();
          })
          .catch(console.log);
      })
  );
});

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res;
        }
        return fetch(e.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                  client.postMessage('Falló algo al solicitar recursos: ' + e.request.url);
                });
              });
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(e.request, responseToCache);
              });
            return response;
          });
      })
      .catch(err => {
        console.log('Falló algo al solicitar recursos:', err);
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage('Falló algo al solicitar recursos');
          });
        });
      })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'Falló algo al solicitar recursos') {
    // Mostrar ventana o notificación de error al usuario
    // ... tu código aquí ...
  }
});