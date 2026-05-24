import { useState } from 'react'
import SmilesStructure from './SmilesStructure'

const RANK_STYLES = [
  { badge: 'bg-amber-100 text-amber-800 border-amber-200', ring: 'ring-1 ring-amber-200/60' },
  { badge: 'bg-gray-100 text-gray-500 border-gray-200',    ring: 'ring-1 ring-gray-100' },
  { badge: 'bg-sky-50 text-sky-700 border-sky-200',        ring: 'ring-1 ring-sky-100' },
]
const RANK_LABELS = ['#1', '#2', '#3']

function Bar({ label, value }) {
  const pct   = Math.round(value * 100)
  const color = value >= 0.8 ? '#22c55e' : value >= 0.5 ? '#f59e0b' : '#ef4444'
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">{label}</span>
        <span className="font-mono text-[0.7rem] font-semibold text-[#1d1d1f]">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function CandidateCard({ candidate, rank }) {
  const [expanded, setExpanded] = useState(rank === 0)
  const { smiles, molecular_formula, molecular_weight, confidence, similarity_score, rationale } = candidate
  const rs = RANK_STYLES[rank] ?? RANK_STYLES[2]

  return (
    <div className={`rounded-2xl border border-black/[0.08] bg-white/90 p-4 flex flex-col gap-3 ${rs.ring}`}>
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[0.62rem] font-bold px-2 py-0.5 rounded-full border ${rs.badge}`}>
          {RANK_LABELS[rank]}
        </span>
        {molecular_weight != null && (
          <span className="font-mono text-[0.58rem] text-[#9ca3af]">
            {Number(molecular_weight).toFixed(1)} g/mol
          </span>
        )}
      </div>

      {molecular_formula && (
        <p className="font-mono text-[0.95rem] font-semibold text-[#1d1d1f] text-center tracking-tight">
          {molecular_formula}
        </p>
      )}

      <div className="flex justify-center bg-gray-50/80 rounded-xl p-2">
        <SmilesStructure smiles={smiles} width={200} height={138} />
      </div>

      <div className="space-y-2">
        <Bar label="Confidence"     value={confidence} />
        <Bar label="FAISS match"    value={similarity_score} />
      </div>

      <div className="bg-gray-50/80 rounded-lg px-2.5 py-2 border border-black/[0.05]">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-mono text-[0.55rem] text-[#9ca3af] uppercase tracking-wider">SMILES</span>
          <button
            onClick={() => navigator.clipboard?.writeText(smiles)}
            className="font-mono text-[0.55rem] text-[#7c3aed] hover:underline"
          >
            copy
          </button>
        </div>
        <p className="font-mono text-[0.58rem] text-[#6e6e73] break-all leading-relaxed">{smiles}</p>
      </div>

      {rationale && (
        <div>
          <button
            onClick={() => setExpanded(v => !v)}
            className="font-mono text-[0.62rem] text-[#7c3aed] hover:underline"
          >
            {expanded ? '− rationale' : '+ rationale'}
          </button>
          {expanded && (
            <p className="mt-1.5 font-mono text-[0.62rem] text-[#6e6e73] leading-relaxed bg-gray-50 rounded-lg px-2.5 py-2 border border-black/[0.05]">
              {rationale}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
