'use client'

import { Bath, ShoppingBag, Stethoscope, Car } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import LetterSwing from '@/components/originkit/ui/letter-swing'
import { motion } from 'framer-motion'

const SERVICES = [
  {
    icon: Bath,
    title: 'Banho & Tosa',
    description:
      'Banho relaxante, tosa higiênica e na tesoura, hidratação e perfuminho. Seu pet sai renovado.',
    color: 'text-brand',
    bgColor: 'bg-brand-soft',
    hoverBg: 'bg-brand',
  },
  {
    icon: ShoppingBag,
    title: 'Loja Pet',
    description: 'Rações, petiscos, brinquedos e acessórios selecionados.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    hoverBg: 'bg-accent',
  },
  {
    icon: Stethoscope,
    title: 'Cuidado Vet',
    description: 'Orientação e cuidados de saúde com quem ama animais.',
    color: 'text-ink',
    bgColor: 'bg-ink/10',
    hoverBg: 'bg-ink',
  },
  {
    icon: Car,
    title: 'Táxi Dog',
    description: 'Buscamos e levamos o seu pet com todo o conforto e segurança.',
    color: 'text-brand',
    bgColor: 'bg-brand-soft',
    hoverBg: 'bg-brand',
  },
]

// Floating icon background
function FloatingIcon({ icon: Icon, className, color }: { icon: React.ComponentType<any>; className?: string; color: string }) {
  return (
    <motion.span
      className={className}
      animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon className={`${color} transition-colors`} aria-hidden />
    </motion.span>
  )
}

export function Services() {
  return (
    <section id="servicos" className="bg-background py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand)_0%,_transparent_70%)] opacity-5" aria-hidden />
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            O que fazemos
          </span>
          <LetterSwing
            text="Serviços que mimam de verdade"
            font={{
              fontFamily: 'var(--font-fredoka)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              textAlign: 'center',
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
          <p className="mt-4 text-pretty text-muted-foreground">
            Tudo o que o seu pet precisa em um só lugar, com uma equipe apaixonada por bichinhos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              layout
            >
              <Reveal
                delay={index * 100}
                className="group flex flex-col rounded-3xl border border-border/70 bg-card p-7 transition-all duration-500 hover:border-brand hover:shadow-2xl hover:shadow-brand/10"
              >
                <motion.div
                  className="flex size-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span className={`flex size-14 items-center justify-center rounded-2xl ${service.bgColor} ${service.hoverBg} group-hover:text-brand-foreground transition-all duration-500`}>
                    <FloatingIcon icon={service.icon} color={service.color} />
                  </span>
                </motion.div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}