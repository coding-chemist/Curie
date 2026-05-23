import { useState, useCallback } from 'react'
import { lookupMolecule } from '../services/api'

/**
 * Hook that manages molecule search state.
 * Returns { data, loading, error, search }
 */
export function useMolecule() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const search = useCallback(async (query) => {
    if (!query?.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const result = await lookupMolecule(query)
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

  return { data, loading, error, search, reset }
}
