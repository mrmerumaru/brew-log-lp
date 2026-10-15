import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold` — drives the nav's
 * compact/translucent styling (PRD §4.1: "on scroll, the nav becomes a thin
 * translucent bar").
 */
export function useScrollNav(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
