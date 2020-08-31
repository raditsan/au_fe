import a from 'axios'

export const base_url = 'http://localhost:5000'

export function get_request(resourceHttpRequest) {
  const { url, config } = resourceHttpRequest
  return a.get(url, config)
}

export function post_request(resourceHttpRequest) {
  const { url, config, data } = resourceHttpRequest
  return a.post(url, data, config)
}

export function put_request(resourceHttpRequest) {
  const { url, config, data } = resourceHttpRequest
  return a.put(url, data, config)
}

export function delete_request(resourceHttpRequest) {
  const { url, config } = resourceHttpRequest
  return a.delete(url, config)
}
