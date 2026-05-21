import { useState } from 'react'
import './index.css'

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

const mockResult = {
  query: 'What is the LD50 of caffeine?',
  molecule: { name: 'Caffeine', cid: 2519, formula: 'C₈H₁₀N₄O₂', mw: '194.19 g/mol', cas: '58-08-2' },
  answer: 'The LD50 of caffeine is 192 mg/kg (oral, rat).',
  source: 'PubChem CID 2519 · Acute Effects · accessed 2026-05-21',
  tags: ['stimulant', 'xanthine alkaloid', 'GHS H302'],
}

const pills = ['What is the LD50 of caffeine?', 'Show structure of aspirin', 'Is ethanol flammable?', 'CAS number of ibuprofen']

export default function App() {
  const [active, setActive] = useState(false)

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
            <AtomIcon size={14} />
            <span className="font-mono text-[0.68rem] font-medium text-[#7c3aed] tracking-wider uppercase">
              Chemistry Agent
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

        {/* Search bar mock */}
        <div className="animate-rise-2 mb-4">
          <div
            onClick={() => setActive(!active)}
            className="flex items-center gap-3 w-full rounded-2xl border px-5 py-4 cursor-pointer
              transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(40px)',
              border: active ? '1.5px solid rgba(124,58,237,0.5)' : '1.5px solid rgba(0,0,0,0.09)',
              boxShadow: active
                ? '0 0 0 4px rgba(124,58,237,0.08), 0 8px 24px rgba(0,0,0,0.06)'
                : '0 2px 12px rgba(0,0,0,0.05)',
            }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#6e6e73]">
              <circle cx="7" cy="7" r="5" stroke="#6e6e73" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="#6e6e73" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[0.88rem] text-[#9ca3af]">
              Ask anything about a molecule…
            </span>
            <span className="ml-auto font-mono text-[0.65rem] text-[#c4c4c4] border border-[#e5e5e5] rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 animate-rise-2">
          {pills.map(p => (
            <button key={p}
              className="font-mono text-[0.7rem] text-[#6e6e73] bg-white/70 border border-black/[0.07]
                px-3 py-1.5 rounded-full hover:border-[rgba(124,58,237,0.4)] hover:text-[#7c3aed]
                transition-all duration-150 cursor-pointer">
              {p}
            </button>
          ))}
        </div>

        {/* Mock result card */}
        <div className="animate-rise-3 rounded-2xl border border-white/90 overflow-hidden mb-4"
          style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'saturate(180%) blur(48px)',
            boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.07)',
          }}>

          {/* Query bar */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.06] bg-black/[0.015]">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[0.78rem] text-[#6e6e73]">{mockResult.query}</span>
          </div>

          <div className="p-6">
            {/* Two-column: molecule card + answer */}
            <div className="flex gap-5 mb-5">

              {/* Molecule card */}
              <div className="shrink-0 w-[160px] rounded-xl border border-[rgba(124,58,237,0.12)]
                bg-[rgba(124,58,237,0.04)] p-4">
                {/* Structure placeholder */}
                <div className="w-full h-[80px] rounded-lg bg-white/80 border border-[rgba(124,58,237,0.1)]
                  flex items-center justify-center mb-3">
                  <AtomIcon size={36} />
                </div>
                <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] mb-1">{mockResult.molecule.name}</p>
                <p className="font-mono text-[0.65rem] text-[#6e6e73]">{mockResult.molecule.formula}</p>
                <p className="font-mono text-[0.65rem] text-[#6e6e73]">MW {mockResult.molecule.mw}</p>
                <p className="font-mono text-[0.65rem] text-[#6e6e73]">CAS {mockResult.molecule.cas}</p>
              </div>

              {/* Answer */}
              <div className="flex-1">
                <p className="text-[0.92rem] font-medium text-[#1d1d1f] leading-relaxed mb-4">
                  {mockResult.answer}
                </p>

                {/* Citation */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(124,58,237,0.05)]
                  border border-[rgba(124,58,237,0.12)]">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                    <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z"
                      fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  <span className="font-mono text-[0.67rem] text-[#7c3aed] leading-snug">
                    {mockResult.source}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mockResult.tags.map(t => (
                <span key={t} className="font-mono text-[0.65rem] font-medium text-[#6e6e73]
                  bg-black/[0.04] border border-black/[0.07] px-2.5 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trust banner */}
        <div className="animate-rise-3 text-center py-4">
          <p className="font-mono text-[0.7rem] text-[#9ca3af] tracking-wider">
            EVERY ANSWER IS TRACEABLE TO A SOURCE · NO HALLUCINATIONS
          </p>
        </div>

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
