'use client'

import { PawPrint, Star, MessageCircle } from 'lucide-react'
import { useParallax } from '@/components/motion/use-parallax'
import LetterSwing from '@/components/originkit/ui/letter-swing'
import { ImageReveal } from '@/components/motion/image-reveal'
import { Reveal } from '@/components/motion/reveal'
import { AnimatedText } from '@/components/motion/animated-text'
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const WHATSAPP_URL =
  'https://wa.me/554632257889?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20para%20o%20meu%20pet.'

// Floating paw prints that rise up - client-side only to avoid hydration mismatch
const FloatingPaws = () => {
  const [paws, setPaws] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    duration: number
    delay: number
    rotation: number
    sway: number
  }>>([])

  useEffect(() => {
    const generatedPaws = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 90 + Math.random() * 15,
      size: 20 + Math.random() * 16,
      opacity: 0.08 + Math.random() * 0.08,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      sway: 15 + Math.random() * 15,
    }))
    setPaws(generatedPaws)
  }, [])

  if (paws.length === 0) return null

  return (
    <>
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          className="absolute pointer-events-none text-brand/15"
          style={{
            left: `${paw.x}%`,
            top: `${paw.y}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-80, -180, -280], opacity: [0, paw.opacity, 0] }}
          transition={{
            duration: paw.duration,
            delay: paw.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <PawPrint
            className="size-7"
            style={{
              transform: `rotate(${paw.rotation}deg)`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}

// Parallax hero image with hover tilt
const HeroImage = () => {
  const { scrollY } = useScroll()
  const ref = useRef<HTMLDivElement>(null)

  const y = useTransform(scrollY, [0, 800], [0, 150])
  const scale = useTransform(scrollY, [0, 800], [1, 1.08])
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      rotateX.set(-deltaY * 12)
      rotateY.set(deltaX * 12)
    }

    const onMouseLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className="relative h-full w-full transform-gpu overflow-hidden rounded-[46%_54%_48%_52%/52%_48%_52%_48%] border-8 border-card shadow-2xl shadow-ink/10"
      style={{ y, scale, rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
    >
      <ImageReveal
        src="/pets/hero-dog.png"
        alt="Cachorro Lulu da Pomerânia fofo e recém tosado"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 40vw"
        variant="zoom"
        delay={200}
        threshold={0.1}
      />
      {/* Shine overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export function Hero() {
  const pawA = useParallax<HTMLDivElement>(14)
  const pawB = useParallax<HTMLDivElement>(22)
  const pawC = useParallax<HTMLDivElement>(10)
  const blob = useParallax<HTMLDivElement>(-12)

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-soft via-background to-background pt-28 pb-16 sm:pt-36"
    >
      {/* Floating ambient paws */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <FloatingPaws />
      </div>

      {/* decorative paws — stamp in on load, then drift gently with scroll */}
      <div
        ref={pawA}
        className="animate-in fade-in zoom-in-50 spin-in-12 fill-mode-both absolute left-[6%] top-40 duration-500 ease-out"
      >
        <PawPrint className="size-10 rotate-12 text-brand/30" aria-hidden />
      </div>
      <div
        ref={pawB}
        className="animate-in fade-in zoom-in-50 spin-in-12 fill-mode-both absolute right-[8%] top-32 duration-500 ease-out delay-150"
      >
        <PawPrint className="size-14 -rotate-12 text-accent/30" aria-hidden />
      </div>
      <div
        ref={pawC}
        className="animate-in fade-in zoom-in-50 spin-in-12 fill-mode-both absolute bottom-16 left-[14%] duration-500 ease-out delay-300"
      >
        <PawPrint className="size-8 -rotate-6 text-brand/20" aria-hidden />
      </div>

      {/* Blob background */}
      <div ref={blob} className="absolute inset-0 rounded-[42%] bg-brand/25 blur-2xl" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 relative z-10">
        <div className="text-center lg:text-left">
          <Reveal className="mb-6" delay={100}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-foreground/70">
              <PawPrint className="size-3.5 text-brand" />
              Pet Shop & Banho e Tosa • @bichommimado
            </span>
          </Reveal>

          <Reveal delay={200}>
            <LetterSwing
              text="Onde cada patinha vira um bichinho muito mimado."
              font={{
                fontFamily: 'var(--font-fredoka)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textAlign: 'left',
              }}
              color='#1e293b'
              tag='h1'
              startRotation={-60}
              startOpacity={0}
              startY={40}
              startScale={0.9}
              transformOrigin='top center'
              stagger={0.04}
              transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }}
              appearTrigger="scroll"
              scrollConfig={{ position: "bottom", distance: 20 }}
            />
          </Reveal>

          <Reveal delay={400} className="mt-6">
            <AnimatedText
              as="p"
              text="Banho, tosa, loja completa e muito carinho para o seu melhor amigo. Do jeitinho que ele merece."
              className="max-w-md mx-auto text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg"
              delay={0.2}
              stagger={0.06}
            />
          </Reveal>

          <Reveal delay={550} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:scale-105 sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <MessageCircle className="size-5" />
              Agendar no WhatsApp
            </motion.a>
            <motion.a
              href="#servicos"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-ink/15 bg-card px-7 py-3.5 font-bold text-ink transition-colors hover:border-brand hover:text-brand sm:w-auto"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver serviços
            </motion.a>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Reveal delay={300} variant="zoom" className="aspect-square">
            <HeroImage />
          </Reveal>

          {/* floating stat badge */}
          <Reveal delay={600} className="absolute -bottom-2 left-0 flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-xl shadow-ink/10">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand-foreground">
              <PawPrint className="size-5 text-brand" />
            </span>
            <div className="text-left">
              <p className="font-display text-lg font-bold leading-none text-ink">3.989 seguidores</p>
              <p className="text-xs font-medium text-muted-foreground">no Instagram</p>
            </div>
          </Reveal>

          {/* rating badge */}
          <Reveal delay={700} className="absolute -top-2 right-0 flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-xl shadow-ink/10">
            <div className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs font-bold text-ink">4.4</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}