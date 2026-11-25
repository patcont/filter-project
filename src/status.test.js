import { describe, it, expect } from 'vitest'
import { filterStatus } from './status'

describe('filterStatus', () => {
  it('classifies ok, soon and expired', () => {
    expect(filterStatus({ days_left: 120, lifespan_days: 180 }).level).toBe('ok')
    expect(filterStatus({ days_left: 10, lifespan_days: 180 }).level).toBe('soon')
    expect(filterStatus({ days_left: 0, lifespan_days: 180 })).toMatchObject({ level: 'expired', pct: 0 })
  })
})
