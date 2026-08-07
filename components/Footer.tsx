import { brand } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-[var(--paper-2)] border-t border-[var(--line)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--line)] pb-8">
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--ink)] flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full p-1">
                <line x1="20" y1="6" x2="20" y2="34" stroke="#FAFAF6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="#FAFAF6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
                <circle cx="28" cy="12" r="4" fill="var(--orange)" />
                <circle cx="12" cy="28" r="4" fill="var(--blue)" />
              </svg>
            </div>
            <span className="font-serif font-bold text-xl text-[var(--ink)] tracking-tight">
              {brand.name}
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs font-semibold text-[var(--ink-soft)]">
            <a href="#servicios" className="hover:text-[var(--ink)] transition-colors">
              /servicios
            </a>
            <a href="#proceso" className="hover:text-[var(--ink)] transition-colors">
              /proceso
            </a>
            <a href="#casos" className="hover:text-[var(--ink)] transition-colors">
              /casos
            </a>
            <a href="#planes" className="hover:text-[var(--ink)] transition-colors">
              /planes
            </a>
            <a href="#faq" className="hover:text-[var(--ink)] transition-colors">
              /faq
            </a>
          </div>
        </div>

        {/* Technical Footer Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--ink-soft)]">
          <p>
            © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span>Santiago, Chile</span>
            <span>•</span>
            <span>{brand.email}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
