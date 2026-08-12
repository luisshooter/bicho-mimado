'use client'

import { Star, Quote, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import LetterSwing from '@/components/originkit/ui/letter-swing'
import { motion } from 'framer-motion'

const GOOGLE_RATING = 4.4
const GOOGLE_REVIEW_COUNT = 63
const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=9560571945062391633'

const REVIEWS = [
  {
    name: 'Giovana Abegg',
    stars: 5,
    date: 'há 1 ano',
    text: 'Clínica excelente. Ótimo atendimento. Conheci nossa Pipoca lá e me apaixonei... veio pra casa no outro dia.',
  },
  {
    name: 'Ricardo Requena',
    stars: 5,
    date: 'há 8 meses',
    text: 'Fui lá levar um gato de rua moribundo. Fizeram questão de manter informado sobre a situação e foram muito acolhedores.',
  },
]

function StarRating({ rating, size = 4, className = '' }: { rating: number; size?: number; className?: string }) {
  return (
    <div className={`flex ${className}`} aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="text-accent"
        >
          <Star className={`size-${size} fill-current ${i >= rating ? 'opacity-30' : ''}`} />
        </motion.span>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-background py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand)_0%,_transparent_70%)] opacity-5" aria-hidden />
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Quem ama, recomenda
          </span>
          <LetterSwing
            text="Avaliações reais no Google"
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
        </Reveal>

        <Reveal
          delay={80}
          className="mx-auto mt-10 flex w-fit flex-col items-center gap-3 rounded-full border border-border/70 bg-card px-8 py-4 shadow-sm sm:flex-row sm:gap-5"
        >
          <motion.span
            className="font-display text-4xl font-bold leading-none text-ink"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            {GOOGLE_RATING}
          </motion.span>
          <StarRating rating={GOOGLE_RATING} size={5} className="relative" />
          <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
          <span className="text-sm text-muted-foreground">
            <strong className="text-ink">{GOOGLE_REVIEW_COUNT} avaliações</strong> verificadas
          </span>
          <motion.a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver no Google
            <ExternalLink className="size-3.5" />
          </motion.a>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {REVIEWS.map((item, index) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              layout
            >
              <Reveal
                delay={200 + index * 120}
                className="group flex flex-col h-full rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition-all duration-500 hover:border-brand hover:shadow-2xl hover:shadow-brand/10"
              >
                <div className="flex items-start justify-between">
                  <Quote className="size-8 text-brand/40 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" aria-hidden />
                  <span className="rounded-full bg-brand-soft/70 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-brand-foreground/70">
                    Google
                  </span>
                </div>
                <StarRating rating={item.stars} size={4} className="mt-3" />
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink">
                  {`"${item.text}"`}
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                  <p className="font-display font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}