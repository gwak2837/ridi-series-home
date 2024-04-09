'use client'

import LeftArrowButton from '@/components/LeftArrowButton'
import BellIcon from '@/svgs/BellIcon'
import HeartIcon from '@/svgs/HeartIcon'

interface Props {
  hasBackground: boolean
  title: string
}

export default function TopFixedHeader({ hasBackground, title }: Props) {
  const translateY = hasBackground ? 'translate-y-0' : 'translate-y-11'
  const bgColor = hasBackground ? 'bg-white' : 'bg-transparent'
  const fillColor = hasBackground ? 'fill-black dark:fill-white' : 'fill-white'
  const show = hasBackground ? 'block' : 'hidden'

  return (
    <div
      className={`pointer-events-none fixed left-0 right-0 top-0 z-10 mx-auto max-w-screen-xl transition-colors ${bgColor}`}
    >
      <div
        className={`relative flex items-center justify-between gap-4 px-4 py-3 md:max-w-[414px] ${translateY}`}
      >
        <LeftArrowButton className="pointer-events-auto" svgClassName={fillColor} />
        <div className={`absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 ${show}`}>
          {title}
        </div>
        <div className="pointer-events-auto flex items-center gap-4">
          <HeartIcon className={fillColor} />
          <BellIcon className={fillColor} />
        </div>
      </div>
    </div>
  )
}
