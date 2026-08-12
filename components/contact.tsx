'use client'

import { MessageCircle, AtSign, MapPin, Phone, Clock, Star, MapPin as MapPinIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import LetterSwing from '@/components/originkit/ui/letter-swing'
import { motion } from 'framer-motion'

const WHATSAPP_URL =
  'https://wa.me/554632257889?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20para%20o%20meu%20pet.'

const GOOGLE_MAPS_URL =
  'https://maps.google.com/?cid=9560571945062391633'

const INFO = [
  {
    icon: MapPinIcon,
    label: 'Endereço',
    lines: ['Av. Tupi, 1514 — Centro, Pato Branco - PR', 'CEP 85404-000'],
    color: 'text-brand',
    bgColor: 'bg-brand-soft',
  },
  {
    icon: Phone,
    label: 'Telefone',
    lines: ['(46) 3225-7889 · Loja e agendamentos', '(46) 99105-1828 · Plantão 24h'],
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Clock,
    label: 'Horário',
    lines: ['Segunda a Sexta · 08h — 18h', 'Sábado · 08h — 12h', 'Domingo · Fechado'],
    color: 'text-ink',
    bgColor: 'bg-ink/10',
  },
]

function FloatingIcon({ icon: Icon, className, color }: { icon: React.ComponentType<any>; className?: string; color: string }) {
  return (
    <motion.span
      className={className}
      animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon className={`${color} transition-colors`} aria-hidden />
    </motion.span>
  )
}

export function Contact() {
  return (
    <section id="contato" className="bg-brand-soft/50 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand)_0%,_transparent_70%)] opacity-5" aria-hidden />
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal className="grid gap-10 rounded-[2.5rem] border border-border/70 bg-card p-8 shadow-xl shadow-ink/5 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Vem nos visitar
            </span>
            <LetterSwing
              text="Bora mimar o seu pet?"
              font={{
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textAlign: 'left',
              }}
              color='#1e293b'
              tag='h2'
              startRotation={-60}
              startOpacity={0}
              startY={30}
              startScale={0.95}
              transformOrigin='top center'
              stagger={0.04}
              transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }}
              appearTrigger="scroll"
              scrollConfig={{ position: "bottom", distance: 20 }}
            />
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Agende pelo WhatsApp e garanta o melhor horário para o seu melhor amigo.
            </p>

            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-brand-soft/50 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.3, rotate: -10 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Star className="size-3.5 fill-current" />
                  </motion.span>
                ))}
              </span>
              4,4 · 63 avaliações no Google
            </motion.a>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whats px-7 py-3.5 font-bold text-cream shadow-lg shadow-whats/30 transition-transform hover:scale-105"
                whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px -10px rgba(37, 211, 102, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <MessageCircle className="size-5" />
                Chamar no WhatsApp
              </motion.a>
              <motion.a
                href="https://instagram.com/bichommimado"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-7 py-3.5 font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <AtSign className="size-5" />
                bichommimado
              </motion.a>
            </div>
          </div>

          <div className="grid gap-4">
            {INFO.map((info, index) => (
              <motion.div
                key={info.label}
                whileHover={{ x: 8, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                layout
              >
                <Reveal
                  delay={index * 90}
                  className="group flex items-start gap-4 rounded-2xl bg-brand-soft/60 p-5 transition-all duration-500 hover:bg-brand-soft hover:shadow-xl hover:shadow-brand/10"
                >
                  <motion.div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <FloatingIcon icon={info.icon} className="size-5" color={info.color} />
                  </motion.div>
                  <div>
                    <p className="font-display font-semibold text-ink">{info.label}</p>
                    {info.lines.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}