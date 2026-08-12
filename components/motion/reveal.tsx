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
  up: 'fade-in slide-in-from-bottom-8',
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
    let ticking = false

    const reveal = () => {
      if (revealed) return
      revealed = true
      setVisible(true)
      cleanup()
    }

    // Safety net for anchor-nav jumps (href="#section", no smooth scroll)
    // and fast fling scrolls: the element can go from "below viewport" to
    // "above viewport" in one step without its intersection ratio ever
    // crossing the observer's threshold, so IntersectionObserver never
    // fires at all. A manual position check on scroll/hashchange catches
    // that case; it stops once IntersectionObserver reveals normally.
    const checkPosition = () => {
      ticking = false
      if (el.getBoundingClientRect().top < window.innerHeight) reveal()
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(checkPosition)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal()
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', checkPosition)
    checkPosition()

    function cleanup() {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
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
          ? `animate-in ${VARIANT_CLASSES[variant]} fill-mode-both duration-700 ease-out`
          : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
