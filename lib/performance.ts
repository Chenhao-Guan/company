/**
 * Performance optimization utilities
 */

/**
 * Throttle function to limit execution rate
 * @param func Function to throttle
 * @param delay Delay in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return function (...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * Debounce function to delay execution until after calls stop
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Optimize animation settings based on user preferences
 */
export function getAnimationSettings() {
  return {
    reduceMotion: prefersReducedMotion(),
    // Only enable animations if user doesn't prefer reduced motion
    shouldAnimate: !prefersReducedMotion()
  }
}
