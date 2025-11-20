export default function Filters({ categories, selected, onSelect, query, onQuery, onClear }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(selected === c ? null : c)}
            className={`px-3 py-1.5 rounded-full border text-sm transition ${
              selected === c
                ? 'bg-[#012958] border-[#012958] text-white'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {c}
          </button>
        ))}
        <button onClick={onClear} className="text-sm text-slate-500 hover:text-slate-700 ml-1">Clear</button>
      </div>

      <div className="relative w-full sm:w-80">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-[#6592c4]"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">⌘K</span>
      </div>
    </div>
  )
}
