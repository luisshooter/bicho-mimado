'use client'

import Image from 'next/image'
import { Reveal } from '@/components/motion/reveal'
import { ImageReveal } from '@/components/motion/image-reveal'
import LetterSwing from '@/components/originkit/ui/letter-swing'
import { motion, useReducedMotion } from 'framer-motion'

const PETS = [
  { src: '/pets/insta-maltes.jpg', alt: 'Maltês recém-banhado no Bicho Mimado, foto real do Instagram @bichommimado' },
  { src: '/pets/insta-yorkie.jpg', alt: 'Yorkshire com laçarotes azuis após tosa no Bicho Mimado, foto real do Instagram @bichommimado' },
  { src: '/pets/insta-shihtzu.webp', alt: 'Shih Tzu com laçarotes azuis no Bicho Mimado, foto real do Instagram @bichommimado' },
  { src: '/pets/gallery-4.png', alt: 'Gato laranja de pelo macio e limpo' },
]

export function Gallery() {
  return (
    <section id="galeria" className="bg-ink py-20 text-cream sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand)_0%,_transparent_70%)] opacity-5" aria-hidden />
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Mimados da casa
          </span>
          <LetterSwing
            text="Nossos clientes de 4 patas"
            font={{
              fontFamily: 'var(--font-fredoka)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
            color='#f8fafc'
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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {PETS.map((pet, index) => (
            <motion.div
              key={pet.src}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              layout
            >
              <ImageReveal
                src={pet.src || '/placeholder.svg'}
                alt={pet.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                variant="zoom"
                delay={index * 120}
                threshold={0.2}
                rootMargin="0px 0px -15% 0px"
                className={`group relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream/10 ${index % 2 === 1 ? 'lg:translate-y-6' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-cream/90 text-sm font-medium">
                    {pet.alt.split(',')[0]}
                  </span>
                </div>
              </ImageReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}