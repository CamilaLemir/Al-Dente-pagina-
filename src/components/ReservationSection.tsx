import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
} from 'lucide-react';
import {
  DELIVERY_DAYS,
  PASTA_CATALOG,
  PastaProduct,
  ReservationItem,
  TIME_SLOTS,
  WeightFormat,
  buildWhatsAppUrl,
  formatARS,
} from '../data/pastas';
import { WhatsAppIcon } from './WhatsAppFloat';

type DeliveryMode = 'retiro' | 'envio';

interface ConfirmedReceipt {
  code: string;
  customerName: string;
  phone: string;
  deliveryMode: DeliveryMode;
  address: string;
  day: string;
  timeSlot: string;
  notes: string;
  items: ReservationItem[];
  total: number;
  whatsappText: string;
}

interface ReservationSectionProps {
  items: ReservationItem[];
  onAddProduct: (product: PastaProduct, format: WeightFormat, variant?: string) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearItems: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  items,
  onAddProduct,
  onUpdateQuantity,
  onRemoveItem,
  onClearItems,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('retiro');
  const [address, setAddress] = useState('');
  const [selectedDay, setSelectedDay] = useState(DELIVERY_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');

  // Quick-add selector inside the form
  const [quickPastaId, setQuickPastaId] = useState(PASTA_CATALOG[0].id);
  const [quickFormat, setQuickFormat] = useState<WeightFormat>('1/2 kg');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ConfirmedReceipt | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleQuickAdd = () => {
    const product = PASTA_CATALOG.find((p) => p.id === quickPastaId);
    if (!product) return;
    const defaultVariant = product.variants?.[0];
    onAddProduct(product, quickFormat, defaultVariant);
    setErrorMessage(null);
  };

  const buildOrderMessage = (orderCode?: string): string => {
    const modeLabel =
      deliveryMode === 'retiro'
        ? 'Retiro en el local (Lomas de Zamora)'
        : `Envío a domicilio: ${address.trim()}`;

    const lines = items.map(
      (item) =>
        `• ${item.quantity}x ${item.productName} (${item.format}${
          item.variant ? ` - ${item.variant}` : ''
        }) — ${formatARS(item.unitPrice * item.quantity)}`
    );

    return [
      `¡Hola Al Dente! Quiero reservar mi pedido${orderCode ? ` (${orderCode})` : ''}:`,
      '',
      `Nombre: ${customerName.trim()}`,
      phone.trim() ? `Teléfono: ${phone.trim()}` : null,
      `Modalidad: ${modeLabel}`,
      `Día y horario: ${selectedDay} · ${selectedTime}`,
      '',
      'Detalle de pastas:',
      ...lines,
      '',
      `Total estimado: ${formatARS(subtotal)}`,
      notes.trim() ? `Notas: ${notes.trim()}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');
  };

  const validateForm = (): boolean => {
    if (items.length === 0) {
      setErrorMessage('Agregá al menos una pasta a tu reserva antes de confirmar.');
      return false;
    }
    if (!customerName.trim()) {
      setErrorMessage('Por favor ingresá tu nombre y apellido para guardar la reserva.');
      return false;
    }
    if (deliveryMode === 'envio' && !address.trim()) {
      setErrorMessage('Ingresá tu dirección y entre calles en Lomas de Zamora o zona aledaña.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleConfirmOnScreen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const code = `AD-${Math.floor(1000 + Math.random() * 9000)}`;
    const whatsappText = buildOrderMessage(code);

    setReceipt({
      code,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryMode,
      address: address.trim(),
      day: selectedDay,
      timeSlot: selectedTime,
      notes: notes.trim(),
      items: [...items],
      total: subtotal,
      whatsappText,
    });
  };

  const handleWhatsAppLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

  const handleCopySummary = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.whatsappText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleStartNewOrder = () => {
    setReceipt(null);
    onClearItems();
    setNotes('');
    setErrorMessage(null);
  };

  return (
    <section
      id="reservas"
      className="py-16 sm:py-20 bg-[#F2D4AE]/30 border-t border-[#E4C89E]/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#736316] mb-2">
            Asegurá tu stock diario
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#73091D] leading-tight">
            Reservá tu pedido del día
          </h2>
          <p className="text-base text-[#3B2118]/85 mt-2">
            Armá tu pedido acá abajo para retirarlo por nuestro local en Lomas de Zamora o recibirlo
            en tu casa. Podés confirmarlo en pantalla o mandarlo directo por WhatsApp.
          </p>
        </div>

        {receipt ? (
          /* On-Screen Confirmation Receipt */
          <div className="ravioli-stamp-card p-6 sm:p-10 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 pb-6 border-b border-[#E4C89E]">
              <div className="w-12 h-12 rounded-2xl bg-[#736316]/15 text-[#736316] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#736316]">
                  Reserva registrada · {receipt.code}
                </p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#73091D] mt-0.5">
                  ¡Gracias, {receipt.customerName}! Ya tenemos tu pedido.
                </h3>
                <p className="text-sm text-[#3B2118]/85 mt-1">
                  Para coordinar el pago o confirmar disponibilidad en el momento, podés enviarnos
                  este comprobante directo por WhatsApp.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E4C89E] text-sm">
              <div>
                <p className="font-semibold text-[#736316] mb-1">Modalidad</p>
                <p className="text-[#2B1712] font-medium">
                  {receipt.deliveryMode === 'retiro'
                    ? 'Retiro en el local (Lomas de Zamora)'
                    : `Envío a domicilio: ${receipt.address}`}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#736316] mb-1">Día y franja estimada</p>
                <p className="text-[#2B1712] font-medium">
                  {receipt.day} · {receipt.timeSlot}
                </p>
              </div>
            </div>

            <div className="py-6 border-b border-[#E4C89E]">
              <p className="text-sm font-semibold text-[#736316] mb-3">Tus pastas elegidas</p>
              <ul className="space-y-2.5">
                {receipt.items.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-4 text-sm sm:text-base text-[#2B1712]"
                  >
                    <span>
                      <strong className="tabular-nums">{item.quantity}x</strong> {item.productName}{' '}
                      <span className="text-[#5A392E]">
                        ({item.format}
                        {item.variant ? ` · ${item.variant}` : ''})
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums whitespace-nowrap">
                      {formatARS(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              {receipt.notes && (
                <p className="mt-4 text-sm text-[#5A392E] bg-[#F7F2E6] p-3 rounded-xl border border-[#E4C89E]">
                  <strong>Notas:</strong> {receipt.notes}
                </p>
              )}
              <div className="mt-5 pt-4 border-t border-[#E4C89E]/70 flex items-center justify-between">
                <span className="font-semibold text-[#3B2118]">Total estimado</span>
                <span className="font-display font-bold text-2xl text-[#73091D] tabular-nums">
                  {formatARS(receipt.total)}
                </span>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl(receipt.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#736316] hover:bg-[#5D5011] text-[#F7F2E6] font-semibold text-sm transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Enviar comprobante por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#73091D] text-[#73091D] hover:bg-[#73091D]/8 font-semibold text-sm transition-colors whitespace-nowrap"
              >
                <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{copied ? 'Resumen copiado' : 'Copiar resumen'}</span>
              </button>

              <button
                type="button"
                onClick={handleStartNewOrder}
                className="ml-auto text-sm font-semibold text-[#07598C] hover:underline px-2 py-2"
              >
                Hacer otro pedido
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Builder & Form */
          <form
            onSubmit={handleConfirmOnScreen}
            noValidate
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Customer & Delivery Form */}
            <div className="lg:col-span-7 bg-[#FFFBF3] rounded-3xl border border-[#E4C89E] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                  >
                    Nombre y apellido *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Martina Gómez"
                    className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-4 py-3 text-sm text-[#2B1712] placeholder:text-[#8C6D5E] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                  >
                    WhatsApp de contacto
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 11 5555-1234"
                    className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-4 py-3 text-sm text-[#2B1712] placeholder:text-[#8C6D5E] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  />
                </div>
              </div>

              {/* Delivery Mode Toggle */}
              <div>
                <span className="block text-sm font-semibold text-[#3B2118] mb-2">
                  Modalidad de entrega *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('retiro')}
                    aria-pressed={deliveryMode === 'retiro'}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] ${
                      deliveryMode === 'retiro'
                        ? 'border-[#73091D] bg-[#73091D]/8 text-[#73091D]'
                        : 'border-[#E4C89E] bg-[#F7F2E6]/60 text-[#3B2118] hover:border-[#736316]/60'
                    }`}
                  >
                    <Store className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-sm">Retiro en el local</div>
                      <div className="text-xs opacity-85 mt-0.5">Lomas de Zamora centro</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMode('envio')}
                    aria-pressed={deliveryMode === 'envio'}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C] ${
                      deliveryMode === 'envio'
                        ? 'border-[#73091D] bg-[#73091D]/8 text-[#73091D]'
                        : 'border-[#E4C89E] bg-[#F7F2E6]/60 text-[#3B2118] hover:border-[#736316]/60'
                    }`}
                  >
                    <Truck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-sm">Envío a domicilio</div>
                      <div className="text-xs opacity-85 mt-0.5">
                        Lomas de Zamora y zonas aledañas
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Conditional Address Field */}
              {deliveryMode === 'envio' && (
                <div>
                  <label
                    htmlFor="res-address"
                    className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                  >
                    Dirección y entre calles *
                  </label>
                  <div className="relative">
                    <MapPin
                      className="w-4 h-4 text-[#736316] absolute left-3.5 top-3.5"
                      aria-hidden="true"
                    />
                    <input
                      id="res-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej: Av. Meeks 450, entre Laprida y Boedo (Lomas de Zamora)"
                      className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] pl-10 pr-4 py-3 text-sm text-[#2B1712] placeholder:text-[#8C6D5E] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                    />
                  </div>
                </div>
              )}

              {/* Day & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="res-day"
                    className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                  >
                    Día de retiro o envío
                  </label>
                  <select
                    id="res-day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-4 py-3 text-sm text-[#2B1712] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  >
                    {DELIVERY_DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                  >
                    Franja horaria estimada
                  </label>
                  <select
                    id="res-time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-4 py-3 text-sm text-[#2B1712] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label
                  htmlFor="res-notes"
                  className="block text-sm font-semibold text-[#3B2118] mb-1.5"
                >
                  Notas adicionales
                </label>
                <textarea
                  id="res-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Los ravioles que sean de calabaza, cintas mitad al huevo y mitad espinaca, tocar timbre fuerte..."
                  className="w-full rounded-xl border border-[#D8B88A] bg-[#F7F2E6] px-4 py-3 text-sm text-[#2B1712] placeholder:text-[#8C6D5E] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                />
              </div>
            </div>

            {/* Right Column: Selected Pastas Summary & Actions */}
            <div className="lg:col-span-5 bg-[#FFFBF3] rounded-3xl border border-[#E4C89E] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl text-[#73091D]">
                  Tu selección de pastas
                </h3>
                <ShoppingBag className="w-5 h-5 text-[#736316]" aria-hidden="true" />
              </div>

              {/* Quick Add Control right inside the reservation panel */}
              <div className="p-4 rounded-2xl bg-[#F7F2E6] border border-[#E4C89E]/80 space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#736316]">
                  Sumar pasta rápido
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    aria-label="Seleccionar pasta para sumar"
                    value={quickPastaId}
                    onChange={(e) => setQuickPastaId(e.target.value)}
                    className="flex-1 rounded-xl border border-[#D8B88A] bg-[#FFFBF3] px-3 py-2 text-sm text-[#2B1712] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  >
                    {PASTA_CATALOG.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Seleccionar peso"
                    value={quickFormat}
                    onChange={(e) => setQuickFormat(e.target.value as WeightFormat)}
                    className="rounded-xl border border-[#D8B88A] bg-[#FFFBF3] px-3 py-2 text-sm text-[#2B1712] focus:outline-none focus:ring-2 focus:ring-[#07598C]"
                  >
                    <option value="1/2 kg">1/2 kg</option>
                    <option value="1 kg">1 kg</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#07598C] hover:bg-[#05446B] text-[#F7F2E6] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Sumar</span>
                  </button>
                </div>
              </div>

              {/* Itemized List */}
              {items.length === 0 ? (
                <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-[#D8B88A] bg-[#F7F2E6]/50">
                  <p className="text-sm font-medium text-[#5A392E]">
                    Todavía no sumaste pastas a tu reserva.
                  </p>
                  <p className="text-xs text-[#736316] mt-1">
                    Elegí arriba en el catálogo o usá el selector rápido para armar tu pedido.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[#E4C89E]/70">
                  {items.map((item) => (
                    <li key={item.key} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-[#2B1712] truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-[#736316]">
                          {item.format}
                          {item.variant ? ` · ${item.variant}` : ''} ·{' '}
                          <span className="tabular-nums">{formatARS(item.unitPrice)} c/u</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="inline-flex items-center border border-[#D8B88A] rounded-xl bg-[#F7F2E6]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            aria-label={`Quitar una unidad de ${item.productName}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#73091D] hover:bg-[#F2D4AE]/50 rounded-l-xl"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold tabular-nums text-[#2B1712]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            aria-label={`Sumar una unidad de ${item.productName}`}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#73091D] hover:bg-[#F2D4AE]/50 rounded-r-xl"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Eliminar ${item.productName}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#8C5B4D] hover:text-[#73091D] rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Subtotal */}
              <div className="pt-4 border-t border-[#E4C89E] flex items-center justify-between">
                <span className="text-sm font-semibold text-[#3B2118]">Total estimado</span>
                <span className="font-display font-bold text-2xl text-[#73091D] tabular-nums">
                  {formatARS(subtotal)}
                </span>
              </div>

              {/* Validation Error */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-[#73091D]/10 border border-[#73091D]/30 text-sm font-medium text-[#73091D]"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit Actions */}
              <div className="space-y-3 pt-1">
                <a
                  href={buildWhatsAppUrl(buildOrderMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppLinkClick}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#736316] hover:bg-[#5D5011] text-[#F7F2E6] font-semibold text-base transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C]"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>Enviar reserva por WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#73091D] hover:bg-[#5B0717] text-[#F7F2E6] font-semibold text-base transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07598C]"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Confirmar reserva en pantalla</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
