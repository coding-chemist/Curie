import { useState } from 'react'
import './index.css'
import { useElucidate } from './hooks/useElucidate'
import PeakInputForm from './components/PeakInputForm'
import CandidateCard from './components/CandidateCard'
import SpectrumCompareView from './components/SpectrumCompareView'

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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[320px] text-center px-8">
      <div className="w-14 h-14 rounded-2xl bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.14)] flex items-center justify-center mb-4">
        <AtomIcon size={28} />
      </div>
      <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] mb-1.5">
        Paste peaks, hit Elucidate
      </p>
      <p className="font-mono text-[0.68rem] text-[#6e6e73] leading-relaxed max-w-[260px]">
        Top-3 candidate structures with confidence scores appear here.
        Caffeine is pre-loaded — just press the button.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[320px] gap-3">
      <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
      <p className="font-mono text-[0.75rem] text-[#6e6e73]">Running pipeline…</p>
      <p className="font-mono text-[0.62rem] text-[#9ca3af]">FAISS → LLM → RDKit → prediction</p>
    </div>
  )
}

function ErrorBanner({ message, onReset }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <p className="font-mono text-[0.78rem] font-semibold text-red-700 mb-1">Elucidation failed</p>
      <p className="font-mono text-[0.68rem] text-red-500 mb-3 leading-relaxed">{message}</p>
      <button
        onClick={onReset}
        className="font-mono text-[0.65rem] text-[#7c3aed] hover:underline"
      >
        try again
      </button>
    </div>
  )
}

function ReasoningBox({ reasoning, tools, latency }) {
  return (
    <div className="rounded-xl border border-black/[0.07] bg-gray-50/80 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="font-mono text-[0.6rem] font-semibold text-[#6e6e73] uppercase tracking-wider">
          Reasoning
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[0.58rem] text-[#9ca3af]">{latency}ms</span>
          {tools.map(t => (
            <span
              key={t}
              className="font-mono text-[0.56rem] px-1.5 py-0.5 rounded-md bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.12)] text-[#7c3aed]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="font-mono text-[0.65rem] text-[#6e6e73] leading-relaxed">{reasoning}</p>
    </div>
  )
}

export default function App() {
  const { result, loading, error, run, reset } = useElucidate()
  const [submitted, setSubmitted] = useState({ p1h: [], p13c: [] })

  function handleSubmit(p1h, p13c) {
    setSubmitted({ p1h, p13c })
    run(p1h, p13c)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] relative overflow-x-hidden font-sans">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 900px 600px at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 60%)' }}
      />

      {/* Navbar */}
      <nav
        className="fixed inset-x-0 top-0 h-[52px] z-50 flex items-center justify-between px-6 border-b border-black/[0.07]"
        style={{ background: 'rgba(245,245,247,0.85)', backdropFilter: 'saturate(180%) blur(24px)' }}
      >
        <div className="flex items-center gap-2">
          <AtomIcon size={18} />
          <span className="font-mono text-[0.85rem] font-semibold tracking-tight">
            <span className="text-[#7c3aed]">Curie</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[0.62rem] font-medium uppercase tracking-wider text-[#7c3aed]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#7c3aed] animate-pulse" />
          NMR Structure Elucidation
        </div>
      </nav>

      <main className="relative z-10 max-w-[1080px] mx-auto px-5 pt-[76px] pb-24">
        {/* Hero */}
        <div className="mb-7 pt-5">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.14)]">
            <AtomIcon size={12} />
            <span className="font-mono text-[0.6rem] font-medium text-[#7c3aed] tracking-wider uppercase">
              RAG pipeline · RDKit reranker · forward prediction
            </span>
          </div>
          <h1 className="font-mono text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            NMR <span className="text-[#7c3aed]">→</span> Structure
          </h1>
          <p className="mt-1.5 text-[0.85rem] text-[#6e6e73] font-light max-w-[520px] leading-relaxed">
            Enter a peak list. The pipeline retrieves candidates from NMRShiftDB (10,340 compounds),
            interprets peaks with an LLM grounded in retrieved evidence, and ranks structures by prediction match.
          </p>
        </div>

        {/* Workspace — form + results */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 items-start">
          {/* Left: sticky form */}
          <div className="lg:sticky lg:top-[64px]">
            <PeakInputForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Right: results panel */}
          <div>
            {!result && !loading && !error && <EmptyState />}
            {loading && <LoadingState />}
            {error && <ErrorBanner message={error} onReset={reset} />}
            {result && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.top_candidates.map((c, i) => (
                    <CandidateCard key={i} candidate={c} rank={i} />
                  ))}
                </div>
                <ReasoningBox
                  reasoning={result.reasoning}
                  tools={result.tools_used}
                  latency={result.latency_ms}
                />
              </div>
            )}
          </div>
        </div>

        {/* Spectrum comparison — full width */}
        {result && result.top_candidates.length > 0 && (
          <div className="mt-5">
            <SpectrumCompareView
              candidate={result.top_candidates[0]}
              observed1h={submitted.p1h}
              observed13c={submitted.p13c}
            />
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-black/[0.07] flex items-center justify-between">
          <div>
            <p className="text-[0.82rem] font-medium text-[#1d1d1f]">Sindhuja Sivaraman</p>
            <p className="text-[0.72rem] text-[#6e6e73] mt-0.5">Senior Engineer · AI/ML</p>
          </div>
          <a
            href="https://coding-chemist.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.68rem] font-medium text-[#7c3aed] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.18)] px-3.5 py-1.5 rounded-[10px] hover:bg-[rgba(124,58,237,0.16)] transition-all duration-200"
          >
            coding-chemist ↗
          </a>
        </footer>
      </main>
    </div>
  )
}
