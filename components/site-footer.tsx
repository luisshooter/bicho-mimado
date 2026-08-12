import Image from 'next/image'
import { AtSign, Heart } from 'lucide-react'
import { MarqueeBand } from './marquee-band'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <MarqueeBand variant="ink" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center overflow-hidden rounded-full ring-1 ring-cream/20">
            <Image
              src="/brand/logo-real.png"
              alt="Logo Bicho Mimado"
              width={40}
              height={40}
              className="size-10 object-cover"
            />
          </span>
          <span className="font-display text-xl font-semibold text-cream">Bicho Mimado</span>
        </a>

        <a
          href="https://instagram.com/bichommimado"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-brand"
        >
          <AtSign className="size-4" />
          bichommimado
        </a>

        <p className="flex items-center gap-1.5 text-sm text-cream/60">
          © 2026 Bicho Mimado · Feito com
          <Heart className="size-4 fill-accent text-accent" />
          para os pets
        </p>
      </div>
    </footer>
  )
}
