import { useState, useCallback } from 'react'
import { compareCompounds } from '../services/api'

export function useCompare() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const compare = useCallback(async (compounds) => {
    const cleaned = (compounds || []).map(s => s.trim()).filter(Boolean)
    if (cleaned.length < 2) {
      setError('Provide at least 2 compounds (comma-separated).')
      return
    }
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await compareCompounds(cleaned)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => { setData(null); setError(null) }, [])
  return { data, loading, error, compare, reset }
}
