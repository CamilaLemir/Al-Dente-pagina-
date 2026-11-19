/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { CatalogSection } from './components/CatalogSection';
import { ReservationSection } from './components/ReservationSection';
import { FooterSection } from './components/FooterSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { PastaProduct, ReservationItem, WeightFormat } from './data/pastas';

export default function App() {
  const [reservationItems, setReservationItems] = useState<ReservationItem[]>([]);

  const handleAddToReservation = (
    product: PastaProduct,
    format: WeightFormat,
    variant?: string
  ) => {
    const key = `${product.id}__${format}__${variant ?? ''}`;
    const unitPrice = product.prices[format];

    setReservationItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          productName: product.name,
          format,
          variant,
          unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setReservationItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setReservationItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearItems = () => {
    setReservationItems([]);
  };

  const totalItems = reservationItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-artisanal-paper text-[#2B1712]">
      <Navbar totalItems={totalItems} />

      <main className="flex-1">
        <HeroSection />
        <PillarsSection />
        <CatalogSection onAddToReservation={handleAddToReservation} />
        <ReservationSection
          items={reservationItems}
          onAddProduct={handleAddToReservation}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearItems={handleClearItems}
        />
      </main>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
}
