// Service Worker — mantém o app funcionando offline, sem NUNCA servir uma versão velha.
// Regra de ouro: arquivos do aplicativo (HTML, JS, CSS) vêm sempre da internet primeiro.
const CACHE_NAME = 'forja-consciencia-v2';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Apaga caches antigos (neles ficava guardado o HTML de versões anteriores)
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));

      // Assume o controle das telas já abertas
      await self.clients.claim();

      // Recarrega as telas abertas para que elas já peguem a versão nova
      const clientList = await self.clients.matchAll({ type: 'window' });
      clientList.forEach((client) => {
        if (client.navigate) {
          client.navigate(client.url).catch(() => {});
        }
      });
    })()
  );
});

const isAppFile = (request, url) =>
  request.mode === 'navigate' ||
  url.pathname === '/' ||
  /\.(html|js|css)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Chamadas da API e outros sites: passam direto, sem cache
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  // Arquivos do aplicativo: internet primeiro, cache só quando estiver sem conexão
  if (isAppFile(request, url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Demais arquivos (ícones, imagens): cache primeiro, para abrir rápido e funcionar offline
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
          return response;
        })
        .catch(() => cached);
    })
  );
});
