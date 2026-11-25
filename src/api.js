const API = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/$/, '')

async function request(path, init) {
  const res = await fetch(API + path, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? `Error ${res.status}`)
  return data
}

export const getFilters = () => request('/filters').then((d) => d.filters)

export const restartFilter = (id) =>
  request(`/filters/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ restart: true }),
  }).then((d) => d.filter)
