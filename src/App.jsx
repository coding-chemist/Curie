import { useState } from 'react'
import './index.css'
import { useMolecule } from './hooks/useMolecule'

// ── Icons ─────────────────────────────────────────────────────────────────────

const AtomIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="2.3" fill="#7c3aed" />
    <ellipse cx="11" cy="11" rx="9" ry="3.3" stroke="#7c3aed" strokeWidth="1.25" fill="none" />
    <ellipse cx="11" cy="11" rx="9" ry="3.3" stroke="#7c3aed" strokeWidth="1.25" fill="none" transform="rotate(60 11 11)" />
    <ellipse cx="11" cy="11" rx="9" ry="3.3" stroke="#7c3aed" strokeWidth="1.25" fill="none" transform="rotate(120 11 11)" />
    <circle cx="11"   cy="1.85" r="1.45" fill="#7c3aed" />
    <circle cx="18.9" cy="15.6" r="1.45" fill="#7c3aed" />
    <circle cx="3.1"  cy="15.6" r="1.45" fill="#7c3aed" />
  </svg>
)

const BulbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 1.64.88 3.08 2.2 3.87L6 11h4l.3-1.13C11.62 9.08 12.5 7.64 12.5 6c0-2.49-2.01-4.5-4.5-4.5z"
      fill="rgba(124,58,237,0.13)" stroke="#7c3aed" strokeWidth="1.15" strokeLinejoin="round" />
    <line x1="6" y1="11.75" x2="10" y2="11.75" stroke="#7c3aed" strokeWidth="1.15" strokeLinecap="round" />
    <line x1="6.5" y1="13.2"  x2="9.5"  y2="13.2"  stroke="#7c3aed" strokeWidth="1.15" strokeLinecap="round" />
    <path d="M8.4 4.2L7 6.6h1.8L7.4 9" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
    <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z"
      fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

// ── Spinner ───────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="rgba(124,58,237,0.2)" strokeWidth="2" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ── Suggestion pills ──────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'What is the LD50 of caffeine?',
  'Show structure of aspirin',
  'Is ethanol flammable?',
  'CAS number of ibuprofen',
]

// ── Result card ───────────────────────────────────────────────────────────────

