import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './index.css'
import { useMolecule } from './hooks/useMolecule'
import { useAsk }      from './hooks/useAsk'
import { useSafety }   from './hooks/useSafety'
import { useCompare }  from './hooks/useCompare'
import { useProcure }  from './hooks/useProcure'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ═══════════════════════════════════════════════════════════════════════════════
//  ICONS
// ═══════════════════════════════════════════════════════════════════════════════

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

const AgentIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.3" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <line x1="8" y1="1.5" x2="8" y2="3.5"  stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="8" y1="12.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="1.5" y1="8" x2="3.5" y2="8"   stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="12.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

const ShieldIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5L13.5 3.5V8C13.5 11 11.2 13.5 8 14.5C4.8 13.5 2.5 11 2.5 8V3.5L8 1.5Z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScalesIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="3" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M4.5 4L2.5 9H6.5L4.5 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M11.5 4L9.5 9H13.5L11.5 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="5" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const CartIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 3H4L5 11H13L14 5H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6.5" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="11.5" cy="13.5" r="0.9" fill="currentColor" />
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

const AlertIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5L15 14H1L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <line x1="8" y1="6" x2="8" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="12" r="0.8" fill="currentColor" />
  </svg>
)

const Spinner = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="rgba(124,58,237,0.2)" strokeWidth="2" />
    <path d="M8 2a6 6 0 0 1 6 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ═══════════════════════════════════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const MODES = [
  { key: 'lookup',  label: 'Lookup',  Icon: SearchIcon },
  { key: 'ask',     label: 'Ask',     Icon: AgentIcon  },
  { key: 'safety',  label: 'Safety',  Icon: ShieldIcon },
  { key: 'compare', label: 'Compare', Icon: ScalesIcon },
  { key: 'procure', label: 'Procure', Icon: CartIcon   },
]

const SUGGESTIONS = {
  lookup:  ['caffeine', 'aspirin', 'ibuprofen', 'ethanol', 'vanillin'],
  ask:     ['What is caffeine used for?', 'Is aspirin available in stock?', 'Properties of ibuprofen', 'Tell me about ethanol'],
  safety:  ['benzene', 'chloroform', 'DMSO', 'acetone', 'methanol'],
  compare: ['ethanol, methanol, isopropanol', 'aspirin, ibuprofen, acetaminophen', 'benzene, toluene'],
  procure: ['aspirin, caffeine, ethanol', 'acetone x 3, methanol x 2', 'glucose, citric acid, urea'],
}

const PLACEHOLDERS = {
  lookup:  'Search by name, CAS, or synonym…',
  ask:     'Ask anything about a molecule…',
  safety:  'Enter a compound for pre-experiment safety briefing…',
  compare: 'Enter 2–4 compounds, comma-separated…',
  procure: 'Enter compounds to order (e.g. aspirin x 2, ethanol)…',
}

const LOADING_MSG = {
  lookup:  'Querying PubChem…',
  ask:     'Agent reasoning · selecting tools · synthesizing…',
  safety:  'Agent fetching identity · hazards · catalog · briefing…',
  compare: 'Agent gathering data for each compound…',
  procure: 'Agent matching catalog · finding alternatives…',
}

const INTENT_STYLE = {
  property: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)',  text: '#7c3aed', label: 'Properties' },
  catalog:  { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', text: '#059669', label: 'Catalog'    },
  safety:   { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.22)',  text: '#dc2626', label: 'Safety'     },
  general:  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.22)', text: '#2563eb', label: 'General'    },
}

const RISK_STYLE = {
  low:      { bg: 'bg-emerald-50',  border: 'border-emerald-200', text: 'text-emerald-700', label: 'Low risk'      },
  moderate: { bg: 'bg-amber-50',    border: 'border-amber-200',   text: 'text-amber-700',   label: 'Moderate risk' },
  high:     { bg: 'bg-orange-50',   border: 'border-orange-200',  text: 'text-orange-700',  label: 'High risk'     },
  extreme:  { bg: 'bg-red-50',      border: 'border-red-200',     text: 'text-red-700',     label: 'Extreme risk'  },
  unknown:  { bg: 'bg-gray-50',     border: 'border-gray-200',    text: 'text-gray-700',    label: 'Unknown risk'  },
}

const SIGNAL_STYLE = {
  Danger:  'bg-red-100 border-red-300 text-red-800',
  Warning: 'bg-amber-100 border-amber-300 text-amber-800',
}

const SOURCE_ICON = {
  PubChem: <AtomIcon size={13} />,
  'Internal Catalog': <BoxIcon size={13} />,
  Wikipedia: <BookIcon size={13} />,
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GHS PICTOGRAMS — inline SVGs (no external loads, no hot-link blocks)
// ═══════════════════════════════════════════════════════════════════════════════

const GHS_SYMBOL = {
  GHS01: ( // Explosive — exploding bomb
    <g>
      <circle cx="50" cy="62" r="11" fill="#1d1d1f"/>
      <line x1="50" y1="51" x2="50" y2="28" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="26" r="2.5" fill="#1d1d1f"/>
      <g stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round">
        <line x1="36" y1="50" x2="26" y2="40"/>
        <line x1="64" y1="50" x2="74" y2="40"/>
        <line x1="32" y1="63" x2="20" y2="63"/>
        <line x1="68" y1="63" x2="80" y2="63"/>
        <line x1="38" y1="76" x2="30" y2="84"/>
        <line x1="62" y1="76" x2="70" y2="84"/>
      </g>
    </g>
  ),
  GHS02: ( // Flammable — flame
    <path fill="#1d1d1f" d="M52 22 C46 32 48 42 53 48 C40 44 35 58 38 72 C42 82 60 82 64 72 C68 58 60 44 50 48 C56 42 58 32 52 22 Z"/>
  ),
  GHS03: ( // Oxidizing — flame above circle
    <g>
      <circle cx="50" cy="70" r="11" fill="none" stroke="#1d1d1f" strokeWidth="3"/>
      <path fill="#1d1d1f" d="M52 22 C46 31 48 41 53 47 C42 43 38 55 41 65 C45 72 56 72 60 65 C63 55 58 43 50 47 C56 41 58 31 52 22 Z"/>
      <line x1="20" y1="70" x2="36" y2="70" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round"/>
      <line x1="64" y1="70" x2="80" y2="70" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round"/>
    </g>
  ),
  GHS04: ( // Compressed gas — cylinder
    <g fill="none" stroke="#1d1d1f" strokeWidth="3.5" strokeLinejoin="round">
      <rect x="38" y="24" width="24" height="56" rx="4"/>
      <line x1="38" y1="42" x2="62" y2="42"/>
      <line x1="38" y1="68" x2="62" y2="68"/>
      <circle cx="50" cy="32" r="2.5" fill="#1d1d1f"/>
    </g>
  ),
  GHS05: ( // Corrosive — drips eating into hand + surface
    <g>
      <g fill="#1d1d1f">
        <path d="M32 28 L28 38 L42 50 L38 38 Z"/>
        <path d="M68 28 L72 38 L58 50 L62 38 Z"/>
      </g>
      <g stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round">
        <line x1="34" y1="54" x2="34" y2="68"/>
        <line x1="42" y1="56" x2="42" y2="74"/>
        <line x1="58" y1="56" x2="58" y2="74"/>
        <line x1="66" y1="54" x2="66" y2="68"/>
      </g>
      <path d="M20 80 Q35 74 50 80 Q65 74 80 80" stroke="#1d1d1f" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </g>
  ),
  GHS06: ( // Acute toxic — skull and crossbones
    <g>
      <g fill="#1d1d1f">
        <ellipse cx="50" cy="42" rx="14" ry="15"/>
      </g>
      <circle cx="44" cy="42" r="3" fill="white"/>
      <circle cx="56" cy="42" r="3" fill="white"/>
      <rect x="46.5" y="51" width="2.5" height="6" fill="white"/>
      <rect x="51" y="51" width="2.5" height="6" fill="white"/>
      <g stroke="#1d1d1f" strokeWidth="5" strokeLinecap="round">
        <line x1="30" y1="64" x2="70" y2="80"/>
        <line x1="30" y1="80" x2="70" y2="64"/>
      </g>
      <g fill="#1d1d1f">
        <circle cx="28" cy="64" r="3"/>
        <circle cx="72" cy="64" r="3"/>
        <circle cx="28" cy="80" r="3"/>
        <circle cx="72" cy="80" r="3"/>
      </g>
    </g>
  ),
  GHS07: ( // Harmful — exclamation mark
    <g fill="#1d1d1f">
      <path d="M45 26 L55 26 L52 60 L48 60 Z"/>
      <circle cx="50" cy="70" r="5"/>
    </g>
  ),
  GHS08: ( // Health hazard — human silhouette with burst
    <g fill="#1d1d1f">
      <circle cx="50" cy="30" r="6"/>
      <path d="M42 38 L42 80 L46 80 L46 60 L54 60 L54 80 L58 80 L58 38 Z"/>
      <path d="M50 44 L52 50 L58 50 L53 54 L55 60 L50 56 L45 60 L47 54 L42 50 L48 50 Z" fill="white"/>
    </g>
  ),
  GHS09: ( // Environmental — dead fish + dead tree
    <g>
      <g stroke="#1d1d1f" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="28" y1="78" x2="28" y2="38"/>
        <line x1="28" y1="48" x2="20" y2="40"/>
        <line x1="28" y1="53" x2="36" y2="46"/>
        <line x1="28" y1="60" x2="22" y2="56"/>
      </g>
      <path d="M8 78 Q18 74 28 78 T48 78 T68 78 T88 78 T96 78" stroke="#1d1d1f" strokeWidth="2" fill="none"/>
      <path d="M52 70 Q63 64 72 70 Q75 72 72 75 Q63 78 52 73 Z" fill="#1d1d1f"/>
      <path d="M72 70 L82 65 L82 76 L74 73 Z" fill="#1d1d1f"/>
      <g stroke="white" strokeWidth="1.5" strokeLinecap="round">
        <line x1="58" y1="69" x2="62" y2="74"/>
        <line x1="58" y1="74" x2="62" y2="69"/>
      </g>
    </g>
  ),
}

function InlineGhsSvg({ code }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
      <polygon points="50,4 96,50 50,96 4,50"
        fill="white" stroke="#dc2626" strokeWidth="7" strokeLinejoin="round" />
      {GHS_SYMBOL[code] || null}
    </svg>
  )
}

