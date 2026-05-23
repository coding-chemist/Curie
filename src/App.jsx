import { useState } from 'react'
import './index.css'
import { useMolecule } from './hooks/useMolecule'
import { useAsk }      from './hooks/useAsk'

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

const AgentIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.3" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <line x1="8" y1="1.5" x2="8" y2="3.5"  stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="8" y1="12.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="1.5" y1="8" x2="3.5" y2="8"   stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="12.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

const SparkleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.5L10.4 6.8C10.6 7.5 11.1 8 11.8 8.2L17.1 9.6L11.8 11C11.1 11.2 10.6 11.7 10.4 12.4L9 17.7L7.6 12.4C7.4 11.7 6.9 11.2 6.2 11L0.9 9.6L6.2 8.2C6.9 8 7.4 7.5 7.6 6.8L9 1.5Z"
      fill="url(#sparkle-grad)" />
    <defs>
      <linearGradient id="sparkle-grad" x1="0" y1="0" x2="18" y2="18">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  </svg>
)

const BoxIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 5L8 2L14 5L8 8L2 5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M2 5V11L8 14L14 11V5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M8 8V14" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const BookIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 3C2 2.5 2.5 2 3 2H7V13H3C2.5 13 2 12.5 2 12V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M14 3C14 2.5 13.5 2 13 2H9V13H13C13.5 13 14 12.5 14 12V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

const CheckIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
    <path d="M3 2L6 5L3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Spinner ───────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="rgba(124,58,237,0.2)" strokeWidth="2" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ── Suggestions ───────────────────────────────────────────────────────────────

const LOOKUP_SUGGESTIONS = ['caffeine', 'aspirin', 'ibuprofen', 'ethanol', 'vanillin']

const ASK_SUGGESTIONS = [
  'What is caffeine used for?',
  'Is aspirin available in stock?',
  'What are the properties of ibuprofen?',
  'Tell me about ethanol in chemistry',
]

// ── Intent badge colors ───────────────────────────────────────────────────────

const INTENT_STYLE = {
  property: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)',  text: '#7c3aed', label: 'Properties' },
  catalog:  { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', text: '#059669', label: 'Catalog'     },
  safety:   { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.22)',  text: '#dc2626', label: 'Safety'      },
  general:  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.22)', text: '#2563eb', label: 'General'     },
}

// ── MoleculeCard ──────────────────────────────────────────────────────────────

