'use client'

import { useEffect, useCallback, useMemo, useRef, type CSSProperties } from 'react'
import { motion, useAnimationControls, stagger as motionStagger, type AnimationOptions } from 'framer-motion'

const TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span'] as const
type Tag = (typeof TAGS)[number]

interface OrigamiUnfoldScrollProps {
  text?: string
  font?: CSSProperties
  color?: string
  tag?: Tag
  startRotateY?: number
  startRotateX?: number
  startOpacity?: number
  transformOrigin?: string
  perspective?: number
  stagger?: number
  direction?: 'left-to-right' | 'right-to-left'
  transition?: AnimationOptions
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export default function OrigamiUnfoldScroll({
  text = 'Origami Unfold',
  font = {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 120,
    lineHeight: '1.5em',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  color = '#FFFFFF',
  tag = 'h1',
  startRotateY = -90,
  startRotateX = 45,
  startOpacity = 0,
  transformOrigin = 'left center',
  perspective = 1200,
  stagger = 0.03,
  direction = 'left-to-right',
  transition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.8,
  },
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: OrigamiUnfoldScrollProps) {
  const controls = useAnimationControls()
  const elementRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  const resetToHidden = useCallback(() => {
    controls.start({
      rotateY: startRotateY,
      rotateX: startRotateX,
      opacity: startOpacity / 100,
    }, { duration: 0 })
  }, [controls, startRotateY, startRotateX, startOpacity])

  const runAppear = useCallback(() => {
    if (isVisibleRef.current) return
    isVisibleRef.current = true

    const animationConfig = {
      ...transition,
      delay: motionStagger(stagger, {
        from: direction === 'right-to-left' ? 'last' : 'first',
      }),
    }

    controls.start({ rotateY: 0, rotateX: 0, opacity: 1 }, animationConfig as any)
  }, [controls, transition, stagger, direction])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    resetToHidden()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAppear()
          if (once) observer.disconnect()
        } else if (!once) {
          isVisibleRef.current = false
          resetToHidden()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [runAppear, resetToHidden, threshold, rootMargin, once])

  const safeTag = (TAGS as readonly string[]).includes(tag) ? tag : 'h1'
  const MotionTag = motion[safeTag] as any
  const chars = useMemo(() => (text ?? '').split(''), [text])

  return (
    <div
      ref={elementRef}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent:
          font.textAlign === 'right'
            ? 'flex-end'
            : font.textAlign === 'center'
              ? 'center'
              : 'flex-start',
        overflow: 'visible',
      }}
    >
      <MotionTag
        aria-label={text}
        style={{
          margin: 0,
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
          ...font,
          color,
          perspective,
        }}
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            className='char'
            aria-hidden='true'
            animate={controls}
            initial={{ rotateY: startRotateY, rotateX: startRotateX, opacity: startOpacity / 100 }}
            style={{
              display: 'inline-block',
              transformOrigin,
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionTag>
    </div>
  )
}