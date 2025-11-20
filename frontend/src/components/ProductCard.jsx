export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition">
      <div className="aspect-square bg-slate-100 overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400 text-sm">Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{product.name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[#012958] font-semibold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-md bg-[#012958] text-white text-sm hover:bg-[#0d2144]">Add</button>
        </div>
      </div>
    </div>
  );
}
