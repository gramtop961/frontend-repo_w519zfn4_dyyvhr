export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#012958] via-[#214a84] to-[#6592c4]" />
      <div className="max-w-6xl mx-auto px-4 py-20 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Discover premium, non‑brand essentials</h1>
          <p className="mt-4 text-white/90">Curated quality without the markup. Thoughtful materials, timeless design, fair prices.</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#catalog" className="px-5 py-2.5 rounded-md bg-white text-[#012958] font-medium hover:bg-white/90 transition">Shop now</a>
            <a href="#about" className="px-5 py-2.5 rounded-md border border-white/40 hover:bg-white/10 transition">Why IndieStore?</a>
          </div>
        </div>
      </div>
    </section>
  );
}
