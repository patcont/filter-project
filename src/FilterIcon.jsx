// Simple cartridge illustration; the band color identifies each stage.
const STAGE_COLORS = {
  Sedimentos: '#f2c14e',
  Carbón: '#3d3d3d',
  'Post filtro': '#5c7c8a',
  Membrana: '#4fa3d9',
}

export default function FilterIcon({ stage }) {
  const band = STAGE_COLORS[stage] ?? '#8aa'
  return (
    <svg viewBox="0 0 64 96" width="48" height="72" aria-hidden="true">
      <rect x="14" y="4" width="36" height="10" rx="3" fill="#cfd8dc" />
      <rect x="10" y="12" width="44" height="72" rx="10" fill="#eef4f7" stroke="#b0c4ce" strokeWidth="2" />
      <rect x="10" y="34" width="44" height="28" fill={band} opacity="0.9" />
      <rect x="22" y="84" width="20" height="8" rx="2" fill="#cfd8dc" />
    </svg>
  )
}
