'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** 'up' = fade + slide from bottom (default, cards/text). 'zoom' = fade + scale in (photos). */
  variant?: 'up' | 'zoom'
}

const VARIANT_CLASSES: Record<NonNullable<RevealProps['variant']>, string> = {
  up: 'fade-in slide-in-from-bottom-16',
  zoom: 'fade-in zoom-in-90',
}

/**
 * Fires a one-shot fade/slide-up entrance (tw-animate-css) once the element
 * crosses into the viewport. Stays invisible until then; respects
 * prefers-reduced-motion via the global override in globals.css.
 */
export function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let revealed = false

    const reveal = () => {
      if (revealed) return
      revealed = true
      setVisible(true)
      cleanup()
    }

    // Safety net for anchor-nav jumps (href="#section", no smooth scroll):
    // the element can land already above the viewport without its
    // intersection ratio ever crossing the observer's threshold, so
    // IntersectionObserver never fires. Checked once on mount (element
    // already on screen at load) and on hashchange only — NOT on every
    // scroll tick, or it would preempt the IntersectionObserver and reveal
    // cards the instant they touch the viewport edge, well before they're
    // actually visible, killing the "revealed as you scroll" effect.
    const checkPosition = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal()
      },
      { threshold: 0.2, rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    window.addEventListener('hashchange', checkPosition)
    checkPosition()

    function cleanup() {
      observer.disconnect()
      window.removeEventListener('hashchange', checkPosition)
    }

    return cleanup
  }, [])

  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`${className} ${
        visible
          ? `animate-in ${VARIANT_CLASSES[variant]} fill-mode-both duration-900 ease-out`
          : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
