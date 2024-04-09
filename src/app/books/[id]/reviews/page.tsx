import { Fragment, Suspense } from 'react'

import Reviews from './Reviews'

import ReviewSubmitForm from '@/app/books/[id]/reviews/ReviewSubmitForm'
import { type PageProps } from '@/common/types'
import DefaultErrorBoundary from '@/components/DefaultErrorBoundary'
import LeftArrowButton from '@/components/LeftArrowButton'
import Star5 from '@/components/Star5'
import StarIcon from '@/svgs/StarIcon'
import { type BookResponse } from '@/types/book'
import { formatNumber } from '@/utils/number'

export const revalidate = 3600

async function getBookById(bookId: string) {
  const response = await fetch(`https://api.ridibooks.com/v1/books/${bookId}`)
  if (!response.ok) throw new Error('Failed to fetch book')

  const result = (await response.json()) as BookResponse
  if (!result.success) throw new Error(result.message)

  return result.data
}

export default async function Page({ params }: PageProps) {
  const bookId = params.id
  const data = await getBookById(bookId)

  const ratings = data.book.ratings
  const ratingCount = ratings.reduce((acc, rating) => acc + rating.count, 0)
  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.count * rating.rating, 0) / ratingCount

  function getRatingRatio(rating: number) {
    return `${(100 * (ratings.find((r) => r.rating === rating)?.count ?? 0)) / ratingCount}%`
  }

  return (
    <main className="mx-auto max-w-screen-xl">
      <div className="sticky top-0 z-10 bg-[#141414] p-4 text-white">
        <LeftArrowButton className="absolute left-4 top-1/2 -translate-y-1/2 fill-white" />
        <h1 className="text-center">리뷰 보기</h1>
      </div>
      <div className="flex justify-between gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="grid">
            <div className="text-center text-sm font-medium text-[#787878]">구매자 별점</div>
            <Star5 className="mx-auto" starCount={averageRating} />
          </div>
          <div className="translate-y-1 text-4xl font-bold">{averageRating.toFixed(1)}</div>
        </div>
        <div className="grid">
          <div className="text-sm text-[#A5A5A5]">
            <span className="font-semibold text-[#787878]">{formatNumber(ratingCount)}</span>명이
            평가함
          </div>
          <label className="relative w-full text-right text-[13px] font-semibold text-[#787878]">
            <input className="peer hidden" type="checkbox" />
            별점 분포 보기 <span className="inline peer-checked:hidden">ㅜ</span>
            <span className="hidden peer-checked:inline">ㅗ</span>
            <div className="absolute right-0 top-6 hidden rounded border-2 border-gray-500 bg-white p-2 font-bold peer-checked:block">
              <div className="grid grid-cols-[1.5rem_1fr] items-center gap-1">
                {[5, 4, 3, 2, 1].map((number) => (
                  <Fragment key={number}>
                    <div className="flex items-center gap-[2px]">
                      <StarIcon fill="#787878" />
                      <span className="translate-y-[2px]">{number}</span>{' '}
                    </div>
                    <div className="relative h-4 w-20 bg-slate-200">
                      <div
                        className="absolute inset-0 bg-slate-800"
                        style={{ width: getRatingRatio(number) }}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </label>
        </div>
      </div>
      <ReviewSubmitForm bookId={bookId} />
      <DefaultErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Reviews bookId={bookId} />
        </Suspense>
      </DefaultErrorBoundary>
    </main>
  )
}
