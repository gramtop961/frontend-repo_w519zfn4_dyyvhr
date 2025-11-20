import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  function addToCart(product) {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx].quantity += 1
        return next
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart])

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800">
      <Navbar onCartClick={() => setOpenCart(true)} />
      <Hero />

      <main id="catalog" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#012958]">Featured essentials</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />)
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {openCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-lg font-semibold text-[#012958]">Your Cart</h3>
              <button className="text-slate-500 hover:text-slate-700" onClick={() => setOpenCart(false)}>Close</button>
            </div>
            <div className="flex-1 overflow-auto py-3 space-y-3">
              {cart.length === 0 ? (
                <p className="text-slate-500">No items yet.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-16 w-16 bg-slate-100 rounded overflow-hidden">
                      {item.images?.[0] && <img src={item.images[0]} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-slate-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded" onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}>-</button>
                      <span>{item.quantity}</span>
                      <button className="px-2 py-1 border rounded" onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="mt-3 w-full py-2 rounded-md bg-[#6592c4] text-white hover:bg-[#4f7fb1]"
                onClick={async () => {
                  if (cart.length === 0) return
                  const order = {
                    items: cart.map(i => ({ product_id: i.id, quantity: i.quantity, price: i.price })),
                    customer_name: 'Guest',
                    customer_email: 'guest@example.com',
                    address: 'N/A',
                    status: 'pending'
                  }
                  try {
                    const res = await fetch(`${API_BASE}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
                    if (res.ok) {
                      setCart([])
                      alert('Order placed!')
                      setOpenCart(false)
                    }
                  } catch (e) {}
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
