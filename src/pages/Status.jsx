import React, { useEffect, useState } from 'react'

function Badge({ state }) {
  const isUndetected = state === 'undetected'
  return (
    <span className={`text-xs px-2 py-1 rounded ${isUndetected ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
      {isUndetected ? 'Undetected' : 'Detected'}
    </span>
  )
}

export default function Status({ locale = 'fa' }) {
  const [entries, setEntries] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/status`).then(r => r.json()).then(d => setEntries(d.entries || [])).catch(() => setEntries([]))
  }, [])

  const isFa = locale === 'fa'

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{isFa ? 'وضعیت تشخیص' : 'Detection Status'}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {entries.map((e, i) => (
          <div key={i} className="bg-[#141414] rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold uppercase">{e.game}</div>
              <Badge state={e.state} />
            </div>
            <div className="text-sm text-gray-400">
              {isFa ? 'آخرین بروزرسانی:' : 'Last updated:'} {new Date(e.updatedAt).toLocaleString(isFa ? 'fa-IR' : 'en-US')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