function MoleculeCard({ data }) {
  return (
    <div className="rounded-2xl border border-white/90 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'saturate(180%) blur(48px)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.07)',
      }}>

      {/* Query bar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.06] bg-black/[0.015]">
        <SearchIcon size={13} />
        <span className="font-mono text-[0.78rem] text-[#6e6e73]">{data.name}</span>
        <span className="ml-auto font-mono text-[0.65rem] text-[#9ca3af]">PubChem CID {data.cid}</span>
      </div>

      <div className="p-6">
        <div className="flex gap-5 mb-5">

          {/* Molecule info panel */}
          <div className="shrink-0 w-[160px] rounded-xl border border-[rgba(124,58,237,0.12)]
            bg-[rgba(124,58,237,0.04)] p-4">
            <div className="w-full h-[80px] rounded-lg bg-white/80 border border-[rgba(124,58,237,0.1)]
              flex items-center justify-center mb-3">
              <AtomIcon size={36} />
            </div>
            <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] mb-2 truncate" title={data.name}>
              {data.name}
            </p>
            {data.formula && (
              <p className="font-mono text-[0.65rem] text-[#6e6e73]">{data.formula}</p>
            )}
            {data.molecular_weight && (
              <p className="font-mono text-[0.65rem] text-[#6e6e73]">MW {data.molecular_weight}</p>
            )}
            {data.cas && (
              <p className="font-mono text-[0.65rem] text-[#6e6e73]">CAS {data.cas}</p>
            )}
          </div>

          {/* Answer panel */}
          <div className="flex-1 min-w-0">

            {/* IUPAC name */}
            {data.iupac_name && (
              <div className="mb-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">
                  IUPAC Name
                </p>
                <p className="text-[0.88rem] font-medium text-[#1d1d1f] leading-snug">
                  {data.iupac_name}
                </p>
              </div>
            )}

            {/* SMILES */}
            {data.smiles && (
              <div className="mb-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">
                  SMILES
                </p>
                <p className="font-mono text-[0.75rem] text-[#374151] break-all leading-relaxed
                  bg-black/[0.03] rounded-lg px-3 py-2 border border-black/[0.06]">
                  {data.smiles}
                </p>
              </div>
            )}

            {/* Citation */}
            <a
              href={data.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(124,58,237,0.05)]
                border border-[rgba(124,58,237,0.12)] hover:bg-[rgba(124,58,237,0.09)]
                transition-colors duration-150 group">
              <StarIcon />
              <span className="font-mono text-[0.67rem] text-[#7c3aed] leading-snug group-hover:underline">
                PubChem · CID {data.source.cid} · accessed {data.source.accessed}
              </span>
            </a>
          </div>
        </div>

        {/* Synonyms */}
        {data.synonyms?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06]">
            <span className="font-mono text-[0.65rem] text-[#9ca3af] self-center mr-1">
              Also known as:
            </span>
            {data.synonyms.slice(0, 4).map(s => (
              <span key={s} className="font-mono text-[0.65rem] text-[#6e6e73]
                bg-black/[0.04] border border-black/[0.07] px-2.5 py-1 rounded-md">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery]   = useState('')
  const { data, loading, error, search } = useMolecule()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) search(query)
  }

  const handleSuggestion = (text) => {
    setQuery(text)
    search(text)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] relative overflow-hidden font-sans">

      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse 900px 600px at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(ellipse 600px 500px at 80% 90%, rgba(124,58,237,0.04) 0%, transparent 60%)'
      }} />

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 h-[52px] z-50 flex items-center justify-between px-6 border-b border-black/[0.07]"
        style={{ background: 'rgba(245,245,247,0.85)', backdropFilter: 'saturate(180%) blur(24px)' }}>
        <div className="flex items-center gap-2">
          <AtomIcon size={18} />
          <span className="font-mono text-[0.85rem] font-semibold tracking-tight text-[#1d1d1f]">
            <span className="text-[#7c3aed]">Curie</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-wider text-amber-700">
          <span className="w-[5px] h-[5px] rounded-full bg-amber-400 blink" />
          Building
        </div>
      </nav>

      <main className="relative z-10 max-w-[760px] mx-auto px-6 pt-[110px] pb-24">

        {/* Hero */}
        <div className="text-center mb-12 animate-rise-1">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full
            bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.18)]">
            <BulbIcon />
            <span className="font-mono text-[0.68rem] font-medium text-[#7c3aed] tracking-wider uppercase">
              <span className="font-bold">E</span>ngineered <span className="font-bold">C</span>uriosity
            </span>
          </div>

          <h1 className="font-mono text-[clamp(2.8rem,6vw,4.2rem)] font-semibold tracking-[-0.045em] leading-none text-[#1d1d1f] mb-5">
            Ask. Verify. <span className="text-[#7c3aed]">Trust.</span>
          </h1>

          <p className="text-[1rem] font-light text-[#6e6e73] max-w-[520px] mx-auto leading-relaxed">
            Every answer is grounded in live <strong className="font-medium text-[#1d1d1f]">PubChem data</strong> with a clickable source.
            No hallucinations. No guessing.
          </p>
        </div>

        {/* Search bar */}
        <div className="animate-rise-2 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 w-full rounded-2xl px-5 py-4
              transition-all duration-200 border"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(40px)',
                border: query ? '1.5px solid rgba(124,58,237,0.5)' : '1.5px solid rgba(0,0,0,0.09)',
                boxShadow: query
                  ? '0 0 0 4px rgba(124,58,237,0.08), 0 8px 24px rgba(0,0,0,0.06)'
                  : '0 2px 12px rgba(0,0,0,0.05)',
              }}>

              <span className="text-[#9ca3af] shrink-0">
                {loading ? <Spinner /> : <SearchIcon />}
              </span>

              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask anything about a molecule…"
                className="flex-1 bg-transparent outline-none font-mono text-[0.88rem]
                  text-[#1d1d1f] placeholder:text-[#9ca3af]"
                autoFocus
                disabled={loading}
              />

              {query && !loading && (
                <button type="submit"
                  className="font-mono text-[0.7rem] font-medium text-[#7c3aed]
                    bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)]
                    px-3 py-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.15)] transition-colors">
                  Search
                </button>
              )}

              {!query && (
                <span className="ml-auto font-mono text-[0.65rem] text-[#c4c4c4] border border-[#e5e5e5] rounded px-1.5 py-0.5 shrink-0">
                  Enter ↵
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Suggestion pills */}
        {!data && !loading && (
          <div className="flex flex-wrap gap-2 justify-center mb-12 animate-rise-2">
            {SUGGESTIONS.map(p => (
              <button key={p} onClick={() => handleSuggestion(p)}
                className="font-mono text-[0.7rem] text-[#6e6e73] bg-white/70 border border-black/[0.07]
                  px-3 py-1.5 rounded-full hover:border-[rgba(124,58,237,0.4)] hover:text-[#7c3aed]
                  transition-all duration-150 cursor-pointer">
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 animate-rise-2">
            <Spinner />
            <p className="font-mono text-[0.78rem] text-[#9ca3af]">
              Querying PubChem…
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50/80 px-6 py-5 mb-4 animate-rise-2">
            <p className="font-mono text-[0.82rem] text-red-600">{error}</p>
          </div>
        )}

        {/* Live result card */}
        {data && !loading && (
          <div className="animate-rise-2 mb-4">
            <MoleculeCard data={data} />
          </div>
        )}

        {/* Trust banner */}
        {!loading && (
          <div className="text-center py-4">
            <p className="font-mono text-[0.7rem] text-[#9ca3af] tracking-wider">
              EVERY ANSWER IS TRACEABLE TO A SOURCE · NO HALLUCINATIONS
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 pt-8 border-t border-black/[0.07] flex items-center justify-between animate-rise-4">
          <div>
            <p className="text-[0.85rem] font-medium text-[#1d1d1f]">Sindhuja Sivaraman</p>
            <p className="text-[0.75rem] text-[#6e6e73] mt-0.5">Senior Engineer · AI/ML</p>
          </div>
          <a href="https://coding-chemist.vercel.app" target="_blank"
            className="font-mono text-[0.72rem] font-medium text-[#7c3aed]
              bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.18)]
              px-4 py-2 rounded-[10px] hover:bg-[rgba(124,58,237,0.16)]
              hover:border-[rgba(124,58,237,0.4)] transition-all duration-200">
            coding-chemist ↗
          </a>
        </footer>

      </main>
    </div>
  )
}
