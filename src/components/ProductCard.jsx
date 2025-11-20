import { ShoppingCart } from 'lucide-react'

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">{inr.format(product.price)}</span>
          <button
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
