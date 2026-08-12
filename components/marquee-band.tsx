import { PawPrint } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const ITEMS = [
  'Banho & Tosa',
  'Amor de Verdade',
  'Pet Feliz',
  'Cuidado Premium',
  'Loja Completa',
]

type MarqueeBandProps = {
  variant?: 'brand' | 'ink'
}

export function MarqueeBand({ variant = 'brand', slow = false }: MarqueeBandProps & { slow?: boolean }) {
  const isInk = variant === 'ink'
  return (
    <Reveal
      className={`overflow-hidden py-4 ${
        isInk ? 'bg-ink text-cream' : 'bg-brand text-brand-foreground'
      }`}
    >
      <div className={`flex w-max items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused] ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}>
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-8" aria-hidden={groupIndex > 0}>
            {ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-8">
                <span
                  className={`font-display text-2xl font-semibold sm:text-3xl ${
                    isInk ? 'text-cream/90' : 'text-brand-foreground/90'
                  }`}
                  style={
                    isInk
                      ? { WebkitTextStroke: '1px var(--cream)', color: 'transparent' }
                      : undefined
                  }
                >
                  {item}
                </span>
                <PawPrint className="size-5 shrink-0 opacity-70" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Reveal>
  )
}
