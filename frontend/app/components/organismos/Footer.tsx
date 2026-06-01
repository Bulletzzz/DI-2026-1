export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06]">
      <div className="px-8 py-12 flex items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <p className="font-display text-[clamp(3rem,6vw,6rem)] text-white leading-none tracking-widest">
            B.E.A.S.T
          </p>
          <p className="text-[#4d4d4d] text-sm tracking-[0.2em] uppercase">
            Bernardo's Enterprise Analytics &amp; Sales Tracker
          </p>
        </div>
        <img
          src="/LogoMarca.svg"
          alt="BEAST"
          className="h-20 w-auto shrink-0 opacity-20 select-none"
          draggable={false}
        />
      </div>
      <div className="px-8 py-4 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[10px] text-[#2a2a2a] tracking-widest uppercase font-mono">
          &copy; {new Date().getFullYear()} BEAST
        </span>
        <span className="text-[10px] text-[#2a2a2a] tracking-widest uppercase font-mono">
          Desafio Integrador · 5&ordm;P
        </span>
      </div>
    </footer>
  )
}
