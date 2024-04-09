import { type RefObject, type ReactNode, useEffect, type CSSProperties } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  rootRef: RefObject<HTMLElement>
  className?: string
  index: number
  onSwipe: (index: number) => void
  children: ReactNode
  style?: CSSProperties
}

export default function CarouselItem({
  style,
  rootRef,
  index,
  onSwipe,
  children,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.8, root: rootRef.current })

  useEffect(() => {
    if (inView) {
      onSwipe(index)
    }
  }, [inView])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
