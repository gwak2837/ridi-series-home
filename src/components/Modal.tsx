'use client'

import { type MouseEvent, type ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
  open: boolean
  onClose?: () => void
  className?: string
}

export default function Modal({ className = '', children, open, onClose }: Props) {
  function closeModal(e: MouseEvent) {
    e.stopPropagation()
    onClose?.()
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose?.()
      }
    }

    if (open) {
      const bodyStyle = document.body.style

      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'
      bodyStyle.touchAction = 'none'

      return () => {
        document.removeEventListener('keydown', closeOnEscapeKey, false)
        bodyStyle.overflow = ''
        bodyStyle.touchAction = ''
      }
    }
  }, [onClose, open])

  const modalBackground = `fixed inset-0 z-20 flex items-center justify-center bg-black/50 transition duration-300 ${
    open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
  }`

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className={modalBackground} onClick={closeModal}>
      <div
        className={`absolute transition duration-300 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') ?? document.body,
  )
}
