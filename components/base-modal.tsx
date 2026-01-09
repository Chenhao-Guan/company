"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useRef, ReactNode } from "react"
import { ANIMATION, MODAL } from "@/lib/constants"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  titleId: string
  children: ReactNode
  maxWidth?: "6xl" | "5xl" | "4xl"
  size?: "product" | "news"
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

export default function BaseModal({
  isOpen,
  onClose,
  titleId,
  children,
  size = "product",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: BaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose, closeOnEscape])

  // Focus trap inside modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const maxWidthClass = size === "product" ? "max-w-6xl" : "max-w-5xl"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ zIndex: MODAL.Z_INDEX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        {closeOnBackdropClick && (
          <motion.div
            className={`absolute inset-0 bg-black/50 backdrop-blur-${MODAL.BACKDROP_BLUR}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}

        {/* Modal */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto ${maxWidthClass}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{
            type: "spring",
            damping: ANIMATION.MODAL_DAMPING,
            stiffness: ANIMATION.MODAL_STIFFNESS,
          }}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
            </button>
          )}

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
