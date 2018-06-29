/* global workbox */

workbox.routing.registerRoute(
  new RegExp('https://api.rolodromo.com/(.*)'),
  workbox.strategies.networkFirst({
    networkTimetoutSeconds: 2,
    cacheName: 'api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('https://(.*).googleusercontent.com/(.*).jpg(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^http://www.freesound.org/data/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'soundboard',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)