function GhsPictogram({ code, label }) {
  // Try local OSHA-quality file first (drop into /public/ghs/GHS01.png etc.).
  // Fall back to inline SVG so the app always renders something.
  const [localFailed, setLocalFailed] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[72px] h-[72px]">
        {localFailed ? (
          <InlineGhsSvg code={code} />
        ) : (
          <img
            src={`/ghs/${code}.png`}
            alt={`${code} — ${label}`}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setLocalFailed(true)}
          />
        )}
      </div>
      <span className="font-mono text-[0.62rem] uppercase tracking-wider font-bold text-red-700">{code}</span>
      <span className="font-mono text-[0.62rem] text-[#1d1d1f] text-center leading-tight max-w-[90px] font-medium">{label}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── 2D structure with robust fallback chain ──────────────────────────────────
// Tries: RDKit-by-SMILES → RDKit-by-CID → PubChem PNG (always reliable)
// Each failure advances to next candidate; `key` forces React to remount the
// <img> element so the browser fetches the new URL cleanly.

function Structure2D({ cid, smiles, size }) {
  const candidates = []
  if (smiles) candidates.push(`${API_BASE}/api/v1/structure/svg?smiles=${encodeURIComponent(smiles)}&width=${size * 2}&height=${size * 2}`)
  if (cid)    candidates.push(`${API_BASE}/api/v1/structure/svg/cid/${cid}?width=${size * 2}&height=${size * 2}`)
  if (cid)    candidates.push(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size * 2}x${size * 2}`)

  const [idx, setIdx] = useState(0)

  // Reset when inputs change (new compound)
  useEffect(() => { setIdx(0) }, [cid, smiles])

  if (candidates.length === 0) return null
  if (idx >= candidates.length) {
    return (
      <div className="flex items-center justify-center w-full h-full text-[#9ca3af] font-mono text-[0.7rem] bg-white">
        Structure unavailable
      </div>
    )
  }

  return (
    <img
      key={`${idx}-${candidates[idx]}`}
      src={candidates[idx]}
      alt={`Structure ${cid ? `CID ${cid}` : ''}`}
      className="w-full h-full object-contain p-2 bg-white"
      loading="eager"
      onError={() => setIdx(i => i + 1)}
    />
  )
}

// ── 3D structure (3Dmol.js) ──────────────────────────────────────────────────
// Needs: (1) 3Dmol library loaded, (2) container with pixel dimensions,
//        (3) valid SDF from PubChem. We poll for library, force dimensions,
//        and surface explicit error states (instead of silent white).

function Structure3D({ cid, size }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')   // loading | ready | nolib | nodata | error

  useEffect(() => {
    if (!cid || !containerRef.current) return

    let cancelled = false
    let viewer   = null

    const run = async () => {
      // 1. Wait up to 5s for 3Dmol global to appear
      let waited = 0
      while (!window.$3Dmol && waited < 5000 && !cancelled) {
        await new Promise(r => setTimeout(r, 100))
        waited += 100
      }
      if (cancelled) return
      if (!window.$3Dmol) { setStatus('nolib'); return }

      // 2. Ensure container has pixel dimensions BEFORE createViewer
      const el = containerRef.current
      if (!el) return
      if (el.clientWidth === 0 || el.clientHeight === 0) {
        el.style.width  = `${size}px`
        el.style.height = `${size}px`
      }

      // 3. Initialize viewer
      try {
        viewer = window.$3Dmol.createViewer(el, {
          backgroundColor: 'white',
          antialias: true,
        })
      } catch (e) {
        console.warn('3Dmol init failed:', e)
        setStatus('error')
        return
      }

      // 4. Fetch 3D SDF — try 3D first, fall back to 2D coords if no 3D
      const tryUrls = [
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`,
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF`,
      ]
      let sdf = null
      for (const url of tryUrls) {
        try {
          const resp = await fetch(url)
          if (resp.ok) {
            const text = await resp.text()
            if (text && text.length > 30) { sdf = text; break }
          }
        } catch (e) { /* try next */ }
      }

      if (cancelled) return
      if (!sdf) { setStatus('nodata'); return }

      // 5. Render
      try {
        viewer.addModel(sdf, 'sdf')
        viewer.setStyle({}, { stick: { radius: 0.18 }, sphere: { scale: 0.25 } })
        viewer.zoomTo()
        viewer.render()
        viewer.resize()
        setStatus('ready')
      } catch (e) {
        console.warn('3Dmol render failed:', e)
        setStatus('error')
      }
    }

    setStatus('loading')
    run()

    return () => {
      cancelled = true
      try { viewer && viewer.clear() } catch {}
    }
  }, [cid, size])

  const messages = {
    loading: 'Loading 3D model…',
    nolib:   '3Dmol.js failed to load. Check internet / ad-blocker.',
    nodata:  'No 3D coordinates available for this compound.',
    error:   'Could not render 3D model.',
  }

  return (
    <div className="relative w-full h-full bg-white" style={{ minHeight: size }}>
      <div ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative', minHeight: size }}
      />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/95">
          <span className="font-mono text-[0.7rem] text-[#9ca3af] px-4 text-center">
            {messages[status]}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Structure modal (click 2D to enlarge) ────────────────────────────────────

function StructureModal({ cid, smiles, name, onClose }) {
  const [view, setView] = useState('2d')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  // Render via Portal so the modal escapes any parent containing block
  // (the safety briefing card uses backdrop-filter, which traps position:fixed
  //  children inside it — we need to mount under <body> to actually cover the viewport).
  const modal = (
    <div onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      className="animate-fade-in">
      <div onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '92vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <AtomIcon size={16} />
            <span className="font-mono text-[0.85rem] font-semibold text-[#1d1d1f] capitalize truncate">
              {name || `CID ${cid}`}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full p-1 bg-black/[0.04] shrink-0">
            <button onClick={() => setView('2d')}
              className={`px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-wider font-medium transition-colors
                ${view === '2d' ? 'bg-white text-[#7c3aed] shadow-sm' : 'text-[#6e6e73]'}`}>2D</button>
            <button onClick={() => setView('3d')} disabled={!cid}
              className={`px-3 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-wider font-medium transition-colors
                ${view === '3d' ? 'bg-white text-[#7c3aed] shadow-sm' : !cid ? 'text-[#d4d4d8]' : 'text-[#6e6e73]'}`}>3D</button>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/[0.06] hover:bg-black/[0.12] flex items-center justify-center font-mono text-[1.1rem] text-[#6e6e73] transition-colors shrink-0">
            ×
          </button>
        </div>

        {/* Big structure area */}
        <div className="bg-white flex-1" style={{ minHeight: 520 }}>
          {view === '2d' && <Structure2D cid={cid} smiles={smiles} size={520} />}
          {view === '3d' && <Structure3D cid={cid} size={520} />}
        </div>

        <div className="px-6 py-3 border-t border-black/[0.05] bg-black/[0.015] text-center shrink-0">
          <span className="font-mono text-[0.62rem] text-[#9ca3af]">
            {view === '3d' ? 'Drag to rotate · Scroll to zoom · ' : ''}Press ESC or click outside to close
          </span>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

// ── Structure viewer with 2D/3D tabs + click to enlarge ──────────────────────

function StructureViewer({ cid, smiles, name, size = 200, expandable = true }) {
  const [view, setView] = useState('2d')
  const [modalOpen, setModalOpen] = useState(false)
  if (!cid && !smiles) return null

  return (
    <>
      <div className="rounded-xl border border-black/[0.08] overflow-hidden flex flex-col bg-white shadow-sm"
        style={{ width: size, height: size + 28 }}>
        <div className="flex items-center border-b border-black/[0.06] bg-black/[0.015]">
          <button onClick={() => setView('2d')}
            className={`flex-1 font-mono text-[0.6rem] font-medium uppercase tracking-wider py-1.5 transition-colors
              ${view === '2d' ? 'bg-white text-[#7c3aed] border-b-2 border-[#7c3aed]' : 'text-[#9ca3af] hover:text-[#1d1d1f]'}`}>
            2D
          </button>
          <button onClick={() => setView('3d')} disabled={!cid}
            className={`flex-1 font-mono text-[0.6rem] font-medium uppercase tracking-wider py-1.5 transition-colors
              ${view === '3d' ? 'bg-white text-[#7c3aed] border-b-2 border-[#7c3aed]' :
                !cid ? 'text-[#d4d4d8] cursor-not-allowed' : 'text-[#9ca3af] hover:text-[#1d1d1f]'}`}>
            3D
          </button>
          {expandable && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setModalOpen(true) }}
              className="px-3 py-1.5 text-[#7c3aed] hover:bg-[rgba(124,58,237,0.08)] transition-colors flex items-center justify-center"
              title="Enlarge structure"
              aria-label="Enlarge structure">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 7 V3 H7 M13 9 V13 H9 M3 9 V13 H7 M13 7 V3 H9"
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        <div className="flex-1 bg-white relative group" style={{ minHeight: 0, cursor: expandable ? 'zoom-in' : 'default' }}
          onClick={() => { if (expandable) setModalOpen(true) }}>
          {view === '2d' && <Structure2D cid={cid} smiles={smiles} size={size} />}
          {view === '3d' && <Structure3D cid={cid} size={size} />}
          {expandable && view === '2d' && (
            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity
              bg-white/90 border border-black/[0.08] rounded px-1.5 py-0.5 font-mono text-[0.55rem] text-[#7c3aed] pointer-events-none">
              click to enlarge
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <StructureModal cid={cid} smiles={smiles} name={name} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

const StructureImage = ({ cid, smiles, name, size }) =>
  <StructureViewer cid={cid} smiles={smiles} name={name} size={size} />

// ── Authoritative source data wrapper (collapsed by default) ─────────────────

function AuthoritativeSection({ sections }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-7 py-4 border-t border-black/[0.05] bg-black/[0.012]">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 w-full text-left group">
        <span className={`text-[#9ca3af] transition-transform ${open ? 'rotate-90' : ''}`}><ArrowIcon /></span>
        <AtomIcon size={13} />
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] group-hover:text-[#7c3aed] transition-colors">
          Authoritative source data · {sections.length}
        </p>
      </button>
      {open && (
        <div className="mt-3">
          <p className="font-mono text-[0.65rem] text-[#6e6e73] mb-3 italic">
            Raw text from PubChem the agent used. Trust but verify.
          </p>
          <div className="space-y-2">
            {sections.map((s, i) => <PubChemSourceCard key={i} section={s} />)}
          </div>
        </div>
      )}
    </div>
  )
}

