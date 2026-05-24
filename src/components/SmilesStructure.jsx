import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function SmilesStructure({ smiles, width = 220, height = 150 }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'ok' | 'error'

  if (!smiles) return null

  const src = `${BASE_URL}/api/v1/structure/svg?smiles=${encodeURIComponent(smiles)}&width=${width * 2}&height=${height * 2}`

  return (
    <div
      className="flex items-center justify-center rounded-lg overflow-hidden"
      style={{ width, height }}
    >
      {status === 'loading' && (
        <div className="w-4 h-4 border border-[#7c3aed]/40 border-t-[#7c3aed] rounded-full animate-spin" />
      )}
      {status === 'error' && (
        <p className="font-mono text-[0.58rem] text-[#6e6e73] p-2 break-all leading-relaxed text-center">
          {smiles}
        </p>
      )}
      <img
        src={src}
        alt={smiles}
        style={{
          display: status === 'ok' ? 'block' : 'none',
          maxWidth: '100%',
          height: 'auto',
        }}
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}
