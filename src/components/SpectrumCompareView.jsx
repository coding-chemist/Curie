function PeakChart({ label, observed, predicted, minPpm, maxPpm }) {
  const VW = 560, VH = 128
  const PAD = { l: 42, r: 14, t: 8, b: 28 }
  const cw = VW - PAD.l - PAD.r
  const ch = VH - PAD.t - PAD.b

  const x = (ppm) => PAD.l + ((ppm - minPpm) / (maxPpm - minPpm)) * cw

  const step = maxPpm <= 20 ? 2 : maxPpm <= 60 ? 10 : 20
  const ticks = []
  for (let t = Math.ceil(minPpm / step) * step; t <= maxPpm; t += step) ticks.push(t)

  return (
    <div>
      <p className="font-mono text-[0.62rem] font-semibold text-[#6e6e73] uppercase tracking-wider mb-1">
        {label}
      </p>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ height: VH }} aria-label={label}>
        <line
          x1={PAD.l} y1={PAD.t + ch}
          x2={VW - PAD.r} y2={PAD.t + ch}
          stroke="#e5e7eb" strokeWidth={1}
        />

        {ticks.map(t => (
          <g key={t}>
            <line
              x1={x(t)} y1={PAD.t + ch}
              x2={x(t)} y2={PAD.t + ch + 4}
              stroke="#d1d5db" strokeWidth={0.8}
            />
            <text
              x={x(t)} y={PAD.t + ch + 14}
              textAnchor="middle" fontSize={8} fill="#9ca3af"
              fontFamily="JetBrains Mono, monospace"
            >
              {t}
            </text>
          </g>
        ))}

        <text
          x={VW / 2} y={VH - 2}
          textAnchor="middle" fontSize={7.5} fill="#9ca3af"
          fontFamily="Inter, sans-serif"
        >
          ppm
        </text>

        {predicted.map((p, i) => (
          <line
            key={`p${i}`}
            x1={x(p.shift)} y1={PAD.t + ch * 0.3}
            x2={x(p.shift)} y2={PAD.t + ch}
            stroke="#d1d5db" strokeWidth={2.5}
          />
        ))}

        {observed.map((p, i) => (
          <line
            key={`o${i}`}
            x1={x(p.shift)} y1={PAD.t}
            x2={x(p.shift)} y2={PAD.t + ch}
            stroke="#7c3aed" strokeWidth={2} strokeOpacity={0.75}
          />
        ))}
      </svg>
    </div>
  )
}

export default function SpectrumCompareView({ candidate, observed1h, observed13c }) {
  if (!candidate) return null

  const pred1h = candidate.predicted_spectrum?.peaks ?? []

  return (
    <div
      className="rounded-2xl border border-black/[0.08] bg-white/80 p-6"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-mono text-[0.82rem] font-semibold text-[#1d1d1f]">Spectrum Comparison</h3>
        <div className="flex items-center gap-5 font-mono text-[0.62rem] text-[#6e6e73]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 bg-[#7c3aed]" />
            Observed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 bg-[#d1d5db]" />
            Predicted (1H)
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {observed1h.length > 0 && (
          <PeakChart
            label="¹H NMR"
            observed={observed1h}
            predicted={pred1h}
            minPpm={0}
            maxPpm={12}
          />
        )}
        {observed13c.length > 0 && (
          <PeakChart
            label="¹³C NMR"
            observed={observed13c}
            predicted={[]}
            minPpm={0}
            maxPpm={210}
          />
        )}
      </div>

      {candidate.molecular_formula && (
        <p className="mt-4 font-mono text-[0.6rem] text-[#9ca3af]">
          Top candidate: {candidate.molecular_formula}
          {pred1h.length > 0 && ` · ${pred1h.length} predicted ¹H peaks`}
        </p>
      )}
    </div>
  )
}
