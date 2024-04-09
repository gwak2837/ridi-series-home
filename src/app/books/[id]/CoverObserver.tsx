'use client'

import { useInView } from 'react-intersection-observer'

import CoverCarousel from '@/app/books/[id]/CoverCarousel'
import TopFixedHeader from '@/app/books/[id]/TopFixedHeader'

interface Props {
  title: string
  carouselImages: string[]
}

export default function CoverObserver({ title, carouselImages }: Props) {
  const { ref, inView } = useInView({ rootMargin: '-64px' })
  return (
    <>
      <TopFixedHeader hasBackground={!inView} title={title} />
      <CoverCarousel carouselImages={carouselImages} coverRef={ref} />
    </>
  )
}
