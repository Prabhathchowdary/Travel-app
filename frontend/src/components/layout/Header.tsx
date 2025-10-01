export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0e1512]/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/10 grid place-items-center">✳</span>
          <span className="font-semibold">SuiteSavvy</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#destinations" className="hover:text-white">Destinations</a>
          <a href="#" className="hover:text-white">Services</a>
        </nav>
        <button className="px-3 py-1.5 rounded-full bg-white text-black text-sm hover:bg-brand-200 transition">Booking</button>
      </div>
    </header>
  )
}



