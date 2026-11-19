import React from 'react';
import { Clock, ExternalLink, Flame, Instagram, MapPin, Truck } from 'lucide-react';
import { AlDenteLogo } from './AlDenteLogo';
import { buildWhatsAppUrl } from '../data/pastas';
import { WhatsAppIcon } from './WhatsAppFloat';

export const FooterSection: React.FC = () => {
  return (
    <footer id="contacto" className="bg-[#73091D] text-[#F7F2E6] pt-16 pb-24 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F2D4AE]/25">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <AlDenteLogo variant="stamp" inverted className="mb-4" />
            <p className="text-sm sm:text-base text-[#F7F2E6]/90 leading-relaxed max-w-sm">
              El sabor del domingo, todos los días. Pastas frescas congeladas amasadas con
              ingredientes naturales y cero conservantes en el corazón de Lomas de Zamora.
            </p>
          </div>

          {/* Local & Hours Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-xl text-[#F2D4AE]">
              Nuestro local en Lomas
            </h3>
            <ul className="space-y-3 text-sm text-[#F7F2E6]/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F2D4AE] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Local a la calle en Lomas de Zamora (Zona Sur, GBA). Retiro presencial continuo
                  con stock diario en mostrador.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F2D4AE] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Martes a Sábados de 10:00 a 20:00 hs · Domingos de 9:30 a 14:00 hs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#F2D4AE] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Envíos a domicilio en Lomas de Zamora, Banfield, Temperley y alrededores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-[#F2D4AE] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Tip de cocción: ponelas directo del freezer al agua hirviendo con sal, sin
                  descongelar.
                </span>
              </li>
            </ul>
          </div>

          {/* Linktree & Social Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-xl text-[#F2D4AE]">
              Conectemos en el barrio
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/aldentepastas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#F7F2E6]/10 hover:bg-[#F7F2E6]/18 border border-[#F2D4AE]/30 text-sm font-semibold transition-colors"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#F2D4AE]" aria-hidden="true" />
                  <span>@aldentepastas</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
              </a>

              <a
                href="https://linktr.ee/aldentepastas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#F7F2E6]/10 hover:bg-[#F7F2E6]/18 border border-[#F2D4AE]/30 text-sm font-semibold transition-colors"
              >
                <span className="inline-flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[#F2D4AE]" aria-hidden="true" />
                  <span>Linktree · @aldentepastas</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
              </a>

              <a
                href={buildWhatsAppUrl(
                  '¡Hola Al Dente! Quiero consultar por las pastas artesanales...'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#736316] hover:bg-[#5D5011] border border-[#F2D4AE]/50 text-sm font-semibold transition-colors"
              >
                <span className="inline-flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp directo</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2D4AE]/85">
          <p>© {new Date().getFullYear()} AL DENTE — Pastas artesanales · Lomas de Zamora, Zona Sur.</p>
          <p>Hecho con ingredientes reales y sin conservantes.</p>
        </div>
      </div>
    </footer>
  );
};
