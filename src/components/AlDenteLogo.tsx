import React from 'react';

interface AlDenteLogoProps {
  variant?: 'stamp' | 'compact';
  inverted?: boolean;
  className?: string;
}

/**
 * Emblema tipográfico "AL DENTE" en dos líneas dentro de marco rectangular
 * con borde ondulado/dentado que remite a estampa de almacén y borde de raviol.
 */
export const AlDenteLogo: React.FC<AlDenteLogoProps> = ({
  variant = 'stamp',
  inverted = false,
  className = '',
}) => {
  const fill = inverted ? '#F7F2E6' : '#73091D';
  const stroke = inverted ? '#F2D4AE' : '#73091D';
  const innerBg = inverted ? 'rgba(247, 242, 230, 0.08)' : '#FFFBF3';
  const subtitleColor = inverted ? '#F2D4AE' : '#736316';

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg
          width="34"
          height="30"
          viewBox="0 0 68 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M8 5 C11 2, 15 2, 18 5 C21 2, 25 2, 28 5 C31 2, 35 2, 38 5 C41 2, 45 2, 48 5 C51 2, 55 2, 58 5 C62 8, 64 13, 62 18 C65 22, 65 27, 62 31 C65 35, 65 40, 62 44 C64 49, 61 53, 57 53 C54 56, 50 56, 47 53 C44 56, 40 56, 37 53 C34 56, 30 56, 27 53 C24 56, 20 56, 17 53 C14 56, 10 56, 8 53 C4 50, 2 45, 5 41 C2 37, 2 32, 5 28 C2 24, 2 19, 5 15 C3 10, 5 6, 8 5 Z"
            fill={innerBg}
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect
            x="11"
            y="10"
            width="46"
            height="38"
            rx="4"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="3 2.5"
            opacity="0.55"
          />
          <text
            x="34"
            y="27"
            textAnchor="middle"
            fill={fill}
            fontFamily="Fredoka, sans-serif"
            fontWeight="700"
            fontSize="14"
            letterSpacing="0.06em"
          >
            AL
          </text>
          <text
            x="34"
            y="42"
            textAnchor="middle"
            fill={fill}
            fontFamily="Fredoka, sans-serif"
            fontWeight="700"
            fontSize="14"
            letterSpacing="0.04em"
          >
            DENTE
          </text>
        </svg>
        <span
          className="font-display font-bold tracking-wide text-xl whitespace-nowrap"
          style={{ color: fill }}
        >
          AL DENTE
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative inline-flex items-center justify-center px-7 py-4">
        <svg
          viewBox="0 0 220 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-52 sm:w-56 h-auto drop-shadow-sm"
          role="img"
          aria-label="AL DENTE Pastas artesanales"
        >
          {/* Scalloped ravioli / stamp outer border */}
          <path
            d="M16 10
               C21 4, 29 4, 34 10 C39 4, 47 4, 52 10 C57 4, 65 4, 70 10 C75 4, 83 4, 88 10
               C93 4, 101 4, 106 10 C111 4, 119 4, 124 10 C129 4, 137 4, 142 10 C147 4, 155 4, 160 10
               C165 4, 173 4, 178 10 C183 4, 191 4, 196 10 C203 10, 210 16, 208 24
               C214 29, 214 37, 208 42 C214 47, 214 55, 208 60 C214 65, 214 73, 208 78
               C214 83, 214 91, 208 96 C214 101, 214 109, 208 114 C208 121, 201 125, 194 122
               C189 128, 181 128, 176 122 C171 128, 163 128, 158 122 C153 128, 145 128, 140 122
               C135 128, 127 128, 122 122 C117 128, 109 128, 104 122 C99 128, 91 128, 86 122
               C81 128, 73 128, 68 122 C63 128, 55 128, 50 122 C45 128, 37 128, 32 122
               C25 126, 17 124, 15 117 C9 112, 9 104, 15 99 C9 94, 9 86, 15 81
               C9 76, 9 68, 15 63 C9 58, 9 50, 15 45 C9 40, 9 32, 15 27 C11 20, 11 13, 16 10 Z"
            fill={innerBg}
            stroke={stroke}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Inner stitched stamp border */}
          <rect
            x="22"
            y="18"
            width="176"
            height="96"
            rx="10"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.55"
          />
          <text
            x="110"
            y="60"
            textAnchor="middle"
            fill={fill}
            fontFamily="Fredoka, sans-serif"
            fontWeight="700"
            fontSize="38"
            letterSpacing="0.08em"
          >
            AL
          </text>
          <text
            x="110"
            y="99"
            textAnchor="middle"
            fill={fill}
            fontFamily="Fredoka, sans-serif"
            fontWeight="700"
            fontSize="38"
            letterSpacing="0.06em"
          >
            DENTE
          </text>
        </svg>
      </div>
      <span
        className="font-sans font-semibold tracking-[0.14em] uppercase text-xs sm:text-sm -mt-1"
        style={{ color: subtitleColor }}
      >
        Pastas artesanales
      </span>
    </div>
  );
};
