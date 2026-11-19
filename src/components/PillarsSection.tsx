import React from 'react';
import { Leaf, Clock, Users } from 'lucide-react';
import { AlDenteLogo } from './AlDenteLogo';

interface Pillar {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  accentColor: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'natural',
    title: '100% Natural',
    description:
      'Amasadas todos los días con ingredientes reales y verduras frescas, cero conservantes.',
    detail: 'Harina seleccionada, huevos de campo y rellenos caseros.',
    icon: <Leaf className="w-6 h-6" aria-hidden="true" />,
    accentColor: '#736316',
  },
  {
    id: 'rapido',
    title: 'Poca espera, cero vueltas',
    description:
      'Congeladas en su punto justo para resolver tu almuerzo o cena en poco tiempo.',
    detail: 'Directo del freezer al agua hirviendo, sin descongelar.',
    icon: <Clock className="w-6 h-6" aria-hidden="true" />,
    accentColor: '#07598C',
  },
  {
    id: 'compartir',
    title: 'Para compartir o para vos',
    description:
      'Formatos pensados tanto para la mesa grande del domingo como para darte un gustito a solas.',
    detail: 'Bandejas prácticas de 1/2 kg y 1 kg listas para guardar.',
    icon: <Users className="w-6 h-6" aria-hidden="true" />,
    accentColor: '#73091D',
  },
];

export const PillarsSection: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="py-14 sm:py-20 bg-[#F2D4AE]/35 border-y border-[#E4C89E]/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Brand Stamp & Central Message */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <AlDenteLogo variant="stamp" className="mb-5" />
          <h2 className="font-display font-bold text-[#73091D] text-2xl sm:text-4xl leading-tight mb-4">
            Como la pasta de casa, pero lista cuando llegás cansado.
          </h2>
          <p className="text-base sm:text-lg text-[#3B2118]/90 leading-relaxed">
            Pastas artesanales y naturales, listas en poco tiempo, para que el sabor a domingo
            te acompañe cualquier día. En nuestro local de Lomas de Zamora amasamos sin apuro
            y congelamos al instante para cuidar cada sabor.
          </p>
        </div>

        {/* 3 Pillars in Ravioli / Stamp Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="ravioli-stamp-card p-6 sm:p-8 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${pillar.accentColor}15`,
                    color: pillar.accentColor,
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#73091D] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-[#3B2118]/90 text-base leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#736316] pt-4 border-t border-[#E4C89E]/70">
                {pillar.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
