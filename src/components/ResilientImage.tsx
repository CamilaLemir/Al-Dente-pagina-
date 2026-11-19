import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  title,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2D4AE]/60 via-[#F7F2E6] to-[#F2D4AE]/40 text-[#73091D] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#73091D]/10 flex items-center justify-center mb-3">
          <Utensils className="w-6 h-6 text-[#73091D]" aria-hidden="true" />
        </div>
        <span className="font-display font-bold text-lg text-[#73091D]">{title}</span>
        <span className="text-xs text-[#736316] mt-1">AL DENTE · Pastas artesanales</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
