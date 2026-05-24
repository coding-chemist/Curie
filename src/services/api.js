/**
 * Curie API client — NMR structure elucidation.
 * Base URL switches automatically: .env.local in dev, VITE_API_URL in prod.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Run NMR structure elucidation on a peak list.
 * @param {object} payload - { peaks_1h: [{shift, multiplicity, integration}], peaks_13c: [...], hint?: {formula, mass} }
 * @returns {Promise<ElucidationResponse>}
 *
 * NOTE: endpoint not yet implemented — Day 4 of the build plan.
 */
export async function elucidate(payload) {
  const res = await fetch(`${BASE_URL}/api/v1/elucidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || 'Elucidation service unavailable.')
  }
  return res.json()
}
