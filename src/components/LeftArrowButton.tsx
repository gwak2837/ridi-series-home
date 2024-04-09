'use client'

import { useRouter } from 'next/navigation'

import LeftArrowIcon from '@/svgs/LeftArrowIcon'

interface Props {
  className?: string
  svgClassName?: string
}

export default function LeftArrowButton({ className = '', svgClassName = '' }: Props) {
  const router = useRouter()

  return (
    <button className={className} onClick={() => router.back()}>
      <LeftArrowIcon className={svgClassName} />
    </button>
  )
}
