import { useState, useCallback } from 'react'
import { askQuestion } from '../services/api'

/**
 * Hook that manages agent ask state.
 * Returns { data, loading, error, ask, reset }
 */
export function useAsk() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const ask = useCallback(async (question) => {
    if (!question?.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const result = await askQuestion(question)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { data, loading, error, ask, reset }
}
