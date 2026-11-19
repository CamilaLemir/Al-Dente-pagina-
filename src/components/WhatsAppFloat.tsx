import React from 'react';
import { buildWhatsAppUrl } from '../data/pastas';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.51 2 2.02 6.49 2.02 12.011c0 1.765.462 3.488 1.339 5.004L2 22l5.115-1.342a9.97 9.97 0 0 0 4.916 1.29h.004c5.52 0 10.01-4.49 10.01-10.01C22.045 6.49 17.552 2 12.031 2zm5.826 14.23c-.246.692-1.43 1.326-1.973 1.404-.503.073-1.142.104-1.845-.121-.428-.136-.977-.32-1.678-.622-2.948-1.272-4.872-4.252-5.019-4.448-.147-.196-1.199-1.595-1.199-3.043 0-1.448.758-2.16 1.028-2.454.27-.294.588-.368.784-.368.196 0 .392.002.564.01.181.008.424-.069.663.506.245.589.834 2.035.908 2.182.073.147.122.318.024.514-.098.196-.147.318-.294.49-.147.171-.31.383-.441.514-.147.147-.3.307-.129.601.171.294.762 1.257 1.637 2.037 1.126 1.004 2.075 1.315 2.369 1.462.294.147.466.122.638-.074.171-.196.735-.857.931-1.151.196-.294.392-.245.662-.147.27.098 1.716.81 2.01.957.294.147.49.221.564.343.073.123.073.711-.173 1.403z" />
  </svg>
);

export const WhatsAppFloat: React.FC = () => {
  const defaultMsg =
    '¡Hola Al Dente! Quiero consultar por las pastas artesanales...';

  return (
    <a
      href={buildWhatsAppUrl(defaultMsg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hacé tu pedido por WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2.5 bg-[#736316] hover:bg-[#5D5011] text-[#F7F2E6] font-sans font-semibold text-sm px-4 py-3 rounded-full shadow-lg border-2 border-[#F2D4AE]/80 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2E6] whitespace-nowrap"
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      <span>Hacé tu pedido</span>
    </a>
  );
};
