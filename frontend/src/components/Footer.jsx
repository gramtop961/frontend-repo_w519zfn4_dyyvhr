export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} IndieStore. Quality without the logo.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#012958]">Shipping</a>
          <a href="#" className="hover:text-[#012958]">Returns</a>
          <a href="#" className="hover:text-[#012958]">Contact</a>
        </div>
      </div>
    </footer>
  );
}
