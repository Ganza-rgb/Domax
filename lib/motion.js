'use client'

import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const EASE = 'power3.out'

/**
 * Runs GSAP setup scoped to `scopeRef`, only when the visitor hasn't asked for
 * reduced motion. Everything created inside is reverted on unmount, so
 * timelines and ScrollTriggers never leak between pages.
 *
 * `setup` receives the scope element; selector strings inside it resolve
 * within the scope.
 */
export function useMotion(scopeRef, setup, deps = []) {
  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => setup(scope), scope)
      return () => ctx.revert()
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Fades and lifts every `[data-reveal]` element inside the scope as it
 * enters the viewport. Children marked `[data-reveal-stagger]` reveal one
 * after another.
 */
export function revealOnScroll(scope) {
  scope.querySelectorAll('[data-reveal]').forEach((el) => {
    const items = el.hasAttribute('data-reveal-stagger') ? Array.from(el.children) : [el]
    gsap.from(items, {
      autoAlpha: 0,
      y: 28,
      duration: 0.8,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
}

export { gsap, ScrollTrigger }
