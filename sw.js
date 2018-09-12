console.log('SW check');

const myCacheName = 'version1';
const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/data/restaurants.json',
  '/img/*'
];
//Install ServiceWorker
self.addEventListener('install', function(event) {
 
  event.waitUntil(
    caches.open(myCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//Perform fetching

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            const responseToCache = response.clone();
            caches.open(myCacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});