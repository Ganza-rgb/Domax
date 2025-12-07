'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook for page entrance animations
 * Animates elements on page load
 */
export function usePageAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate main container
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

/**
 * Hook for scroll-triggered animations
 * Animates elements when they come into view
 */
export function useScrollAnimation(options = {}) {
  const {
    trigger = null,
    start = 'top 80%',
    end = 'bottom 20%',
    animation = { opacity: 0, y: 50 },
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
  } = options

  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll('[data-animate]')
    if (elements.length === 0) return

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        const animationType = element.dataset.animate || 'fadeUp'
        let animProps = { ...animation }

        // Predefined animation types
        switch (animationType) {
          case 'fadeUp':
            animProps = { opacity: 0, y: 50 }
            break
          case 'fadeDown':
            animProps = { opacity: 0, y: -50 }
            break
          case 'fadeLeft':
            animProps = { opacity: 0, x: 50 }
            break
          case 'fadeRight':
            animProps = { opacity: 0, x: -50 }
            break
          case 'scale':
            animProps = { opacity: 0, scale: 0.8 }
            break
          case 'rotate':
            animProps = { opacity: 0, rotation: -10 }
            break
        }

        gsap.fromTo(
          element,
          animProps,
          {
            ...animProps,
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: trigger || element,
              start,
              end,
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [trigger, start, end, duration, ease])

  return ref
}

/**
 * Hook for staggered list/grid animations
 */
export function useStaggerAnimation(options = {}) {
  const {
    selector = '[data-stagger]',
    start = 'top 80%',
    stagger = 0.15,
    duration = 0.6,
    ease = 'power2.out',
    animation = { opacity: 0, y: 30 },
  } = options

  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll(selector)
    if (elements.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        animation,
        {
          ...animation,
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [selector, start, stagger, duration, ease])

  return ref
}

/**
 * Hook for hero section animations
 */
export function useHeroAnimation() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      const title = heroRef.current.querySelector('h1, [data-hero-title]')
      const subtitle = heroRef.current.querySelector('p, [data-hero-subtitle]')
      const buttons = heroRef.current.querySelectorAll('a, button, [data-hero-button]')
      const image = heroRef.current.querySelector('img, [data-hero-image]')

      const tl = gsap.timeline()

      if (title) {
        tl.from(title, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        })
      }

      if (subtitle) {
        tl.from(
          subtitle,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
      }

      if (buttons.length > 0) {
        tl.from(
          buttons,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        )
      }

      if (image) {
        tl.from(
          image,
          {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.8'
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return heroRef
}

/**
 * Utility function to animate elements on mount
 */
export function animateOnMount(elements, options = {}) {
  const {
    opacity = 0,
    y = 30,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    ease = 'power3.out',
  } = options

  if (!elements || elements.length === 0) return

  gsap.fromTo(
    elements,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
    }
  )
}

/**
 * Utility function for scroll-triggered animations
 */
export function animateOnScroll(elements, options = {}) {
  const {
    trigger = null,
    start = 'top 80%',
    opacity = 0,
    y = 50,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
  } = options

  if (!elements || elements.length === 0) return

  elements.forEach((element, index) => {
    gsap.fromTo(
      element,
      { opacity, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: index * stagger,
        ease,
        scrollTrigger: {
          trigger: trigger || element,
          start,
          toggleActions: 'play none none none',
        },
      }
    )
  })
}










