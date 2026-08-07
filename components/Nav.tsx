"use client";

import { useState } from "react";
import { brand, getWhatsAppUrl } from "@/lib/brand";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Proceso", href: "#proceso" },
    { name: "Casos", href: "#casos" },
    { name: "Planes", href: "#planes" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/90 backdrop-blur-md border-b border-[var(--line)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Logo Symbol: Ink Circle with internal cross axes + orange & blue dots */}
          <div className="relative w-10 h-10 rounded-full bg-[var(--ink)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 40 40" className="w-full h-full p-1.5">
              {/* Internal Cross Axes */}
              <line x1="20" y1="6" x2="20" y2="34" stroke="#FAFAF6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
              <line x1="6" y1="20" x2="34" y2="20" stroke="#FAFAF6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
              {/* Orange Dot (Problem/Start, top-right) */}
              <circle cx="28" cy="12" r="4" fill="var(--orange)" />
              {/* Blue Dot (Optimal/Target, bottom-left) */}
              <circle cx="12" cy="28" r="4" fill="var(--blue)" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-[var(--ink)] leading-none">
              {brand.name}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-soft)] uppercase tracking-widest mt-1">
              Asesoría & Optimización
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--ink)] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop WhatsApp Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={getWhatsAppUrl("Hola, me interesa agendar una consulta inicial.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-bold px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:shadow-md transition-all flex items-center gap-2 border border-[var(--ink)]"
          >
            <span>💬</span> Agendar Sesión
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[var(--ink)] hover:bg-[var(--paper-2)] focus:outline-none"
          aria-label="Menu Toggle"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--line)] bg-[var(--paper)] px-4 pt-2 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-base font-semibold text-[var(--ink)] py-2 border-b border-[var(--line)]/50"
            >
              {link.name}
            </a>
          ))}
          <a
            href={getWhatsAppUrl("Hola, me interesa agendar una consulta inicial.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-bold w-full py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-center shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <span>💬</span> Agendar Sesión por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
