import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  PASTA_CATALOG,
  PastaCategory,
  PastaProduct,
  WeightFormat,
  buildWhatsAppUrl,
  formatARS,
} from '../data/pastas';
import { ResilientImage } from './ResilientImage';
import { WhatsAppIcon } from './WhatsAppFloat';

type FilterOption = 'Todas' | PastaCategory;

interface CatalogSectionProps {
  onAddToReservation: (product: PastaProduct, format: WeightFormat, variant?: string) => void;
}

const FILTER_CATEGORIES: FilterOption[] = ['Todas', 'Rellenas', 'Clásicas', 'Cintas'];

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onAddToReservation }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Todas');
  const [selectedFormats, setSelectedFormats] = useState<Record<string, WeightFormat>>({
    ravioles: '1/2 kg',
    sorrentinos: '1/2 kg',
    noquis: '1/2 kg',
    cintas: '1/2 kg',
  });
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    ravioles: 'Verdura y Ricota',
    sorrentinos: 'Clásicos masa al huevo',
    noquis: 'Tradicionales de papa',
    cintas: 'Al huevo',
  });
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  const filteredPastas =
    activeFilter === 'Todas'
      ? PASTA_CATALOG
      : PASTA_CATALOG.filter((item) => item.category === activeFilter);

  const handleFormatChange = (productId: string, format: WeightFormat) => {
    setSelectedFormats((prev) => ({ ...prev, [productId]: format }));
  };

  const handleVariantChange = (productId: string, variant: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const handleAdd = (product: PastaProduct) => {
    const format = selectedFormats[product.id] ?? '1/2 kg';
    const variant = selectedVariants[product.id];
    onAddToReservation(product, format, variant);
    setRecentlyAdded(product.id);
    window.setTimeout(() => {
      setRecentlyAdded((current) => (current === product.id ? null : current));
    }, 1800);
  };

  return (
    <section id="catalogo" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#736316] mb-2">
              Nuestro Menú Artesanal
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#73091D] leading-tight">
              Elegí tus pastas del día
            </h2>
            <p className="text-base text-[#3B2118]/85 mt-2">
              Todas vienen listas en envase práctico del freezer a la olla, sin conservantes ni aditivos.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <div
            role="tablist"
            aria-label="Filtrar pastas por categoría"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2D4AE]/55 border border-[#E4C89E] rounded-2xl self-start md:self-auto"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] ${
                    isActive
                      ? 'bg-[#73091D] text-[#F7F2E6] shadow-xs'
                      : 'text-[#3B2118] hover:bg-[#F7F2E6]/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPastas.map((product) => {
            const currentFormat = selectedFormats[product.id] ?? '1/2 kg';
            const currentVariant = selectedVariants[product.id];
            const currentPrice = product.prices[currentFormat];
            const currentPortions = product.portions[currentFormat];
            const isJustAdded = recentlyAdded === product.id;

            const whatsappQuery = `¡Hola Al Dente! Quiero consultar por ${product.name} (${currentFormat}${
              currentVariant ? ` - ${currentVariant}` : ''
            }) para retirar o enviar en Lomas de Zamora.`;

            return (
              <article
                key={product.id}
                className="bg-[#FFFBF3] rounded-3xl border border-[#E4C89E] overflow-hidden shadow-sm flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
              >
                {/* 4:3 Product Photo */}
                <div className="aspect-[4/3] w-full bg-[#F2D4AE]/30 overflow-hidden border-b border-[#E4C89E]/70">
                  <ResilientImage
                    src={product.image}
                    alt={product.imageAlt}
                    title={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    {/* Zero-pill unboxed metadata kicker */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#736316] mb-2">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>100% Natural</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#07598C]">Listos en {product.cookTime}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-2.5">
                      <h3 className="font-display font-bold text-2xl text-[#73091D] leading-snug">
                        {product.name}
                      </h3>
                      <span className="font-display font-bold text-2xl text-[#2B1712] tabular-nums whitespace-nowrap shrink-0">
                        {formatARS(currentPrice)}
                      </span>
                    </div>

                    <p className="text-[#3B2118]/90 text-base leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Variant selector if applicable */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-4">
                        <label
                          htmlFor={`variant-${product.id}`}
                          className="block text-xs font-semibold text-[#5A392E] mb-1.5"
                        >
                          {product.variantLabel ?? 'Variedad'}:
                        </label>
                        <select
                          id={`variant-${product.id}`}
                          value={currentVariant}
                          onChange={(e) => handleVariantChange(product.id, e.target.value)}
                          className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-3.5 py-2.5 text-sm font-medium text-[#2B1712] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                        >
                          {product.variants.map((variant) => (
                            <option key={variant} value={variant}>
                              {variant}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Interactive Weight Format Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-[#5A392E] mb-1.5">
                        Elegí el formato:
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {(['1/2 kg', '1 kg'] as WeightFormat[]).map((formatOption) => {
                          const selected = currentFormat === formatOption;
                          const labelSuffix =
                            formatOption === '1/2 kg' ? 'Individual / Parejas' : 'Familiar';
                          return (
                            <button
                              key={formatOption}
                              type="button"
                              onClick={() => handleFormatChange(product.id, formatOption)}
                              aria-pressed={selected}
                              className={`text-left px-3.5 py-2.5 rounded-xl border-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] ${
                                selected
                                  ? 'border-[#73091D] bg-[#73091D]/8 text-[#73091D]'
                                  : 'border-[#E4C89E] bg-[#F7F2E6]/60 text-[#3B2118] hover:border-[#736316]/60'
                              }`}
                            >
                              <div className="font-bold text-sm tabular-nums">{formatOption}</div>
                              <div className="text-xs opacity-85 truncate">{labelSuffix}</div>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-[#736316] font-medium mt-2">{currentPortions}</p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E4C89E]/70">
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] ${
                        isJustAdded
                          ? 'bg-[#736316] text-[#F7F2E6]'
                          : 'bg-[#73091D] hover:bg-[#5B0717] text-[#F7F2E6]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Agregado a tu reserva</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Agregar a mi reserva</span>
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppUrl(whatsappQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#736316] text-[#736316] hover:bg-[#736316] hover:text-[#F7F2E6] font-semibold text-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C]"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>Consultar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
