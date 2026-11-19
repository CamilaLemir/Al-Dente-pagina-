import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AlDenteLogo } from './AlDenteLogo';

interface NavbarProps {
  totalItems: number;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#reservas', label: 'Reservas' },
  { href: '#contacto', label: 'Contacto' },
];

export const Navbar: React.FC<NavbarProps> = ({ totalItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F2E6]/95 backdrop-blur-sm border-b border-[#E4C89E]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#inicio"
          className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] rounded-md"
          aria-label="AL DENTE Inicio"
        >
          <AlDenteLogo variant="compact" />
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#3B2118]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#73091D] hover:text-[#73091D] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#reservas"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#F7F2E6] bg-[#73091D] hover:bg-[#5B0717] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2E6]"
          >
            <span>Reservar</span>
            {totalItems > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold tabular-nums rounded-md bg-[#F2D4AE] text-[#73091D]"
                aria-label={`${totalItems} productos en tu reserva`}
              >
                {totalItems}
              </span>
            )}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#73091D] hover:bg-[#F2D4AE]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C]"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menú móvil"
          className="md:hidden bg-[#F7F2E6] border-b border-[#E4C89E] px-6 py-4 flex flex-col gap-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-base font-semibold text-[#3B2118] hover:text-[#73091D] border-b border-[#E4C89E]/40 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