// ── PubChem section card (collapsible authoritative source data) ─────────────

function PubChemSourceCard({ section }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-black/[0.07] bg-white/70 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-black/[0.025] transition-colors">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[#7c3aed] shrink-0"><AtomIcon size={12} /></span>
          <span className="font-mono text-[0.75rem] font-semibold text-[#1d1d1f] truncate">{section.heading}</span>
          <span className="font-mono text-[0.6rem] text-[#9ca3af] shrink-0">PubChem</span>
        </div>
        <span className={`text-[#9ca3af] shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}><ArrowIcon /></span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-black/[0.05]">
          <p className="font-mono text-[0.72rem] text-[#374151] leading-[1.75] whitespace-pre-wrap">{section.text}</p>
          {section.url && (
            <a href={section.url} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-3 font-mono text-[0.65rem] text-[#7c3aed] hover:underline">
              Open on PubChem ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function AgentTrace({ trace, iterations, toolsUsed }) {
  const [open, setOpen] = useState(false)
  if (!trace || trace.length === 0) return null

  const thoughtCount = trace.filter(t => t.type === 'thought').length
  const toolCount    = trace.filter(t => !t.type || t.type === 'tool').length
  const synthCount   = trace.filter(t => t.type === 'synthesize').length

  return (
    <div className="px-7 pb-6 pt-2 border-t border-black/[0.05]">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 w-full text-left group">
        <span className={`text-[#9ca3af] transition-transform ${open ? 'rotate-90' : ''}`}><ArrowIcon /></span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] group-hover:text-[#7c3aed] transition-colors">
          Agent reasoning · {iterations || 0} iter · {thoughtCount} thought{thoughtCount === 1 ? '' : 's'} · {toolCount} tool call{toolCount === 1 ? '' : 's'}{synthCount > 0 ? ` · 1 synth` : ''}
          {toolsUsed && toolsUsed.length > 0 && (
            <span className="ml-2 normal-case tracking-normal text-[#7c3aed]">[{toolsUsed.join(', ')}]</span>
          )}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-2 pl-4 border-l-2 border-[rgba(124,58,237,0.15)]">
          {trace.map((t, i) => {
            // ── Thought entry ─────────────────────────────────────────────────
            if (t.type === 'thought') {
              return (
                <div key={i} className="flex items-start gap-2 py-1.5 pl-2 border-l-2 border-[rgba(168,85,247,0.4)] bg-[rgba(168,85,247,0.04)] rounded-r-md pr-3">
                  <span className="shrink-0 mt-0.5"><SparkleIcon size={12} /></span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-[#a855f7] font-semibold mb-1">
                      Thought · step {t.step}
                    </p>
                    <p className="font-mono text-[0.7rem] text-[#374151] leading-[1.7] italic">{t.summary}</p>
                  </div>
                </div>
              )
            }

            // ── Synthesize entry ──────────────────────────────────────────────
            if (t.type === 'synthesize') {
              return (
                <div key={i} className="flex items-start gap-2 py-1.5 pl-2 border-l-2 border-emerald-400 bg-emerald-50/30 rounded-r-md pr-3">
                  <span className="font-mono text-[0.6rem] text-[#9ca3af] mt-0.5 shrink-0 w-8">#{t.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[0.7rem] font-semibold text-emerald-700">✓ Final synthesis</p>
                    <p className="font-mono text-[0.62rem] text-[#6e6e73] mt-0.5">{t.summary}</p>
                  </div>
                </div>
              )
            }

            // ── Tool entry ────────────────────────────────────────────────────
            const statusColor =
              t.status === 'ok'        ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
              t.status === 'not_found' ? 'text-amber-700  bg-amber-50  border-amber-200'   :
                                         'text-red-700    bg-red-50    border-red-200'
            return (
              <div key={i} className="flex items-start gap-2 py-1.5">
                <span className="font-mono text-[0.6rem] text-[#9ca3af] mt-0.5 shrink-0 w-8">#{t.step}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[0.7rem] font-medium text-[#1d1d1f]">{t.tool}</span>
                    <span className="font-mono text-[0.62rem] text-[#9ca3af]">
                      ({Object.entries(t.args || {}).map(([k,v]) => `${k}=${JSON.stringify(v)}`).join(', ')})
                    </span>
                    <span className={`font-mono text-[0.55rem] font-semibold uppercase tracking-wider border px-1.5 py-0.5 rounded ${statusColor}`}>
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

function CitationList({ citations }) {
  const [open, setOpen] = useState(false)
  if (!citations || citations.length === 0) return null
  return (
    <div>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 w-full text-left group mb-2">
        <span className={`text-[#9ca3af] transition-transform ${open ? 'rotate-90' : ''}`}><ArrowIcon /></span>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] group-hover:text-[#7c3aed] transition-colors">
          Sources · {citations.length}
        </p>
      </button>
      {open && (
      <div className="space-y-2">
        {citations.map((c, i) => {
          const icon = SOURCE_ICON[c.source] || <StarIcon />
          const Body = (
            <>
              <span className="text-[#7c3aed] shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f] leading-tight">
                  {c.source}{c.cid && <span className="text-[#9ca3af] font-normal"> · CID {c.cid}</span>}
                </p>
                <p className="font-mono text-[0.6rem] text-[#6e6e73] mt-0.5">
                  {c.accessed && <>accessed {c.accessed}</>}
                  {c.note    && <>{c.note}</>}
                </p>
              </div>
              {c.url && <span className="text-[#9ca3af] text-[0.6rem] shrink-0">↗</span>}
            </>
          )
          return c.url ? (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/[0.06]
                hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.025)] transition-all">
              {Body}
            </a>
          ) : (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/[0.06]">{Body}</div>
          )
        })}
      </div>
      )}
    </div>
  )
}

const cardShadow = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'saturate(180%) blur(48px)',
  boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 24px 48px rgba(124,58,237,0.08)',
}

// ═══════════════════════════════════════════════════════════════════════════════
//  LOOKUP — MoleculeCard
// ═══════════════════════════════════════════════════════════════════════════════

function MoleculeCard({ data }) {
  return (
    <div className="rounded-2xl border border-white/90 overflow-hidden" style={cardShadow}>
      <div className="flex items-center gap-2 px-6 py-3 border-b border-black/[0.06] bg-black/[0.015]">
        <SearchIcon size={13} />
        <span className="font-mono text-[0.78rem] text-[#6e6e73]">{data.name}</span>
        <span className="ml-auto font-mono text-[0.65rem] text-[#9ca3af]">PubChem CID {data.cid}</span>
      </div>

      <div className="p-6">
        <div className="flex gap-5 mb-5">
          <div className="shrink-0">
            <StructureViewer cid={data.cid} smiles={data.smiles} name={data.name} size={180} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] mb-3">{data.name}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {data.formula          && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">Formula</p><p className="font-mono text-[0.75rem] font-medium">{data.formula}</p></div>}
              {data.molecular_weight && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">MW</p><p className="font-mono text-[0.75rem] font-medium">{data.molecular_weight}</p></div>}
              {data.cas              && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">CAS</p><p className="font-mono text-[0.75rem] font-medium">{data.cas}</p></div>}
            </div>

            {data.iupac_name && (
              <div className="mb-3">
                <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">IUPAC Name</p>
                <p className="font-mono text-[0.78rem] text-[#1d1d1f] leading-snug">{data.iupac_name}</p>
              </div>
            )}
            {data.smiles && (
              <div className="mb-3">
                <p className="text-[0.6rem] font-medium uppercase tracking-wider text-[#9ca3af] mb-1">SMILES</p>
                <p className="font-mono text-[0.72rem] text-[#374151] break-all bg-black/[0.03] rounded-lg px-3 py-2 border border-black/[0.06]">{data.smiles}</p>
              </div>
            )}
            <a href={data.source.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(124,58,237,0.05)] border border-[rgba(124,58,237,0.12)] hover:bg-[rgba(124,58,237,0.09)] transition-colors">
              <StarIcon />
              <span className="font-mono text-[0.67rem] text-[#7c3aed]">PubChem · CID {data.source.cid} · accessed {data.source.accessed}</span>
            </a>
          </div>
        </div>

        {data.synonyms?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06]">
            <span className="font-mono text-[0.65rem] text-[#9ca3af] self-center mr-1">Also known as:</span>
            {data.synonyms.slice(0, 4).map(s => (
              <span key={s} className="font-mono text-[0.65rem] text-[#6e6e73] bg-black/[0.04] border border-black/[0.07] px-2.5 py-1 rounded-md">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ASK — AgentAnswer
// ═══════════════════════════════════════════════════════════════════════════════

function PipelineRail({ toolsUsed, iterations }) {
  const tools = [
    { name: 'PubChem',   key: 'pubchem'   },
    { name: 'Catalog',   key: 'catalog'   },
    { name: 'Wikipedia', key: 'wikipedia' },
  ]
  const isActive = (key) => (toolsUsed || []).some(t => t.toLowerCase().includes(key))

  return (
    <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mr-1">Reasoner</span>
      <span className="flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] text-[#7c3aed]">
        ↻ {iterations || 1} step{(iterations || 1) === 1 ? '' : 's'}
      </span>
      <span className="text-[#d4d4d8]"><ArrowIcon /></span>
      {tools.map(t => {
        const active = isActive(t.key)
        return (
          <span key={t.key} className={`flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full border transition-all
            ${active ? 'bg-[rgba(124,58,237,0.08)] border-[rgba(124,58,237,0.25)] text-[#7c3aed]' : 'bg-black/[0.025] border-black/[0.06] text-[#c4c4c4]'}`}>
            {active && <span className="text-[#7c3aed]"><CheckIcon size={9} /></span>}
            {t.name}
          </span>
        )
      })}
      <span className="text-[#d4d4d8]"><ArrowIcon /></span>
      <span className="flex items-center gap-1 font-mono text-[0.65rem] px-2 py-0.5 rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] text-[#7c3aed]">
        <CheckIcon size={9} /> Answer
      </span>
    </div>
  )
}

function KeyFacts({ facts }) {
  if (!facts) return null
  const tiles = [
    { label: 'Formula',     value: facts.formula },
    { label: 'MW (g/mol)',  value: facts.molecular_weight },
    { label: 'CAS',         value: facts.cas },
    { label: 'PubChem CID', value: facts.cid },
  ].filter(t => t.value)
  if (tiles.length === 0) return null

  return (
    <div className="px-7 py-5 border-b border-black/[0.05]">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-3">Key facts</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {tiles.map(t => (
          <div key={t.label} className="rounded-xl p-3 border border-[rgba(124,58,237,0.12)] bg-gradient-to-br from-[rgba(124,58,237,0.04)] to-white">
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
    <div className="rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 to-white p-4 hover:border-emerald-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-700 mb-1"><BoxIcon size={11} /><span className="font-mono text-[0.6rem] font-semibold uppercase tracking-wider">In stock</span></div>
          <p className="font-mono text-[0.82rem] font-semibold text-[#1d1d1f]">{row.sku}</p>
          <p className="font-mono text-[0.65rem] text-[#6e6e73] mt-0.5">{row.supplier}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[1.1rem] font-semibold text-[#1d1d1f]">${row.price_usd}</p>
          <p className="font-mono text-[0.6rem] text-[#9ca3af] mt-0.5">{row.pack_size}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-100">
        <div><p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Grade</p><p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f]">{row.grade}</p></div>
        <div><p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Stock</p><p className="font-mono text-[0.72rem] font-medium text-emerald-700">{row.stock_units} units</p></div>
        <div><p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-0.5">Lead time</p><p className="font-mono text-[0.72rem] font-medium text-[#1d1d1f]">{row.lead_time_days}d</p></div>
      </div>
    </div>
  )
}

function AgentAnswer({ data }) {
  const style = INTENT_STYLE[data.intent] || INTENT_STYLE.general
  return (
    <div>
      <PipelineRail toolsUsed={data.tools_used} iterations={data.iterations} />
      <div className="rounded-2xl border border-white/90 overflow-hidden" style={cardShadow}>
        <div className="px-7 pt-6 pb-5 border-b border-black/[0.05] bg-gradient-to-br from-[rgba(124,58,237,0.04)] to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.text }}>{style.label}</span>
            {data.has_catalog_data && (
              <span className="font-mono text-[0.6rem] font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckIcon size={8} /> In catalog
              </span>
            )}
            <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">ReAct · {data.iterations || 1} step{(data.iterations || 1) === 1 ? '' : 's'}</span>
          </div>
          <h2 className="font-mono text-[1.55rem] font-semibold tracking-tight text-[#1d1d1f] capitalize leading-tight">{data.molecule_name}</h2>
        </div>

        <KeyFacts facts={data.pubchem_facts} />

        <div className="px-7 py-6">
          <div className="flex gap-3 items-start">
            <span className="shrink-0 mt-0.5"><SparkleIcon size={20} /></span>
            <div className="flex-1">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2">Synthesized answer</p>
              <p className="font-mono text-[0.82rem] text-[#1d1d1f] leading-[1.95] tracking-[0.005em]">{data.answer}</p>
            </div>
          </div>
        </div>

        {data.catalog_rows?.length > 0 && (
          <div className="px-7 pb-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2.5">Catalog hit</p>
            <div className="space-y-2.5">
              {data.catalog_rows.slice(0, 2).map((row, i) => <ProductCard key={i} row={row} />)}
            </div>
          </div>
        )}

        <AgentTrace trace={data.trace} iterations={data.iterations} toolsUsed={data.tools_used} />

        {data.citations?.length > 0 && (
          <div className="px-7 pb-6 pt-2 border-t border-black/[0.05]">
            <CitationList citations={data.citations} />
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SAFETY — SafetyBriefing
// ═══════════════════════════════════════════════════════════════════════════════

// ── Brief card — modern card with accent strip ───────────────────────────────

function BriefingCard({ title, label, items, color, glyph }) {
  if (!items || items.length === 0) return null
  return (
    <div className="relative rounded-2xl bg-white overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5
      border border-black/[0.06]">
      {/* Top accent strip */}
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: color }} />

      <div className="p-5 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.15rem] shrink-0"
            style={{ background: color + '14', color }}>
            {glyph}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] font-bold" style={{ color }}>
              {label}
            </p>
            <p className="font-mono text-[0.82rem] font-semibold text-[#1d1d1f] leading-tight mt-0.5">{title}</p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2.5 font-mono text-[0.74rem] text-[#374151] leading-[1.65]">
              <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Expandable H-code / P-code list ──────────────────────────────────────────

function StatementList({ statements, title, accent, type = 'H' }) {
  const [expanded, setExpanded] = useState(false)
  if (!statements || statements.length === 0) return null

  const visible = expanded ? statements : statements.slice(0, 2)
  const hidden  = statements.length - visible.length

  const codeStyle = type === 'H'
    ? 'text-red-700 bg-white border-red-200'
    : 'text-blue-700 bg-white border-blue-200'
  const cardStyle = type === 'H'
    ? 'bg-red-50/40 border-red-100'
    : 'bg-blue-50/40 border-blue-100'

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af]">
          {title} · {statements.length}
        </p>
      </div>
      <div className="space-y-1.5">
        {visible.map((h, i) => (
          <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg border ${cardStyle}`}>
            <span className={`font-mono text-[0.65rem] font-bold px-1.5 py-0.5 rounded border shrink-0 ${codeStyle}`}>
              {h.code}
            </span>
            <span className="font-mono text-[0.75rem] text-[#1d1d1f] leading-snug">{h.text}</span>
          </div>
        ))}
      </div>
      {hidden > 0 && (
        <button onClick={() => setExpanded(true)}
          className="mt-2 font-mono text-[0.65rem] font-medium text-[#7c3aed]
            hover:bg-[rgba(124,58,237,0.05)] px-2 py-1 rounded transition-colors">
          Show {hidden} more →
        </button>
      )}
      {expanded && statements.length > 2 && (
        <button onClick={() => setExpanded(false)}
          className="mt-2 ml-2 font-mono text-[0.65rem] font-medium text-[#9ca3af]
            hover:text-[#1d1d1f] px-2 py-1 rounded transition-colors">
          Show less
        </button>
      )}
    </div>
  )
}

// ── Lethal dose table (LD50 / LC50 with species + route) ─────────────────────

function LethalDoseTable({ doses }) {
  if (!doses || doses.length === 0) return null
  return (
    <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/40 to-white overflow-hidden">
      <div className="px-5 py-3 border-b border-red-100 bg-red-50/50 flex items-center gap-2">
        <span className="text-red-700">☠</span>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] font-bold text-red-700">
          Lethal doses · {doses.length} value{doses.length === 1 ? '' : 's'}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/70">
            <tr>
              {['Type', 'Species', 'Route', 'Value'].map(h => (
                <th key={h} className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] text-left px-5 py-2 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doses.map((d, i) => (
              <tr key={i} className="border-t border-red-100/50 hover:bg-red-50/30 transition-colors">
                <td className="px-5 py-2.5 font-mono text-[0.72rem] font-bold text-red-700">{d.type}</td>
                <td className="px-5 py-2.5 font-mono text-[0.72rem] text-[#1d1d1f] capitalize">{d.species}</td>
                <td className="px-5 py-2.5 font-mono text-[0.72rem] text-[#1d1d1f] capitalize">{d.route}</td>
                <td className="px-5 py-2.5 font-mono text-[0.72rem]">
                  <span className="font-semibold text-[#1d1d1f]">{d.value}</span>
                  <span className="text-[#6e6e73] ml-1">{d.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-2 bg-white/50 border-t border-red-100">
        <p className="font-mono text-[0.6rem] text-[#9ca3af] italic">Source: PubChem Toxicity · extracted by agent</p>
      </div>
    </div>
  )
}

// ── Conflict alert (PubChem vs Catalog mismatch) ─────────────────────────────

function ConflictAlerts({ conflicts }) {
  if (!conflicts || conflicts.length === 0) return null
  return (
    <div className="space-y-2.5">
      {conflicts.map((c, i) => {
        const danger = c.severity === 'danger'
        return (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border-2 ${
            danger ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <span className={`shrink-0 mt-0.5 ${danger ? 'text-red-600' : 'text-amber-600'}`}>
              <AlertIcon size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <p className={`font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] mb-1.5 ${
                danger ? 'text-red-700' : 'text-amber-700'
              }`}>
                Data conflict detected · {c.field}
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-white/70 px-3 py-1.5 border border-black/[0.06]">
                  <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af]">PubChem</p>
                  <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f]">{c.pubchem_value}</p>
                </div>
                <span className="font-mono text-[1rem] text-[#9ca3af]">≠</span>
                <div className="rounded-lg bg-white/70 px-3 py-1.5 border border-black/[0.06]">
                  <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af]">Catalog</p>
                  <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f]">{c.catalog_value}</p>
                </div>
              </div>
              <p className="font-mono text-[0.7rem] text-[#374151] leading-snug">{c.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SafetyBriefing({ data }) {
  const risk = RISK_STYLE[data.briefing?.risk_level || 'unknown']
  const signalClass = data.signal_word ? SIGNAL_STYLE[data.signal_word] : null

  return (
    <div>
      <PipelineRail toolsUsed={data.tools_used} iterations={data.iterations} />

      <div className="rounded-2xl border border-white/90 overflow-hidden" style={cardShadow}>
        {/* Hero */}
        <div className="px-7 pt-6 pb-5 border-b border-black/[0.05] bg-gradient-to-br from-red-50/60 to-transparent">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border ${risk.bg} ${risk.border} ${risk.text}`}>
              {risk.label}
            </span>
            {signalClass && (
              <span className={`font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border ${signalClass} flex items-center gap-1`}>
                <AlertIcon size={10} /> {data.signal_word}
              </span>
            )}
            {data.catalog_rows?.length > 0 && (
              <span className="font-mono text-[0.6rem] font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckIcon size={8} /> In catalog
              </span>
            )}
            <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">ReAct · {data.iterations || 0} step{(data.iterations || 0) === 1 ? '' : 's'}</span>
          </div>
          <h2 className="font-mono text-[1.55rem] font-semibold tracking-tight text-[#1d1d1f] capitalize leading-tight mb-2">{data.molecule_name}</h2>
          {data.briefing?.summary && (
            <p className="font-mono text-[0.85rem] text-[#374151] leading-[1.7] tracking-[0.005em]">{data.briefing.summary}</p>
          )}
        </div>

        {/* Identity + 2D/3D structure */}
        {data.cid && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <div className="flex gap-5 items-start">
              <StructureViewer cid={data.cid} smiles={data.smiles} name={data.molecule_name} size={180} />
              <div className="flex-1 grid grid-cols-2 gap-3">
                {data.formula          && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">Formula</p><p className="font-mono text-[0.82rem] font-semibold">{data.formula}</p></div>}
                {data.molecular_weight && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">MW</p><p className="font-mono text-[0.82rem] font-semibold">{data.molecular_weight}</p></div>}
                {data.cas              && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">CAS</p><p className="font-mono text-[0.82rem] font-semibold">{data.cas}</p></div>}
                {data.cid              && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">PubChem CID</p><p className="font-mono text-[0.82rem] font-semibold">{data.cid}</p></div>}
                {data.smiles           && <div className="col-span-2"><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">SMILES</p><p className="font-mono text-[0.7rem] text-[#374151] break-all">{data.smiles}</p></div>}
              </div>
            </div>
          </div>
        )}

        {/* GHS pictograms */}
        {data.pictograms?.length > 0 && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-4">GHS pictograms</p>
            <div className="flex gap-4 flex-wrap">
              {data.pictograms.map(p => <GhsPictogram key={p.code} code={p.code} label={p.label} />)}
            </div>
          </div>
        )}

        {/* Hazard + Precautionary statements (H + P codes) */}
        {(data.hazard_statements?.length > 0 || data.precautionary_statements?.length > 0) && (
          <div className="px-7 py-5 border-b border-black/[0.05] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <StatementList
              statements={data.hazard_statements}
              title="Hazard statements (H-codes)"
              type="H"
            />
            <StatementList
              statements={data.precautionary_statements}
              title="Precautionary statements (P-codes)"
              type="P"
            />
          </div>
        )}

        {/* Conflict alerts (top — most important) */}
        {data.conflicts?.length > 0 && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <ConflictAlerts conflicts={data.conflicts} />
          </div>
        )}

        {/* Synthesized briefing — card grid (Firefly-style) */}
        <div className="px-7 py-5 border-b border-black/[0.05] bg-gradient-to-b from-[rgba(124,58,237,0.02)] to-transparent">
          <div className="flex items-center gap-2 mb-4">
            <SparkleIcon size={14} />
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af]">
              Synthesized briefing · agent output
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <BriefingCard label="PPE"            title="Personal protection"  items={data.briefing?.ppe}            color="#7c3aed" glyph="🦺" />
            <BriefingCard label="First aid"      title="Emergency response"   items={data.briefing?.first_aid}      color="#dc2626" glyph="🚑" />
            <BriefingCard label="Storage"        title="Handling & storage"   items={data.briefing?.storage}        color="#2563eb" glyph="🧊" />
            <BriefingCard label="Spill response" title="Containment"          items={data.briefing?.spill_response} color="#059669" glyph="🧹" />
            <BriefingCard label="Transport"      title="DOT / UN shipping"    items={data.briefing?.transport}      color="#0891b2" glyph="🚛" />
            <BriefingCard label="Regulatory"     title="EPA / OSHA / REACH"   items={data.briefing?.regulatory}     color="#9333ea" glyph="📋" />
          </div>
        </div>

        {/* Lethal doses */}
        {data.lethal_doses?.length > 0 && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <LethalDoseTable doses={data.lethal_doses} />
          </div>
        )}

        {/* Catalog hit */}
        {data.catalog_rows?.length > 0 && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-3">Available in catalog</p>
            <div className="space-y-2.5">
              {data.catalog_rows.slice(0, 2).map((row, i) => <ProductCard key={i} row={row} />)}
            </div>
          </div>
        )}

        {/* Agent reasoning */}
        <AgentTrace trace={data.trace} iterations={data.iterations} toolsUsed={data.tools_used} />

        {/* Authoritative source data — collapsed by default */}
        {data.pubchem_sections?.length > 0 && (
          <AuthoritativeSection sections={data.pubchem_sections} />
        )}

        {data.citations?.length > 0 && (
          <div className="px-7 pb-6 pt-5 border-t border-black/[0.05]">
            <CitationList citations={data.citations} />
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPARE — CompareView
// ═══════════════════════════════════════════════════════════════════════════════

function ComparisonColumn({ c }) {
  return (
    <div className="rounded-xl border border-black/[0.07] bg-white/70 p-4">
      <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] capitalize mb-2">{c.name}</p>
      {!c.found && (
        <p className="font-mono text-[0.7rem] text-red-600">Not found in PubChem</p>
      )}
      {c.found && (
        <>
          <StructureViewer cid={c.cid} smiles={c.smiles} name={c.name} size={140} />
          <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
            {c.formula           && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">Formula</p><p className="font-mono text-[0.72rem] font-semibold">{c.formula}</p></div>}
            {c.molecular_weight  && <div><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">MW</p><p className="font-mono text-[0.72rem] font-semibold">{c.molecular_weight}</p></div>}
            {c.cas               && <div className="col-span-2"><p className="font-mono text-[0.55rem] uppercase text-[#9ca3af]">CAS</p><p className="font-mono text-[0.72rem] font-semibold">{c.cas}</p></div>}
          </div>

          <div className="space-y-1.5 mb-3">
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af]">Hazards</p>
            {c.pictograms?.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {c.pictograms.map(p => (
                  <span key={p.code} className="font-mono text-[0.55rem] font-semibold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                    {p.code}
                  </span>
                ))}
              </div>
            ) : (
              <p className="font-mono text-[0.65rem] text-emerald-700">No GHS hazards listed</p>
            )}
            {c.signal_word && (
              <p className={`font-mono text-[0.62rem] inline-block px-1.5 py-0.5 rounded border ${SIGNAL_STYLE[c.signal_word] || ''}`}>
                {c.signal_word}
              </p>
            )}
            <p className="font-mono text-[0.6rem] text-[#6e6e73]">{c.hazard_count} H-code{c.hazard_count === 1 ? '' : 's'}</p>
          </div>

          <div className="pt-2 border-t border-black/[0.05]">
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">Catalog</p>
            {c.in_catalog ? (
              <>
                <p className="font-mono text-[0.85rem] font-semibold text-[#1d1d1f]">${c.catalog_price_usd}</p>
                <p className="font-mono text-[0.62rem] text-[#6e6e73]">{c.catalog_sku} · {c.catalog_pack_size}</p>
                <p className="font-mono text-[0.62rem] text-emerald-700 mt-0.5">{c.catalog_stock} units · {c.catalog_lead_time}d lead</p>
              </>
            ) : (
              <p className="font-mono text-[0.7rem] text-amber-700">Not in catalog</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function CompareView({ data }) {
  return (
    <div>
      <PipelineRail toolsUsed={data.tools_used} iterations={data.iterations} />

      <div className="rounded-2xl border border-white/90 overflow-hidden" style={cardShadow}>
        <div className="px-7 pt-6 pb-5 border-b border-black/[0.05] bg-gradient-to-br from-[rgba(124,58,237,0.04)] to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] text-[#7c3aed]">Comparison</span>
            <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">ReAct · {data.iterations || 0} step{(data.iterations || 0) === 1 ? '' : 's'}</span>
          </div>
          <h2 className="font-mono text-[1.3rem] font-semibold tracking-tight text-[#1d1d1f] leading-tight">
            {data.compounds.map(c => c.name).join(' · ')}
          </h2>
        </div>

        {/* Conflicts */}
        {data.conflicts?.length > 0 && (
          <div className="px-7 py-4 border-b border-black/[0.05]">
            {data.conflicts.map((c, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${c.severity === 'danger' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <span className="shrink-0 mt-0.5"><AlertIcon /></span>
                <div>
                  <p className="font-mono text-[0.62rem] font-bold uppercase tracking-wider mb-0.5">{c.severity} · {c.type.replace(/_/g, ' ')}</p>
                  <p className="font-mono text-[0.75rem] leading-snug">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Side-by-side */}
        <div className="px-7 py-5 border-b border-black/[0.05]">
          <div className={`grid gap-3 ${data.compounds.length === 2 ? 'grid-cols-1 md:grid-cols-2' : data.compounds.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
            {data.compounds.map((c, i) => <ComparisonColumn key={i} c={c} />)}
          </div>
        </div>

        {/* Recommendation */}
        {data.recommendation && (
          <div className="px-7 py-5 border-b border-black/[0.05]">
            <div className="flex gap-3 items-start">
              <span className="shrink-0 mt-0.5"><SparkleIcon size={20} /></span>
              <div className="flex-1">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-2">Agent recommendation</p>
                <p className="font-mono text-[0.82rem] text-[#1d1d1f] leading-[1.95] tracking-[0.005em]">{data.recommendation}</p>
              </div>
            </div>
          </div>
        )}

        <AgentTrace trace={data.trace} iterations={data.iterations} toolsUsed={data.tools_used} />

        {data.citations?.length > 0 && (
          <div className="px-7 pb-6 pt-2 border-t border-black/[0.05]">
            <CitationList citations={data.citations} />
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PROCURE — ProcureView
// ═══════════════════════════════════════════════════════════════════════════════

function ProcureView({ data }) {
  return (
    <div>
      <PipelineRail toolsUsed={data.tools_used} iterations={data.iterations} />

      <div className="rounded-2xl border border-white/90 overflow-hidden" style={cardShadow}>
        {/* Summary */}
        <div className="px-7 pt-6 pb-5 border-b border-black/[0.05] bg-gradient-to-br from-emerald-50/40 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-700">Procurement quote</span>
            <span className="ml-auto font-mono text-[0.6rem] text-[#9ca3af] uppercase tracking-wider">ReAct · {data.iterations || 0} step{(data.iterations || 0) === 1 ? '' : 's'}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">Total cost</p>
              <p className="font-mono text-[1.4rem] font-semibold text-[#1d1d1f]">${data.total_cost_usd?.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">Max lead time</p>
              <p className="font-mono text-[1.4rem] font-semibold text-[#1d1d1f]">{data.max_lead_time_days}d</p>
            </div>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">In stock</p>
              <p className="font-mono text-[1.4rem] font-semibold text-emerald-700">{data.in_stock_count}</p>
            </div>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[#9ca3af] mb-1">Not available</p>
              <p className="font-mono text-[1.4rem] font-semibold text-amber-700">{data.not_available_count}</p>
            </div>
          </div>
          {data.notes && (
            <p className="mt-4 font-mono text-[0.72rem] text-[#6e6e73] italic leading-snug">→ {data.notes}</p>
          )}
        </div>

        {/* Line items */}
        <div className="px-7 py-5 border-b border-black/[0.05]">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#9ca3af] mb-3">Order line items</p>
          <div className="space-y-2">
            {data.items?.map((it, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${it.available ? 'bg-white border-black/[0.07]' : 'bg-amber-50/40 border-amber-200'}`}>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f] capitalize">{it.matched_name || it.query}</p>
                  {it.available ? (
                    <p className="font-mono text-[0.6rem] text-[#6e6e73] mt-0.5">{it.sku} · {it.grade} · {it.pack_size} · {it.supplier}</p>
                  ) : (
                    <p className="font-mono text-[0.65rem] text-amber-700 mt-0.5">
                      Not in catalog{it.alternative_suggestion && <> · alternative: <strong>{it.alternative_suggestion}</strong></>}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-[0.78rem] font-semibold text-[#1d1d1f]">
                    {it.available ? `$${(it.line_cost_usd || 0).toFixed(2)}` : '—'}
                  </p>
                  <p className="font-mono text-[0.6rem] text-[#9ca3af]">
                    qty {it.quantity}{it.available && it.unit_price_usd ? ` × $${it.unit_price_usd.toFixed(2)}` : ''}
                  </p>
                  {it.available && (
                    <p className="font-mono text-[0.6rem] text-emerald-700 mt-0.5">{it.stock_units} units · {it.lead_time_days}d</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AgentTrace trace={data.trace} iterations={data.iterations} toolsUsed={data.tools_used} />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [query, setQuery] = useState('')
  const [mode, setMode]   = useState('lookup')

  const lookup  = useMolecule()
  const ask     = useAsk()
  const safety  = useSafety()
  const compare = useCompare()
  const procure = useProcure()

  const modeState = { lookup, ask, safety, compare, procure }[mode]
  const { data, loading, error } = modeState

  const handleModeSwitch = (newMode) => {
    setMode(newMode)
    setQuery('')
    Object.values({ lookup, ask, safety, compare, procure }).forEach(s => s.reset())
  }

  const parseProcureItems = (raw) => {
    return raw.split(',').map(s => {
      const m = s.trim().match(/^(.+?)\s*[xX]\s*(\d+)$/)
      if (m) return { name: m[1].trim(), quantity: parseInt(m[2], 10) }
      return { name: s.trim(), quantity: 1 }
    }).filter(it => it.name)
  }

  const runQuery = (raw) => {
    const v = raw.trim()
    if (!v) return
    if      (mode === 'lookup')  lookup.search(v)
    else if (mode === 'ask')     ask.ask(v)
    else if (mode === 'safety')  safety.brief(v)
    else if (mode === 'compare') compare.compare(v.split(',').map(s => s.trim()).filter(Boolean))
    else if (mode === 'procure') procure.procure(parseProcureItems(v))
  }

  const handleSubmit = (e) => { e.preventDefault(); runQuery(query) }
  const handleSuggestion = (text) => { setQuery(text); runQuery(text) }

  const suggestions = SUGGESTIONS[mode]
  const placeholder = PLACEHOLDERS[mode]
  const ModeIcon    = MODES.find(m => m.key === mode)?.Icon || SearchIcon

  return (
    <div className="min-h-screen bg-[#f5f5f7] relative overflow-hidden font-sans">
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse 900px 600px at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(ellipse 600px 500px at 80% 90%, rgba(124,58,237,0.04) 0%, transparent 60%)'
      }} />

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

      <main className="relative z-10 max-w-[860px] mx-auto px-6 pt-[110px] pb-24">

        {/* Hero */}
        <div className="text-center mb-10 animate-rise-1">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.18)]">
            <BulbIcon />
            <span className="font-mono text-[0.68rem] font-medium text-[#7c3aed] tracking-wider uppercase">
              <span className="font-bold">E</span>ngineered <span className="font-bold">C</span>uriosity
            </span>
          </div>
          <h1 className="font-mono text-[clamp(2.6rem,5.5vw,3.8rem)] font-semibold tracking-[-0.045em] leading-none text-[#1d1d1f] mb-4">
            Ask. Verify. <span className="text-[#7c3aed]">Trust.</span>
          </h1>
          <p className="text-[0.95rem] font-light text-[#6e6e73] max-w-[560px] mx-auto leading-relaxed">
            An agentic chemistry assistant — every claim cited to <strong className="font-medium text-[#1d1d1f]">PubChem</strong>, internal catalog, or Wikipedia.
            No hallucinations. No guessing.
          </p>
        </div>

        {/* 5-mode nav */}
        <div className="flex justify-center mb-5 animate-rise-1">
          <div className="inline-flex items-center gap-0.5 rounded-full p-1 bg-black/[0.04] border border-black/[0.07] flex-wrap justify-center max-w-full">
            {MODES.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => handleModeSwitch(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-mono font-medium transition-all duration-200
                  ${mode === key
                    ? 'bg-white text-[#1d1d1f] shadow-sm border border-black/[0.07]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="animate-rise-2 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 w-full rounded-2xl px-5 py-4 transition-all duration-200 border"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(40px)',
                border: query ? '1.5px solid rgba(124,58,237,0.5)' : '1.5px solid rgba(0,0,0,0.09)',
                boxShadow: query ? '0 0 0 4px rgba(124,58,237,0.08), 0 8px 24px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.05)',
              }}>
              <span className="text-[#9ca3af] shrink-0">{loading ? <Spinner /> : <ModeIcon size={15} />}</span>
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none font-mono text-[0.85rem] text-[#1d1d1f] placeholder:text-[#9ca3af]"
                autoFocus disabled={loading}
              />
              {query && !loading && (
                <button type="submit" className="font-mono text-[0.7rem] font-medium text-[#7c3aed] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] px-3 py-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.15)] transition-colors">
                  {mode === 'compare' ? 'Compare' : mode === 'procure' ? 'Quote' : mode === 'safety' ? 'Brief' : mode === 'ask' ? 'Ask' : 'Search'}
                </button>
              )}
              {!query && (
                <span className="ml-auto font-mono text-[0.65rem] text-[#c4c4c4] border border-[#e5e5e5] rounded px-1.5 py-0.5 shrink-0">Enter ↵</span>
              )}
            </div>
          </form>
        </div>

        {/* Suggestions */}
        {!data && !loading && (
          <div className="flex flex-wrap gap-2 justify-center mb-12 animate-rise-2">
            {suggestions.map(p => (
              <button key={p} onClick={() => handleSuggestion(p)}
                className="font-mono text-[0.7rem] text-[#6e6e73] bg-white/70 border border-black/[0.07] px-3 py-1.5 rounded-full hover:border-[rgba(124,58,237,0.4)] hover:text-[#7c3aed] transition-all duration-150 cursor-pointer">
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 animate-rise-2">
            <Spinner />
            <p className="font-mono text-[0.78rem] text-[#9ca3af]">{LOADING_MSG[mode]}</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-100 bg-red-50/80 px-6 py-5 mb-4 animate-rise-2">
            <p className="font-mono text-[0.82rem] text-red-600">{error}</p>
          </div>
        )}

        {/* Result */}
        {data && !loading && (
          <div className="animate-rise-2 mb-4">
            {mode === 'lookup'  && <MoleculeCard   data={data} />}
            {mode === 'ask'     && <AgentAnswer    data={data} />}
            {mode === 'safety'  && <SafetyBriefing data={data} />}
            {mode === 'compare' && <CompareView    data={data} />}
            {mode === 'procure' && <ProcureView    data={data} />}
          </div>
        )}

        {!loading && (
          <div className="text-center py-4">
            <p className="font-mono text-[0.7rem] text-[#9ca3af] tracking-wider">
              EVERY ANSWER IS TRACEABLE TO A SOURCE · NO HALLUCINATIONS
            </p>
          </div>
        )}

        <footer className="mt-10 pt-8 border-t border-black/[0.07] flex items-center justify-between animate-rise-4">
          <div>
            <p className="text-[0.85rem] font-medium text-[#1d1d1f]">Sindhuja Sivaraman</p>
            <p className="text-[0.75rem] text-[#6e6e73] mt-0.5">Senior Engineer · AI/ML</p>
          </div>
          <a href="https://coding-chemist.vercel.app" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.72rem] font-medium text-[#7c3aed] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.18)] px-4 py-2 rounded-[10px] hover:bg-[rgba(124,58,237,0.16)] hover:border-[rgba(124,58,237,0.4)] transition-all duration-200">
            coding-chemist ↗
          </a>
        </footer>

      </main>
    </div>
  )
}