function MoleculeCard({ data }) {
  return (
    <div className="rounded-2xl border border-white/90 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'saturate(180%) blur(48px)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.07)',
      }}>

      <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.06] bg-black/[0.015]">
        <SearchIcon size={13} />
        <span className="font-mono text-[0.78rem] text-[#6e6e73]">{data.name}</span>
        <span className="ml-auto font-mono text-[0.65rem] text-[#9ca3af]">PubChem CID {data.cid}</span>
      </div>

      <div className="p-6">
        <div className="flex gap-5 mb-5">
          <div className="shrink-0 w-[160px] rounded-xl border border-[rgba(124,58,237,0.12)]
            bg-[rgba(124,58,237,0.04)] p-4">
            <div className="w-full h-[80px] rounded-lg bg-white/80 border border-[rgba(124,58,237,0.1)]
              flex items-center justify-center mb-3">
              <AtomIcon size={36} />
            </div>
            <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] mb-2 truncate" title={data.name}>
              {data.name}
            </p>
            {data.formula          && <p className="font-mono text-[0.65rem] text-[#6e6e73]">{data.formula}</p>}
            {data.molecular_weight && <p className="font-mono text-[0.65rem] text-[#6e6e73]">MW {data.molecular_weight}</p>}
            {data.cas              && <p className="font-mono text-[0.65rem] text-[#6e6e73]">CAS {data.cas}</p>}
          </div>

          <div className="flex-1 min-w-0">
            {data.iupac_name && (
              <div className="mb-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">IUPAC Name</p>
                <p className="text-[0.88rem] font-medium text-[#1d1d1f] leading-snug">{data.iupac_name}</p>
              </div>
            )}
            {data.smiles && (
              <div className="mb-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">SMILES</p>
                <p className="font-mono text-[0.75rem] text-[#374151] break-all leading-relaxed
                  bg-black/[0.03] rounded-lg px-3 py-2 border border-black/[0.06]">
                  {data.smiles}
                </p>
              </div>
            )}
            <a href={data.source.url} target="_blank" rel="noopener noreferrer"
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

        {data.synonyms?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06]">
            <span className="font-mono text-[0.65rem] text-[#9ca3af] self-center mr-1">Also known as:</span>
            {data.synonyms.slice(0, 4).map(s => (
              <span key={s} className="font-mono text-[0.65rem] text-[#6e6e73]
                bg-black/[0.04] border border-black/[0.07] px-2.5 py-1 rounded-md">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Agent helpers ─────────────────────────────────────────────────────────────

const SOURCE_ICON = {
  PubChem: <AtomIcon size={13} />,
  'Internal Catalog': <BoxIcon size={13} />,
  Wikipedia: <BookIcon size={13} />,
}

function PipelineRail({ toolsUsed, iterations }) {
  const tools = [
    { name: 'PubChem',   key: 'pubchem'   },
    { name: 'Catalog',   key: 'catalog'   },
    { name: 'Wikipedia', key: 'wikipedia' },
  ]

  return (
    <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mr-1">
        Reasoner
      </span>
      <span className="flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full
        bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] text-[#7c3aed]">
        ↻ {iterations || 1} step{(iterations || 1) === 1 ? '' : 's'}
      </span>
      <span className="text-[#d4d4d8]"><ArrowIcon /></span>
      {tools.map((t, i) => {
        const active = toolsUsed?.includes(t.key)
        return (
          <span key={t.key} className={`flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full border transition-all
            ${active
              ? 'bg-[rgba(124,58,237,0.08)] border-[rgba(124,58,237,0.25)] text-[#7c3aed]'
              : 'bg-black/[0.025] border-black/[0.06] text-[#c4c4c4]'}`}>
            {active && <span className="text-[#7c3aed]"><CheckIcon size={9} /></span>}
            {t.name}
          </span>
        )
      })}
      <span className="text-[#d4d4d8]"><ArrowIcon /></span>
      <span className="flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full
        bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] text-[#7c3aed]">
        <CheckIcon size={9} /> Answer
      </span>
    </div>
  )
}

function AgentTrace({ trace, iterations }) {
  const [open, setOpen] = useState(false)
  if (!trace || trace.length === 0) return null

  return (
    <div className="px-7 pb-6 pt-2 border-t border-black/[0.05]">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 w-full text-left group">
        <span className={`text-[#9ca3af] transition-transform ${open ? 'rotate-90' : ''}`}>
          <ArrowIcon />
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af]
          group-hover:text-[#7c3aed] transition-colors">
          Agent reasoning · {iterations} iteration{iterations === 1 ? '' : 's'} · {trace.length} tool call{trace.length === 1 ? '' : 's'}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-1.5 pl-4 border-l-2 border-[rgba(124,58,237,0.15)]">
          {trace.map((t, i) => {
            const statusColor =
              t.status === 'ok'        ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
              t.status === 'not_found' ? 'text-amber-700  bg-amber-50  border-amber-200'     :
                                         'text-red-700    bg-red-50    border-red-200'
            return (
              <div key={i} className="flex items-start gap-2 py-1.5">
                <span className="font-mono text-[0.6rem] text-[#9ca3af] mt-0.5 shrink-0 w-8">
                  #{t.step}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[0.7rem] font-medium text-[#1d1d1f]">{t.tool}</span>
                    <span className="font-mono text-[0.62rem] text-[#9ca3af]">
                      ({Object.entries(t.args).map(([k,v]) => `${k}=${JSON.stringify(v)}`).join(', ')})
                    </span>
                    <span className={`font-mono text-[0.55rem] font-semibold uppercase tracking-wider
                      border px-1.5 py-0.5 rounded ${statusColor}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="font-mono text-[0.62rem] text-[#6e6e73] mt-0.5">→ {t.summary}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function KeyFacts({ facts }) {
  if (!facts) return null
  const tiles = [
    { label: 'Formula',    value: facts.formula },
    { label: 'MW (g/mol)', value: facts.molecular_weight },
    { label: 'CAS',        value: facts.cas },
    { label: 'PubChem CID',value: facts.cid },
  ].filter(t => t.value)

  if (tiles.length === 0) return null

  return (
    <div className="px-7 py-5 border-b border-black/[0.05]">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-3">
        Key facts
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {tiles.map(t => (
          <div key={t.label} className="rounded-xl p-3 border border-[rgba(124,58,237,0.12)]
            bg-gradient-to-br from-[rgba(124,58,237,0.04)] to-white">
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">{t.label}</p>
            <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] break-all">{t.value}</p>
          </div>
        ))}
      </div>
      {facts.iupac_name && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-black/[0.025] border border-black/[0.05]">
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">IUPAC name</p>
          <p className="font-mono text-[0.72rem] text-[#1d1d1f] leading-snug">{facts.iupac_name}</p>
        </div>
      )}
    </div>
  )
}

function ProductCard({ row }) {
  return (
    <div className="rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 to-white p-4
      hover:border-emerald-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
            <BoxIcon size={11} />
            <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-wider">In stock</span>
          </div>
          <p className="font-mono text-[0.82rem] font-semibold text-[#1d1d1f]">{row.sku}</p>
          <p className="font-mono text-[0.65rem] text-[#6e6e73] mt-0.5">{row.supplier}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[1.1rem] font-semibold text-[#1d1d1f]">${row.price_usd}</p>
          <p className="font-mono text-[0.6rem] text-[#9ca3af] mt-0.5">{row.pack_size}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-100">
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Grade</p>
          <p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f]">{row.grade}</p>
        </div>
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Stock</p>
          <p className="font-mono text-[0.72rem] font-medium text-emerald-700">{row.stock_units} units</p>
        </div>
        <div>
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Lead time</p>
          <p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f]">{row.lead_time_days}d</p>
        </div>
      </div>
    </div>
  )
}

// ── AgentAnswer ───────────────────────────────────────────────────────────────

function AgentAnswer({ data }) {
  const style = INTENT_STYLE[data.intent] || INTENT_STYLE.general

  return (
    <div>
      {/* Pipeline rail */}
      <PipelineRail toolsUsed={data.tools_used} iterations={data.iterations} />

      {/* Main card */}
      <div className="rounded-2xl border border-white/90 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'saturate(180%) blur(48px)',
          boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 24px 48px rgba(124,58,237,0.08)',
        }}>

        {/* Hero header */}
        <div className="px-7 pt-6 pb-5 border-b border-black/[0.05]
          bg-gradient-to-br from-[rgba(124,58,237,0.04)] to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.text }}>
              {style.label}
            </span>
            {data.has_catalog_data && (
              <span className="font-mono text-[0.6rem] font-semibold text-emerald-700 uppercase tracking-wider
                bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span><CheckIcon size={8} /></span> In catalog
              </span>
            )}
            <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">
              ReAct · {data.iterations || 1} step{(data.iterations || 1) === 1 ? '' : 's'}
            </span>
          </div>
          <h2 className="font-mono text-[1.55rem] font-semibold tracking-tight text-[#1d1d1f] capitalize leading-tight">
            {data.molecule_name}
          </h2>
        </div>

        {/* Key facts strip */}
        <KeyFacts facts={data.pubchem_facts} />

        {/* Answer body */}
        <div className="px-7 py-6">
          <div className="flex gap-3 items-start">
            <span className="shrink-0 mt-0.5"><SparkleIcon size={20} /></span>
            <div className="flex-1">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2">
                Synthesized answer
              </p>
              <p className="font-mono text-[0.82rem] text-[#1d1d1f] leading-[1.95] tracking-[0.005em]">
                {data.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Catalog product cards */}
        {data.catalog_rows?.length > 0 && (
          <div className="px-7 pb-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2.5">
              Catalog hit
            </p>
            <div className="space-y-2.5">
              {data.catalog_rows.slice(0, 2).map((row, i) => (
                <ProductCard key={i} row={row} />
              ))}
            </div>
          </div>
        )}

        {/* Agent trace (audit log) */}
        <AgentTrace trace={data.trace} iterations={data.iterations} />

        {/* Sources */}
        {data.citations?.length > 0 && (
          <div className="px-7 pb-6 pt-2 border-t border-black/[0.05]">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2.5">
              Sources · {data.citations.length}
            </p>
            <div className="space-y-2">
              {data.citations.map((c, i) => {
                const icon = SOURCE_ICON[c.source] || <StarIcon />
                const Body = (
                  <>
                    <span className="text-[#7c3aed] shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f] leading-tight">
                        {c.source}
                        {c.cid && <span className="text-[#9ca3af] font-normal"> · CID {c.cid}</span>}
                      </p>
                      <p className="font-mono text-[0.6rem] text-[#6e6e73] mt-0.5">
                        {c.accessed && <>accessed {c.accessed}</>}
                        {c.note && <>{c.note}</>}
                        {!c.accessed && !c.note && c.url && <>{c.url.replace(/^https?:\/\//, '').slice(0, 50)}</>}
                      </p>
                    </div>
                    {c.url && <span className="text-[#9ca3af] text-[0.6rem] shrink-0">↗</span>}
                  </>
                )
                return c.url ? (
                  <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/[0.06]
                      hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.025)]
                      transition-all duration-150">
                    {Body}
                  </a>
                ) : (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/[0.06]">
                    {Body}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState('')
  const [mode, setMode]   = useState('lookup')   // 'lookup' | 'ask'

  const { data: molData, loading: molLoading, error: molError, search, reset: molReset } = useMolecule()
  const { data: askData, loading: askLoading, error: askError, ask,    reset: askReset } = useAsk()

  const loading = mode === 'lookup' ? molLoading : askLoading
  const error   = mode === 'lookup' ? molError   : askError
  const data    = mode === 'lookup' ? molData     : askData

  const handleModeSwitch = (newMode) => {
    setMode(newMode)
    setQuery('')
    molReset()
    askReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    if (mode === 'lookup') search(query)
    else                   ask(query)
  }

  const handleSuggestion = (text) => {
    setQuery(text)
    if (mode === 'lookup') search(text)
    else                   ask(text)
  }

  const suggestions = mode === 'lookup' ? LOOKUP_SUGGESTIONS : ASK_SUGGESTIONS

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

        {/* Mode toggle */}
        <div className="flex justify-center mb-5 animate-rise-1">
          <div className="inline-flex items-center gap-1 rounded-full p-1
            bg-black/[0.04] border border-black/[0.07]">
            <button
              onClick={() => handleModeSwitch('lookup')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.72rem] font-mono font-medium
                transition-all duration-200 ${mode === 'lookup'
                  ? 'bg-white text-[#1d1d1f] shadow-sm border border-black/[0.07]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
              <SearchIcon size={11} /> Lookup
            </button>
            <button
              onClick={() => handleModeSwitch('ask')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.72rem] font-mono font-medium
                transition-all duration-200 ${mode === 'ask'
                  ? 'bg-white text-[#1d1d1f] shadow-sm border border-black/[0.07]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
              <AgentIcon /> Ask Agent
            </button>
          </div>
        </div>

        {/* Search / Ask bar */}
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
                {loading ? <Spinner /> : (mode === 'ask' ? <AgentIcon /> : <SearchIcon />)}
              </span>

              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={mode === 'ask' ? 'Ask anything about a molecule…' : 'Search by name, CAS, or synonym…'}
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
                  {mode === 'ask' ? 'Ask' : 'Search'}
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
            {suggestions.map(p => (
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
              {mode === 'ask'
                ? 'Classifying intent · Fetching tools · Synthesizing answer…'
                : 'Querying PubChem…'}
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50/80 px-6 py-5 mb-4 animate-rise-2">
            <p className="font-mono text-[0.82rem] text-red-600">{error}</p>
          </div>
        )}

        {/* Result */}
        {data && !loading && (
          <div className="animate-rise-2 mb-4">
            {mode === 'lookup'
              ? <MoleculeCard data={data} />
              : <AgentAnswer  data={data} />}
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
