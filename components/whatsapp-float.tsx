import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/554632257889?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20para%20o%20meu%20pet.'

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="animate-in fade-in zoom-in-50 fill-mode-both fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whats px-5 py-3.5 font-bold text-cream shadow-xl shadow-whats/40 transition-transform ease-out delay-1000 hover:scale-105"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <span className="motion-safe:animate-ping absolute inset-0 rounded-full bg-whats/60" aria-hidden />
      <MessageCircle className="relative size-5" />
      <span className="relative hidden sm:inline">Fale conosco</span>
    </a>
  )
}
