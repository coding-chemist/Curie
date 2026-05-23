/**
 * Curie API client
 * Base URL switches automatically: .env.local in dev, VITE_API_URL in prod
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Look up a molecule by name, synonym, or CAS number.
 * @param {string} query - e.g. "caffeine", "Tylenol", "58-08-2"
 * @returns {Promise<MoleculeResponse>}
 * @throws {Error} with a user-readable message
 */
export async function lookupMolecule(query) {
  const res = await fetch(`${BASE_URL}/api/v1/molecule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query.trim() }),
  })

  if (res.status === 404) {
    throw new Error(`No molecule found for "${query}". Try the IUPAC name or CAS number.`)
  }

  if (res.status === 429) {
    throw new Error('Too many requests — please wait a moment and try again.')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || 'Something went wrong. Please try again.')
  }

  return res.json()
}

/**
 * Send a natural-language chemistry question to the LangGraph agent.
 * @param {string} question - e.g. "What is the LD50 of caffeine?"
 * @returns {Promise<AskResponse>}
 * @throws {Error} with a user-readable message
 */
export async function askQuestion(question) {
  const res = await fetch(`${BASE_URL}/api/v1/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: question.trim() }),
  })

  if (res.status === 429) {
    throw new Error('Too many requests — please wait a moment and try again.')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || 'Agent temporarily unavailable. Please try again.')
  }

  return res.json()
}
