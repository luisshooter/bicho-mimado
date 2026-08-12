'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ElementType } from 'react'

type AnimatedTextProps = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

export function AnimatedText({ text, as: Tag = 'span', className, delay = 0, stagger = 0.08 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.7, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}