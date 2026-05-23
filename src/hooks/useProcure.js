import { useState, useCallback } from 'react'
import { procureCompounds } from '../services/api'

export function useProcure() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const procure = useCallback(async (items) => {
    // items can be array of strings or {name, quantity}
    const normalized = (items || []).map(it => {
      if (typeof it === 'string') return { name: it.trim(), quantity: 1 }
      return { name: (it.name || '').trim(), quantity: Math.max(1, it.quantity || 1) }
    }).filter(it => it.name)

    if (normalized.length === 0) {
      setError('Provide at least one compound.')
      return
    }
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await procureCompounds(normalized)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => { setData(null); setError(null) }, [])
  return { data, loading, error, procure, reset }
}
