import { Menu } from "lucide-react";

export default function Navbar({ onCartClick }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-[#012958] text-white grid place-items-center font-bold">I</div>
          <div>
            <p className="text-xl font-semibold text-[#012958]">IndieStore</p>
            <p className="text-xs text-slate-500 -mt-1">Non‑brand premium products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 text-[#012958] hover:text-[#6592c4] transition" aria-label="Menu">
            <Menu size={20} />
            <span className="text-sm">Browse</span>
          </button>
          <button onClick={onCartClick} className="px-3 py-1.5 rounded-md bg-[#012958] text-white hover:bg-[#0d2144] transition text-sm">
            View Cart
          </button>
        </div>
      </div>
    </header>
  );
}
