'use client'

import {
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

const CLOSE_THRESHOLD = 0.8

interface Props {
  className?: string
  children: ReactNode
  open: boolean
  onClose?: () => void
  showDragButton?: boolean
}

export default function BottomSheet({
  className = '',
  children,
  open,
  onClose,
  showDragButton,
}: Props) {
  function closeBottomSheet(e: MouseEvent) {
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

  // --
  const bottomSheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bottomSheet = bottomSheetRef.current
    if (!bottomSheet) return

    const invalidPosition =
      window.innerHeight * CLOSE_THRESHOLD < +bottomSheet.style.top.slice(0, -2)

    if (open && invalidPosition) {
      bottomSheet.style.removeProperty('top')
    }
  }, [open])

  function dragBottomSheetByMouse(event: MouseEvent) {
    const bottomSheet = bottomSheetRef.current
    if (!bottomSheet) return

    const bottomSheetRect = bottomSheet.getBoundingClientRect()
    const bottomSheetStyle = bottomSheet.style

    let shiftY = event.clientY - bottomSheetRect.top

    function moveBottomSheet(event: globalThis.MouseEvent) {
      bottomSheetStyle.top = Math.max(8, event.clientY - shiftY) + 'px'
    }

    document.addEventListener('mousemove', moveBottomSheet)
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', moveBottomSheet)
        if (window.innerHeight * CLOSE_THRESHOLD < +bottomSheetStyle.top.slice(0, -2)) onClose?.()
      },
      { once: true },
    )
  }

  function dragBottomSheetByTouch(event: TouchEvent) {
    const bottomSheet = bottomSheetRef.current
    if (!bottomSheet) return

    const bottomSheetRect = bottomSheet.getBoundingClientRect()
    const bottomSheetStyle = bottomSheet.style

    let shiftY = event.touches[0].clientY - bottomSheetRect.top

    function moveBottomSheet(event: globalThis.TouchEvent) {
      bottomSheetStyle.top = Math.max(8, event.touches[0].clientY - shiftY) + 'px'
    }

    document.addEventListener('touchmove', moveBottomSheet)
    document.addEventListener(
      'touchend',
      () => {
        document.removeEventListener('touchmove', moveBottomSheet)
        if (window.innerHeight * CLOSE_THRESHOLD < +bottomSheetStyle.top.slice(0, -2)) onClose?.()
      },
      { once: true },
    )
    document.addEventListener(
      'touchcancel',
      () => {
        document.removeEventListener('touchmove', moveBottomSheet)
        if (window.innerHeight * CLOSE_THRESHOLD < +bottomSheetStyle.top.slice(0, -2)) onClose?.()
      },
      { once: true },
    )
  }

  const visible = open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
  const backgroundClass = `fixed inset-0 z-20 flex items-center justify-center bg-black/20 transition duration-300 ${visible}`
  const animation = open ? 'translate-y-0' : 'translate-y-full'
  const foregroundClass = `absolute w-full max-w-screen-xl bottom-0 top-1/2 transition duration-300 ${animation} ${className}`

  // --
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className={backgroundClass} onClick={closeBottomSheet}>
      <div
        ref={showDragButton ? bottomSheetRef : null}
        className={foregroundClass}
        onClick={(e) => e.stopPropagation()}
      >
        {showDragButton && (
          <div
            className="absolute left-0 right-0 top-0 z-10 flex h-4 cursor-move justify-center p-2 pb-6"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={dragBottomSheetByMouse}
            onTouchStart={dragBottomSheetByTouch}
          >
            <div className="h-1 w-8 rounded-full bg-slate-200" />
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById('bottom-sheet-root') ?? document.body,
  )
}
