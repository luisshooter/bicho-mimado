'use client'

import { useEffect, useRef } from 'react'

/**
 * Bounded scroll parallax for a single element. Only runs while the element's
 * containing section is on screen, and skips entirely under
 * prefers-reduced-motion. `strength` is the max pixel travel.
 */
export function useParallax<T extends HTMLElement>(strength = 16) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = el.closest('section')
    let active = false
    let ticking = false

    const update = () => {
      ticking = false
      if (!active) return
      const rect = (section ?? el).getBoundingClientRect()
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      const offset = Math.max(-1, Math.min(1, progress)) * strength
      el.style.transform = `translateY(${offset.toFixed(1)}px)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) onScroll()
      },
      { threshold: 0 },
    )
    io.observe(section ?? el)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [strength])

  return ref
}
