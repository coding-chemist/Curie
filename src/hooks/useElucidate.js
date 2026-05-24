import { useState, useCallback } from 'react'
import { elucidate } from '../services/api'

export function useElucidate() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(async (peaks1h, peaks13c) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await elucidate({ peaks_1h: peaks1h, peaks_13c: peaks13c })
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, run, reset }
}
