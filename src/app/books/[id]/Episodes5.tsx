'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { fetchRIDI } from '@/common/react-query'
import Episode from '@/components/Episode'
import DownloadIcon from '@/svgs/DownloadIcon'
import RightArrowIcon from '@/svgs/RightArrowIcon'
import { type EpisodeResponse } from '@/types/episode'

enum EpisodeOrder {
  SEQUENTIAL = 'sequential',
  LATEST = 'latest',
}

interface Props {
  bookId: string
  episodeCount: number
}

export default function Episodes5({ bookId, episodeCount }: Props) {
  const [episodeOrder, setEpisodeOrder] = useState(EpisodeOrder.SEQUENTIAL)

  const { data } = useSuspenseQuery<EpisodeResponse>({
    queryKey: ['episode5', bookId, episodeOrder],
    queryFn: async () =>
      await fetchRIDI(`/api/v1/products?book_id=${bookId}&order=${episodeOrder}`),
  })

  const sellingBooks5 = data.data.selling_books.filter((book) => book.book.open).slice(0, 5)

  return (
    <>
      <div className="mb-[18px] mt-[26px] flex justify-between px-4">
        <Link
          className="flex items-center gap-[2px] text-sm font-semibold leading-[17px]"
          href={`${bookId}/episodes?mode=selection`}
        >
          선택 구매 / 카트 담기 <RightArrowIcon className="h-4 w-4 -translate-y-[1px]" />
        </Link>
        <div className="flex gap-1 text-[#A5A5A5]">
          <button
            aria-pressed={episodeOrder === EpisodeOrder.SEQUENTIAL}
            className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]"
            onClick={() => setEpisodeOrder(EpisodeOrder.SEQUENTIAL)}
          >
            회차순
          </button>
          ·
          <button
            aria-pressed={episodeOrder === EpisodeOrder.LATEST}
            className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]"
            onClick={() => setEpisodeOrder(EpisodeOrder.LATEST)}
          >
            최신순
          </button>
        </div>
      </div>
      <ol className="grid">
        {sellingBooks5.map((sellingBook) => (
          <Episode key={sellingBook.book.book_id} book={sellingBook.book} />
        ))}
      </ol>
      <Link
        className="flex items-center justify-center gap-[1px] border-t border-[#E6E6E6] p-4 text-center text-sm font-semibold leading-[18px]"
        href={`${bookId}/episodes`}
      >
        총 {episodeCount}화 <RightArrowIcon className="h-[14px] w-[14px] -translate-y-[1px]" />
      </Link>
    </>
  )
}

export function Episodes5Skeleton() {
  return (
    <>
      <div className="my-[26px] flex justify-between px-4">
        <span className="flex items-center gap-[2px] text-sm font-semibold leading-[17px]">
          선택 구매 / 카트 담기 <RightArrowIcon className="h-4 w-4 -translate-y-[1px]" />
        </span>
        <div className="flex gap-1 text-[#A5A5A5]">
          <button className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]">
            회차순
          </button>
          ·
          <button className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]">
            최신순
          </button>
        </div>
      </div>
      <ol className="m-4 grid gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-[67px] w-[46px] rounded bg-[#E6E6E6]" />
                <div className="grid gap-[6px]">
                  <div className="flex items-center gap-1">
                    <h4 className="h-4 w-40 rounded bg-[#E6E6E6]" />
                  </div>
                  <span className="h-[13px] w-28 rounded bg-[#E6E6E6]" />
                </div>
              </div>
              <DownloadIcon />
            </li>
          ))}
      </ol>
      <span className="flex items-center justify-center gap-[1px] border-t border-[#E6E6E6] p-4 text-center text-sm font-semibold leading-[18px] text-[#A5A5A5]">
        총 <div className="ml-[2px] h-[18px] w-4 rounded bg-[#E6E6E6]" />화
        <RightArrowIcon className="h-[14px] w-[14px] -translate-y-[1px]" />
      </span>
    </>
  )
}
