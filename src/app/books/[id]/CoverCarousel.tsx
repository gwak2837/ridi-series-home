'use client'

import Image from 'next/image'
import { type LegacyRef, useRef, useState } from 'react'

import CarouselItem from '@/components/CarouselItem'

interface Props {
  carouselImages: string[]
  coverRef: LegacyRef<HTMLDivElement>
}

export default function CoverCarousel({ carouselImages, coverRef }: Props) {
  const rootRef = useRef<HTMLOListElement>(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  return (
    <div ref={coverRef} className="relative">
      <ol
        ref={rootRef}
        className="no-scrollbar flex snap-x snap-mandatory snap-always overflow-x-auto"
      >
        {carouselImages.map((src, i) => (
          <CarouselItem
            key={src}
            className="relative aspect-[375/300] w-full flex-shrink-0 snap-start snap-always"
            index={i}
            rootRef={rootRef}
            {...(i === 1 && { style: { background: `url(${src}) center` } })}
            onSwipe={(index) => setCurrentItemIndex(index)}
          >
            <Image
              alt={src}
              className={'object-contain' + (i === 1 ? ' backdrop-blur-3xl' : '')}
              fill
              priority={i === 0}
              src={src}
            />
          </CarouselItem>
        ))}
      </ol>
      <div className="absolute bottom-8 right-4 rounded-full bg-[#14141433] px-[6px] py-[2px] text-[#FFFFFF66]">
        <span className="text-white">{currentItemIndex + 1}</span>
        {' / '}
        <span>{carouselImages.length}</span>
      </div>
    </div>
  )
}
