'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

const WHATSAPP_URL =
  'https://wa.me/554632257889?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20para%20o%20meu%20pet.'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'border-border/60 bg-card/85 shadow-lg shadow-ink/5 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-11 items-center justify-center overflow-hidden rounded-full ring-1 ring-brand/20">
            <Image
              src="/brand/logo-real.png"
              alt="Logo Bicho Mimado"
              width={44}
              height={44}
              className="size-11 object-cover"
              priority
            />
          </span>
          <span className="font-display text-xl font-semibold text-ink">
            Bicho <span className="text-brand">Mimado</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink/80 transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-md shadow-accent/30 transition-transform hover:scale-105"
        >
          Agendar
        </a>
      </div>
    </header>
  )
}
