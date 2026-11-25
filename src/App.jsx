import { useCallback, useEffect, useState } from 'react'
import { getFilters, restartFilter } from './api'
import FilterCard from './FilterCard'

export default function App() {
  const [filters, setFilters] = useState(null)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setError(null)
    getFilters().then(setFilters).catch((e) => setError(e.message))
  }, [])

  useEffect(load, [load])

  const restart = async (id) => {
    const updated = await restartFilter(id)
    setFilters((list) => list.map((f) => (f.filter_id === id ? updated : f)))
  }

  const due = filters?.filter((f) => f.expired).length ?? 0

  return (
    <main>
      <header className="hero">
        <span className="drop" aria-hidden="true">💧</span>
        <h1>Mis filtros de agua</h1>
        {filters && (
          <p>
            {due === 0
              ? 'Todo en orden: ningún filtro necesita recambio.'
              : `${due} ${due === 1 ? 'filtro necesita' : 'filtros necesitan'} recambio.`}
          </p>
        )}
      </header>

      {error && (
        <div className="error">
          <p>No se pudo conectar con la API ({error}).</p>
          <p>¿Está corriendo <code>filter-project-backend</code>?</p>
          <button onClick={load}>Reintentar</button>
        </div>
      )}
      {!filters && !error && <p className="loading">Cargando filtros…</p>}

      {filters && (
        <section className="grid">
          {filters.map((f) => (
            <FilterCard key={f.filter_id} filter={f} onRestart={restart} />
          ))}
        </section>
      )}
    </main>
  )
}
