'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ReactNode } from 'react'

type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  variant?: 'fade' | 'slide-up' | 'zoom' | 'slide-left' | 'slide-right'
  delay?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  children?: ReactNode
}

const VARIANT_CLASSES: Record<NonNullable<ImageRevealProps['variant']>, string> = {
  fade: 'fade-in',
  'slide-up': 'fade-in slide-in-from-bottom-8',
  zoom: 'fade-in zoom-in-95',
  'slide-left': 'fade-in slide-in-from-left-8',
  'slide-right': 'fade-in slide-in-from-right-8',
}

export function ImageReveal({
  src,
  alt,
  className = '',
  fill = false,
  sizes,
  priority = false,
  variant = 'slide-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  children,
}: ImageRevealProps) {
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
      { threshold, rootMargin }
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
  }, [threshold, rootMargin, once])

  const containerClasses = `
    ${className} 
    ${visible ? `animate-in ${VARIANT_CLASSES[variant]} fill-mode-both duration-700 ease-out` : 'opacity-0 invisible'}
  `

  const containerStyle = {
    ...(delay ? { animationDelay: `${delay}ms` } : {}),
    ...(fill ? { position: 'relative' as const, width: '100%', height: '100%' } : {}),
  }

  return (
    <div ref={ref} style={containerStyle} className={containerClasses.trim()}>
      {fill ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {children}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
    </div>
  )
}