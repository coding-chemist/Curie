import { useState, useCallback } from 'react'
import { getSafetyBriefing } from '../services/api'

/**
 * Hook for the Safety mode — pre-experiment hazard briefing.
 * Returns { data, loading, error, brief, reset }
 */
export function useSafety() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const brief = useCallback(async (compound) => {
    if (!compound?.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const result = await getSafetyBriefing(compound)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => { setData(null); setError(null) }, [])

  return { data, loading, error, brief, reset }
}
