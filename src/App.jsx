import { useEffect, useMemo, useState } from 'react'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import { ShoppingCart, X } from 'lucide-react'

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
const API = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [drawer, setDrawer] = useState(false)
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState(null)
  const [customer, setCustomer] = useState({ name: '', email: '', address: '', cod: true })

  const fetchProducts = async (params = new URLSearchParams()) => {
    setLoading(true)
    setError('')
    try {
      const qs = params.toString()
      const res = await fetch(`${API}/products${qs ? `?${qs}` : ''}`)
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const onFilters = (params) => {
    fetchProducts(params)
  }

  const addToCart = (p) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id)
      if (exists) {
        return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...p, quantity: 1 }]
    })
    setDrawer(true)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const total = useMemo(() => {
    return cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }, [cart])

  const checkout = async () => {
    if (!customer.name || !customer.email || !customer.address) {
      alert('Please enter name, email and address')
      return
    }
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity, price: c.price })),
          customer_name: customer.name,
          customer_email: customer.email,
          address: `${customer.address}${customer.cod ? ' (COD)' : ''}`,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setOrderStatus({ ok: true, id: data.id, total: data.total })
        setCart([])
      } else {
        setOrderStatus({ ok: false, error: data.detail || 'Order failed' })
      }
    } catch (e) {
      setOrderStatus({ ok: false, error: 'Network error' })
    }
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg,#fafafa)] text-slate-900">
      <style>{`:
        root { 
          --primary-dark: #012958; --primary:#214a84; --primary-light:#6592c4; --bg:#fafafa;
        }
      `}</style>

      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-extrabold text-xl" style={{color:'var(--primary,#214a84)'}}>IndieStore</div>
          <button onClick={() => setDrawer(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50">
            <ShoppingCart className="w-4 h-4" /> Cart ({cart.length})
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Filters onChange={onFilters} />

        {loading && <p className="mt-8 text-slate-500">Loading products…</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white border-l shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Your Cart</h3>
              <button onClick={() => setDrawer(false)} className="p-2 rounded hover:bg-slate-100"><X className="w-5 h-5"/></button>
            </div>

            <div className="mt-4 flex-1 overflow-auto space-y-3">
              {cart.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}
              {cart.map((i) => (
                <div key={i.id} className="flex items-center gap-3 border rounded-lg p-2">
                  <img src={i.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120'} alt={i.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-medium line-clamp-1">{i.name}</div>
                    <div className="text-sm text-slate-500">Qty: {i.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold">{inr.format(i.price * i.quantity)}</div>
                  <button onClick={() => removeFromCart(i.id)} className="p-2 rounded hover:bg-slate-100"><X className="w-4 h-4"/></button>
                </div>
              ))}
            </div>

            {/* Checkout */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full border rounded-lg px-3 py-2"
                  value={customer.name}
                  onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                />
              </div>
              <div>
                <textarea
                  placeholder="Address"
                  className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                  value={customer.address}
                  onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                />
              </div>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={customer.cod} onChange={(e) => setCustomer((c) => ({ ...c, cod: e.target.checked }))} />
                <span>Cash on Delivery (COD)</span>
              </label>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{inr.format(total)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={checkout}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50"
                style={{ background: 'var(--primary,#214a84)' }}
              >
                Place Order
              </button>
              {orderStatus && (
                <div className={`text-sm p-2 rounded ${orderStatus.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {orderStatus.ok ? `Order placed! ID: ${orderStatus.id}. Amount: ${inr.format(orderStatus.total)}` : orderStatus.error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
