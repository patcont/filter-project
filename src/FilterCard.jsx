import { useRef, useState } from 'react'
import FilterIcon from './FilterIcon'
import { filterStatus, formatDate } from './status'

export default function FilterCard({ filter, onRestart }) {
  const dialog = useRef(null)
  const [busy, setBusy] = useState(false)
  const status = filterStatus(filter)
  const search = `https://www.google.com/search?q=${encodeURIComponent(filter.filter_name)}`

  const confirm = async () => {
    setBusy(true)
    try {
      await onRestart(filter.filter_id)
      dialog.current?.close()
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className={`card ${status.level}`}>
      <header>
        <FilterIcon stage={filter.stage} />
        <div>
          <span className="stage">{filter.stage}</span>
          <h2>{filter.filter_name}</h2>
        </div>
      </header>

      <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={status.pct}>
        <span style={{ width: `${status.pct}%` }} />
      </div>
      <p className="label">{status.label}</p>
      <dl>
        <div><dt>Instalado</dt><dd>{formatDate(filter.cycle_start_date)}</dd></div>
        <div><dt>Cambio</dt><dd>{formatDate(filter.due_date)}</dd></div>
        <div><dt>Vida útil</dt><dd>{filter.lifespan_days} días</dd></div>
      </dl>

      <div className="actions">
        <button className="primary" onClick={() => dialog.current?.showModal()}>
          Ya lo cambié
        </button>
        <a href={search} target="_blank" rel="noreferrer">Buscar repuesto ↗</a>
      </div>

      <dialog ref={dialog}>
        <h3>¿Comenzar un nuevo ciclo?</h3>
        <p>Se registrará hoy como fecha de instalación de <strong>{filter.filter_name}</strong>.</p>
        <div className="actions">
          <button onClick={() => dialog.current?.close()} disabled={busy}>Cancelar</button>
          <button className="primary" onClick={confirm} disabled={busy}>
            {busy ? 'Guardando…' : 'Sí, nuevo ciclo'}
          </button>
        </div>
      </dialog>
    </article>
  )
}
