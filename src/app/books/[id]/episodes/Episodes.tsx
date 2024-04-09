'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import LeftArrowButton from '../../../../components/LeftArrowButton'

import { fetchRIDI } from '@/common/react-query'
import Episode from '@/components/Episode'
import CartIcon from '@/svgs/CartIcon'
import CheckboxIcon from '@/svgs/CheckboxIcon'
import DownloadIcon from '@/svgs/DownloadIcon'
import HeartIcon from '@/svgs/HeartIcon'
import RightArrowIcon from '@/svgs/RightArrowIcon'
import { type Serial } from '@/types/book'
import { type EpisodeResponse } from '@/types/episode'
import { formatNumber } from '@/utils/number'
import { addAPIPrefix } from '@/utils/url'

enum EpisodeOrder {
  SEQUENTIAL = 'sequential',
  LATEST = 'latest',
}

enum EpisodeBuyTab {
  대여 = '대여',
  소장 = '소장',
}

interface Props {
  bookId: string
  serial: Serial
}

export default function Episodes({ bookId, serial }: Props) {
  const router = useRouter()

  function setSelectionMode() {
    router.push(`?mode=selection`)
  }

  const [episodeOrder, setEpisodeOrder] = useState(EpisodeOrder.SEQUENTIAL)

  const { data, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery<EpisodeResponse>({
    queryKey: ['episode', bookId, episodeOrder],
    initialPageParam: `/api/v1/products?book_id=${bookId}&order=${episodeOrder}`,
    queryFn: async ({ pageParam }) => await fetchRIDI(pageParam as string),
    getNextPageParam: (lastPage) => addAPIPrefix(lastPage.data.pagination.next_page),
  })

  const sellingBooks = data.pages.flatMap((page) => page.data.selling_books)

  const { ref, inView } = useInView({ rootMargin: '150px' })

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [inView, isFetchingNextPage])

  const searchParams = useSearchParams()
  const isSelectionMode = searchParams.get('mode') === 'selection'
  const [tab, setTab] = useState(EpisodeBuyTab.대여)

  const [selectedEpisodes, setSelectedEpisodes] = useState(Array(sellingBooks.length).fill(false))
  const isAllSelected = selectedEpisodes.every((selected) => selected)
  const isSomeSelected = selectedEpisodes.some((selected) => selected)
  const selectedEpisodeCount = selectedEpisodes.filter((selected) => selected).length
  const totalPrice = selectedEpisodeCount * 300 // TODO: 가격 계산

  useEffect(() => {
    setSelectedEpisodes((pre) => {
      const newlyFetchedEpisodeCount = sellingBooks.length - pre.length
      return newlyFetchedEpisodeCount > 0
        ? [...pre, ...Array(newlyFetchedEpisodeCount).fill(false)]
        : Array(sellingBooks.length).fill(false)
    })
  }, [sellingBooks.length])

  function toggleSelectedEpisodes(e: ChangeEvent<HTMLInputElement>) {
    setSelectedEpisodes(Array(sellingBooks.length).fill(e.target.checked))
  }

  function toggleSelectedEpisode(i: number) {
    setSelectedEpisodes((prev) => prev.map((selected, j) => (i === j ? !selected : selected)))
  }

  return (
    <>
      <div className="sticky top-0 bg-white text-center">
        <h1 className="relative flex justify-center gap-2 whitespace-nowrap px-8 pb-3 pt-4 text-[17px] font-semibold leading-5">
          <LeftArrowButton className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
          <span className="overflow-hidden text-ellipsis">{serial.title}</span>
          <span>총 {serial.total}화</span>
        </h1>
        {isSelectionMode && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))] text-[15px] font-medium leading-[18px]">
            <button
              aria-pressed={tab === EpisodeBuyTab.대여}
              className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:font-bold aria-pressed:text-black"
              onClick={() => setTab(EpisodeBuyTab.대여)}
            >
              대여
            </button>
            <button
              aria-pressed={tab === EpisodeBuyTab.소장}
              className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:font-bold aria-pressed:text-black"
              onClick={() => setTab(EpisodeBuyTab.소장)}
            >
              소장
            </button>
          </div>
        )}
        <div className="flex justify-between px-4 pb-[9px] pt-[18px]">
          {isSelectionMode ? (
            <label className="flex gap-[5px]">
              <CheckboxIcon checked={isAllSelected} />
              전체 선택 {selectedEpisodeCount > 0 && `(${selectedEpisodeCount})`}
              <input className="hidden" type="checkbox" onChange={toggleSelectedEpisodes} />
            </label>
          ) : (
            <button
              className="flex items-center gap-[2px] text-sm font-semibold leading-[17px]"
              onClick={setSelectionMode}
            >
              선택 구매 / 카트 담기 <RightArrowIcon className="h-4 w-4 -translate-y-[1px]" />
            </button>
          )}
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
      </div>
      <ol className="my-2 grid">
        {sellingBooks.map((sellingBook, i) => (
          <Episode
            key={sellingBook.book.book_id}
            book={sellingBook.book}
            selected={isSelectionMode ? selectedEpisodes[i] : undefined}
            onClick={() => isSelectionMode && toggleSelectedEpisode(i)}
          />
        ))}
      </ol>
      <div ref={ref} className="h-4" />
      {isSelectionMode && isSomeSelected && (
        <div className="sticky bottom-0 grid w-full grid-cols-[auto_1fr] gap-[10px] border-t bg-white pb-[22px] pl-[10px] pr-4 pt-2">
          <div className="flex">
            <button className="hidden items-center gap-[3px] px-4 py-1 md:grid">
              <HeartIcon />
              <div className="text-[13px] leading-[15px]">위시</div>
            </button>
            <button className="grid items-center gap-[3px] px-4 py-1">
              <CartIcon />
              <div className="text-[13px] leading-[15px]">카트</div>
            </button>
          </div>
          <button className="rounded-md bg-[#1E9EFF] px-4 py-[9px] text-center">
            <div className="text-[15px] font-semibold leading-[18px] text-white">
              총 {selectedEpisodeCount}화 {tab}
            </div>
            <div className="text-[10px] font-medium leading-[12px] text-[#FFFFFFCC]">
              {formatNumber(totalPrice)}원
            </div>
          </button>
        </div>
      )}
    </>
  )
}

