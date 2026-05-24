import { useState } from 'react'

const MULTS_1H  = ['s', 'd', 't', 'q', 'p', 'm', 'dd', 'dt', 'td', 'ddd', 'qd', 'br']
const MULTS_13C = ['s', 'd', 't', 'q', 'm']
const ALL_MULTS = ['s','d','t','q','p','h','m','br','dd','dt','td','ddd','qd']

const CAFFEINE_1H = [
  { shift: '3.40', mult: 's' },
  { shift: '3.57', mult: 's' },
  { shift: '4.00', mult: 's' },
  { shift: '7.53', mult: 's' },
]
const CAFFEINE_13C = [
  { shift: '27.9',  mult: 'q' },
  { shift: '29.6',  mult: 'q' },
  { shift: '33.4',  mult: 'q' },
  { shift: '107.6', mult: 's' },
  { shift: '148.5', mult: 's' },
  { shift: '151.2', mult: 's' },
  { shift: '155.1', mult: 's' },
  { shift: '163.8', mult: 's' },
]

function empty() { return { shift: '', mult: 's' } }

// Parse free-text peak list.
// Accepts: "2.37 s", "2.37, s", "| 2.37 | s |", "2.37 (s, 3H)", etc.
// One peak per line; lines without a number are skipped.
function parsePasted(text) {
  return text
    .split('\n')
    .map(l => l.replace(/[|()]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(l => /\d/.test(l))
    .map(l => {
      const tokens = l.split(/[\s,]+/)
      const shiftStr = tokens.find(t => /^\d+\.?\d*$/.test(t))
      if (!shiftStr) return null
      const mult = tokens.find(t => ALL_MULTS.includes(t.toLowerCase()))
      return { shift: shiftStr, mult: mult ? mult.toLowerCase() : 's' }
    })
    .filter(Boolean)
}

function PeakTable({ label, peaks, onChange, mults }) {
  const [pasting, setPasting] = useState(false)
  const [raw, setRaw] = useState('')

  const add    = () => onChange([...peaks, empty()])
  const remove = (i) => onChange(peaks.filter((_, j) => j !== i))
  const update = (i, field, val) => {
    const next = [...peaks]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }

  function applyPaste() {
    const parsed = parsePasted(raw)
    if (parsed.length > 0) onChange(parsed)
    setRaw('')
    setPasting(false)
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[0.68rem] font-semibold text-[#1d1d1f] uppercase tracking-widest">
          {label}
        </span>
        <div className="flex gap-2">
          {!pasting && (
            <button
              type="button"
              onClick={() => { setRaw(''); setPasting(true) }}
              className="font-mono text-[0.65rem] text-[#9ca3af] hover:text-[#7c3aed] transition-colors"
            >
              paste
            </button>
          )}
          {!pasting && (
            <button
              type="button"
              onClick={add}
              className="font-mono text-[0.65rem] text-[#7c3aed] hover:text-[#6d28d9] transition-colors"
            >
              + add
            </button>
          )}
        </div>
      </div>

      {pasting ? (
        <div className="space-y-1.5">
          <textarea
            autoFocus
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder={"2.37 s\n7.10 d\n7.36 t\n…one peak per line"}
            rows={6}
            className="w-full px-2.5 py-2 font-mono text-[0.72rem] rounded-lg border border-[#7c3aed]/40 bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/50 resize-none leading-relaxed"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyPaste}
              className="flex-1 py-1.5 font-mono text-[0.68rem] font-semibold rounded-lg bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => { setRaw(''); setPasting(false) }}
              className="px-3 py-1.5 font-mono text-[0.68rem] rounded-lg border border-black/[0.1] text-[#6e6e73] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="font-mono text-[0.58rem] text-[#9ca3af] leading-relaxed">
            Format: <span className="text-[#6e6e73]">shift mult</span> per line.
            Accepts spaces, commas, table pipes, parentheses.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
          {peaks.length === 0 && (
            <p className="font-mono text-[0.65rem] text-[#9ca3af] italic py-1">No peaks yet</p>
          )}
          {peaks.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <input
                type="number"
                step="0.01"
                placeholder="ppm"
                value={p.shift}
                onChange={e => update(i, 'shift', e.target.value)}
                className="w-[72px] px-2 py-1.5 font-mono text-[0.75rem] rounded-lg border border-black/[0.1] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] transition-all"
              />
              <select
                value={p.mult}
                onChange={e => update(i, 'mult', e.target.value)}
                className="px-2 py-1.5 font-mono text-[0.75rem] rounded-lg border border-black/[0.1] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] transition-all"
              >
                {mults.map(m => <option key={m}>{m}</option>)}
              </select>
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-5 h-5 flex items-center justify-center text-[#9ca3af] hover:text-red-400 rounded-md hover:bg-red-50 transition-colors text-sm leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PeakInputForm({ onSubmit, loading }) {
  const [peaks1h,  setPeaks1h]  = useState(CAFFEINE_1H)
  const [peaks13c, setPeaks13c] = useState(CAFFEINE_13C)

  function handleSubmit() {
    const p1h = peaks1h
      .filter(p => p.shift !== '' && !isNaN(parseFloat(p.shift)))
      .map(p => ({ shift: parseFloat(p.shift), multiplicity: p.mult }))
    const p13c = peaks13c
      .filter(p => p.shift !== '' && !isNaN(parseFloat(p.shift)))
      .map(p => ({ shift: parseFloat(p.shift), multiplicity: p.mult }))
    if (p1h.length === 0 && p13c.length === 0) return
    onSubmit(p1h, p13c)
  }

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white/80 p-5" style={{ backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-[0.8rem] font-semibold text-[#1d1d1f]">Peak List</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setPeaks1h(CAFFEINE_1H); setPeaks13c(CAFFEINE_13C) }}
            className="font-mono text-[0.63rem] px-2.5 py-1 rounded-lg bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.16)] text-[#7c3aed] hover:bg-[rgba(124,58,237,0.14)] transition-colors"
          >
            caffeine
          </button>
          <button
            type="button"
            onClick={() => { setPeaks1h([empty()]); setPeaks13c([empty()]) }}
            className="font-mono text-[0.63rem] px-2.5 py-1 rounded-lg border border-black/[0.1] text-[#6e6e73] hover:bg-gray-50 transition-colors"
          >
            clear
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-5">
        <PeakTable label="¹H NMR"  peaks={peaks1h}  onChange={setPeaks1h}  mults={MULTS_1H} />
        <div className="w-px bg-black/[0.06] self-stretch" />
        <PeakTable label="¹³C NMR" peaks={peaks13c} onChange={setPeaks13c} mults={MULTS_13C} />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2.5 font-mono text-[0.8rem] font-semibold rounded-xl bg-[#7c3aed] text-white hover:bg-[#6d28d9] active:bg-[#5b21b6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Elucidating…' : 'Elucidate Structure'}
      </button>
    </div>
  )
}
