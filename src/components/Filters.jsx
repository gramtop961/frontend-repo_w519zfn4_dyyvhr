import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

const CATEGORIES = [
  'Home Decor',
  'Kitchen',
  'Artificial Jewelry',
  'Pet Supplies',
  'Health & Wellness',
  'Electronics',
]

export default function Filters({ onChange }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState([])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (active.length === 1) params.set('category', active[0])
    if (active.length > 1) params.set('categories', active.join(','))
    onChange(params)
  }, [query, active])

  const toggle = (c) => {
    setActive((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }

  const clear = () => {
    setQuery('')
    setActive([])
  }

  return (
    <div className="w-full bg-white/70 backdrop-blur border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <button
          onClick={clear}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-slate-50"
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => toggle(c)}
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              active.includes(c)
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
