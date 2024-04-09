'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchRIDI } from '@/common/react-query'
import { ReviewBuyerOnly, ReviewOrder, type ReviewsResponse } from '@/types/review'
import { addAPIPrefix } from '@/utils/url'

const REVIEWS_LIMIT = 20

interface Props {
  bookId: string
}

export default function Reviews({ bookId }: Props) {
  const [reviewOrder, setReviewOrder] = useState(ReviewOrder.LIKE)
  const [isBuyerOnly, setIsBuyerOnly] = useState(ReviewBuyerOnly.TRUE)

  const { data, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery<ReviewsResponse>({
    queryKey: ['review', bookId, reviewOrder, isBuyerOnly],
    initialPageParam: `/api/v1/reviews?limit=${REVIEWS_LIMIT}&query=book:${bookId}+and+buyer_only:${isBuyerOnly}+and+order:${reviewOrder}+and+spoiler:0+and+status:visible`,
    queryFn: async ({ pageParam }) => await fetchRIDI(pageParam as string),
    getNextPageParam: (lastPage) => addAPIPrefix(lastPage.data.pagination.next_page),
    getPreviousPageParam: (firstPage) => addAPIPrefix(firstPage.data.pagination.prev_page),
    maxPages: 4,
  })

  const reviews = data.pages.flatMap((page) => page.data.reviews)

  const { ref, inView } = useInView({ rootMargin: '150px' })

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [inView, isFetchingNextPage])

  const searchParams = useSearchParams()
  const reviewIdScrolledTo = +(searchParams.get('id') ?? 0)
  const reviewRef = useRef<HTMLLIElement>()
  const [reviewInViewRef, isReviewInview] = useInView()

  // https://github.com/thebuilder/react-intersection-observer?tab=readme-ov-file#how-can-i-assign-multiple-refs-to-a-component
  const setRefs = useCallback(
    (node: HTMLLIElement) => {
      reviewRef.current = node
      reviewInViewRef(node)
    },
    [reviewInViewRef],
  )

  useEffect(() => {
    if (reviewIdScrolledTo && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [reviewIdScrolledTo])

  const router = useRouter()

  useEffect(() => {
    if (isReviewInview) {
      setTimeout(() => {
        router.replace('?', { scroll: false })
      }, 3000)
    }
  }, [isReviewInview])

  function getBackgroundColor(reviewId: number) {
    return isReviewInview
      ? 'bg-white'
      : reviewId === reviewIdScrolledTo
        ? 'bg-[#F7F7F7]'
        : 'bg-white'
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
        <button
          aria-pressed={isBuyerOnly === ReviewBuyerOnly.TRUE}
          onClick={() => setIsBuyerOnly(ReviewBuyerOnly.TRUE)}
        >
          구매자
        </button>
        <button
          aria-pressed={isBuyerOnly === ReviewBuyerOnly.FALSE}
          onClick={() => setIsBuyerOnly(ReviewBuyerOnly.FALSE)}
        >
          전체
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
        <button
          aria-pressed={reviewOrder === ReviewOrder.RECENT}
          onClick={() => setReviewOrder(ReviewOrder.RECENT)}
        >
          최신순
        </button>
        <button
          aria-pressed={reviewOrder === ReviewOrder.LIKE}
          onClick={() => setReviewOrder(ReviewOrder.LIKE)}
        >
          공감순
        </button>
      </div>
      <ul className="gap-[6px] overflow-x-auto">
        {reviews.map((review) => (
          <li
            key={review.review_id}
            ref={review.review_id === reviewIdScrolledTo ? setRefs : null}
            className={`flex scroll-mt-20 flex-col justify-between gap-4 rounded border p-5 transition-colors delay-1000 duration-500 ${getBackgroundColor(review.review_id)}`}
          >
            <p className="overflow-y-hidden">{review.content}</p>
            <div>{review.rating}</div>
            <div>{format(review.created_at, 'yyyy.MM.dd')}</div>
          </li>
        ))}
      </ul>
      <div ref={ref} className="h-4" />
    </>
  )
}
