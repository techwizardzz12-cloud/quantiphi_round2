export function notFound(request, response) {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.path}` })
}

export function errorHandler(error, _request, response, _next) {
  console.error(error)
  response.status(error.status || 500).json({ message: error.message || 'Unexpected server error' })
}
