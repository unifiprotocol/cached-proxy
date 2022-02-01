const ONE_HOUR_SECONDS = 86400

export async function handleRequest(event: FetchEvent): Promise<Response> {
  const request = event.request
  const cacheUrl = new URL(request.url)
  const targetUrl = decodeURIComponent(cacheUrl.search.replace(/^(\?)/, ''))
  let response = await fetch(targetUrl, {
    headers: { ...request.headers },
    cf: {
      cacheTtl: ONE_HOUR_SECONDS,
      cacheEverything: true,
    },
  })
  response = new Response(response.body, response)
  response.headers.set('Cache-Control', `max-age=${ONE_HOUR_SECONDS}`)
  return response
}
