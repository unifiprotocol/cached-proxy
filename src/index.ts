import { handleRequest } from './handler'

addEventListener('fetch', (event) => {
  try {
    return event.respondWith(handleRequest(event))
  } catch (e: any) {
    return event.respondWith(new Response('Error thrown ' + e.message))
  }
})
