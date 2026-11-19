import React from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#736316] mb-3">
              Lomas de Zamora · Zona Sur, Buenos Aires
            </p>

            <h1 className="font-display font-bold text-[#73091D] text-[clamp(2.35rem,4.3vw,3.8rem)] leading-[1.08] tracking-tight mb-5">
              El sabor del domingo, todos los días.
            </h1>

            <p className="text-base sm:text-lg text-[#3B2118]/90 leading-relaxed max-w-xl mb-8">
              Pastas artesanales 100% naturales, sin conservantes y listas en poco tiempo.
              Del freezer directo a tu olla en Lomas de Zamora.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#73091D] hover:bg-[#5B0717] text-[#F7F2E6] font-semibold text-base shadow-sm transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2E6] whitespace-nowrap shrink-0"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#reservas"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-[#736316] text-[#736316] hover:bg-[#736316] hover:text-[#F7F2E6] font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2E6] whitespace-nowrap shrink-0"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Reservar mi pedido</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E4C89E] flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4A2C21]">
              <span>Amasadas cada mañana</span>
              <span aria-hidden="true" className="text-[#73091D]">·</span>
              <span>Cero conservantes ni aditivos</span>
              <span aria-hidden="true" className="text-[#73091D]">·</span>
              <span>Stock diario en mostrador</span>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl overflow-hidden bg-[#F2D4AE] p-2.5 sm:p-3 shadow-md border border-[#E4C89E]">
              <div className="h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-[#F7F2E6]">
                <ResilientImage
                  src="/src/assets/images/hero_kneading_pasta_1795111664742.jpg"
                  alt="Manos artesanales amasando pasta fresca al huevo sobre mesa de madera con harina y luz natural cálida"
                  title="Amasado artesanal diario"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
