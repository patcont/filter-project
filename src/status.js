// Visual state for a filter, from the numbers the API computes.
export function filterStatus({ days_left: left, lifespan_days: total }) {
  const pct = Math.max(0, Math.min(100, Math.round((left / total) * 100)))
  if (left <= 0) return { level: 'expired', pct: 0, label: 'Cambiar ahora' }
  if (pct <= 15) return { level: 'soon', pct, label: left === 1 ? 'Queda 1 día' : `Quedan ${left} días` }
  return { level: 'ok', pct, label: `Quedan ${left} días` }
}

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