interface EpisodesSkeletonProps {
  mode: string
}

export function EpisodesSkeleton({ mode }: EpisodesSkeletonProps) {
  const isSelectionMode = mode === 'selection'
  return (
    <>
      <div className="sticky top-0 bg-white text-center">
        <h1 className="relative flex justify-center gap-2 whitespace-nowrap px-8 pb-3 pt-4 text-[17px] font-semibold leading-5">
          <LeftArrowButton className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
          <span className="h-5 w-10 translate-y-1 rounded bg-[#E6E6E6]" />
          <span>
            총 <span className="inline-block h-5 w-5 translate-y-1 rounded bg-[#E6E6E6]" />화
          </span>
        </h1>
        {isSelectionMode && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))] text-[15px] font-medium leading-[18px]">
            <button
              aria-pressed
              className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:font-bold aria-pressed:text-black"
            >
              대여
            </button>
            <button className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:font-bold aria-pressed:text-black">
              소장
            </button>
          </div>
        )}
        <div className="flex justify-between px-4 pb-[9px] pt-[18px]">
          {isSelectionMode ? (
            <label className="flex gap-[5px]">
              <CheckboxIcon checked={false} />
              전체 선택
              <input className="hidden" type="checkbox" />
            </label>
          ) : (
            <button className="flex items-center gap-[2px] text-sm font-semibold leading-[17px]">
              선택 구매 / 카트 담기 <RightArrowIcon className="h-4 w-4 -translate-y-[1px]" />
            </button>
          )}

          <div className="flex gap-1 text-[#A5A5A5]">
            <button
              aria-pressed
              className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]"
            >
              회차순
            </button>
            ·
            <button className="text-sm font-medium leading-[17px] aria-pressed:text-[#141414]">
              최신순
            </button>
          </div>
        </div>
      </div>
      <ol className="my-2 grid">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                {isSelectionMode && <CheckboxIcon checked={false} className="mr-1" />}
                <div className="h-[67px] w-[46px] rounded bg-[#E6E6E6]" />
                <div className="grid gap-[6px]">
                  <div className="flex items-center gap-1">
                    <h4 className="h-4 w-40 rounded bg-[#E6E6E6]" />
                  </div>
                  <span className="h-[13px] w-28 rounded bg-[#E6E6E6]" />
                </div>
              </div>
              {!isSelectionMode && <DownloadIcon />}
            </li>
          ))}
      </ol>
    </>
  )
}
