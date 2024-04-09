'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Link from 'next/link'

import { fetchRIDI } from '@/common/react-query'
import Star5 from '@/components/Star5'
import 구매자Badge from '@/svgs/구매자Badge'
import { type Rating } from '@/types/book'
import { ReviewBuyerOnly, ReviewOrder, type ReviewsResponse } from '@/types/review'
import { formatNumber } from '@/utils/number'

interface Props {
  bookId: string
  ratings: Rating[]
}

export default function Reviews10({ bookId, ratings }: Props) {
  const ratingCount = ratings.reduce((acc, rating) => acc + rating.count, 0)
  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.count * rating.rating, 0) / ratingCount

  const { data } = useSuspenseQuery<ReviewsResponse>({
    queryKey: ['episode10', bookId, ReviewBuyerOnly.TRUE, ReviewOrder.LIKE],
    queryFn: async () =>
      await fetchRIDI(
        `/api/v1/reviews?limit=10&query=book:${bookId}+and+buyer_only:1+and+order:like+and+spoiler:0+and+status:visible`,
      ),
  })

  return (
    <>
      <div className="mt-6 flex justify-between px-4 py-[10px]">
        <h3 className="text-lg font-bold leading-[22px]">리뷰</h3>
        <Link
          className="text-sm font-medium leading-[17px] text-[#A5A5A5]"
          href={`${bookId}/reviews`}
          target="_blank"
        >
          더보기
        </Link>
      </div>
      <ul className="no-scrollbar flex h-[203px] snap-x snap-mandatory snap-always gap-[6px] overflow-x-auto px-4">
        <Link
          className="flex h-full flex-[0_0_203px] snap-start snap-always scroll-mx-4 flex-col items-center justify-center rounded-md border"
          href={`${bookId}/reviews`}
        >
          <div className="text-2xl font-medium leading-[29px]">{averageRating.toFixed(1)}</div>
          <Star5 className="mt-[1.5px]" starCount={averageRating} />
          <div className="mt-[9.5px] text-[13px] leading-4 text-[#A5A5A5]">
            {formatNumber(ratingCount)}명 평가
          </div>
        </Link>
        {data?.data.reviews.map((review) => (
          <Link
            key={review.review_id}
            className="flex flex-[0_0_310px] snap-start snap-always scroll-mx-4 flex-col justify-between rounded-md border p-5"
            href={`${bookId}/reviews?id=${review.review_id}`}
          >
            <div>
              <Star5 starCount={review.rating} />
              <div className="mt-[10px] flex items-center gap-1 text-[13px] leading-4 text-[#A5A5A5]">
                {review.verified_buyer && <구매자Badge />}
                <div>{review.user_id}</div>
                <div className="mx-[2px] h-[10px] w-[0.5px] flex-shrink-0 bg-[#E6E6E6]" />
                <div>{format(review.created_at, 'yyyy.MM.dd')}</div>
              </div>
              <p className="mt-4 line-clamp-4 text-sm leading-[22px]">{review.content}</p>
            </div>
            <div className="text-[13px] leading-4 text-[#A5A5A5]">👍 {review.like_count}</div>
          </Link>
        ))}
      </ul>
    </>
  )
}

export function ReviewsSkeleton() {
  return (
    <>
      <div className="mt-6 flex justify-between px-4 py-[10px]">
        <h3 className="text-lg font-bold leading-[22px]">리뷰</h3>
        <span className="text-sm font-medium leading-[17px] text-[#A5A5A5]">더보기</span>
      </div>
      <ul className="no-scrollbar flex h-[203px] snap-x snap-mandatory snap-always gap-[6px] overflow-x-auto px-4">
        <a className="flex h-full flex-[0_0_203px] snap-start snap-always scroll-mx-4 flex-col items-center justify-center rounded-md border">
          <div className="h-[29px] w-8 rounded bg-[#E6E6E6]" />
          <Star5 className="mt-[1.5px]" starCount={0} />
          <div className="mt-[9.5px] flex items-center gap-1 text-[13px]  text-[#A5A5A5]">
            <div className="h-[16px] w-10 rounded bg-[#E6E6E6]" />명 평가
          </div>
        </a>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <a
              key={i}
              className="flex flex-[0_0_310px] snap-start snap-always scroll-mx-4 flex-col justify-between rounded-md border p-5 "
            >
              <div>
                <Star5 starCount={0} />
                <div className="mt-[10px] flex items-center gap-1">
                  <div className="h-4 w-8 rounded bg-[#E6E6E6]" />
                  <div className="mx-[2px] h-[10px] w-[0.5px] flex-shrink-0 bg-[#E6E6E6]" />
                  <div className="h-4 w-16 rounded bg-[#E6E6E6]" />
                </div>
                <p className="mt-4 h-[22px] rounded bg-[#E6E6E6]" />
              </div>
              <div className="flex items-center gap-1 text-[13px] leading-4">
                👍 <div className="h-4 w-8 rounded bg-[#E6E6E6]" />
              </div>
            </a>
          ))}
      </ul>
    </>
  )
}
