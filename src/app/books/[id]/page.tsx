import { format } from 'date-fns'
import Link from 'next/link'
import { Fragment, Suspense } from 'react'

import CoverObserver from '@/app/books/[id]/CoverObserver'
import Episodes5, { Episodes5Skeleton } from '@/app/books/[id]/Episodes5'
import Reviews10, { ReviewsSkeleton } from '@/app/books/[id]/Reviews'
import SeriesDescriptionBottomSheet from '@/app/books/[id]/SeriesDescriptionBottomSheet'
import 리다무Button from '@/app/books/[id]/리다무Button'
import { type PageProps } from '@/common/types'
import Accordion from '@/components/Accordion'
import DefaultErrorBoundary from '@/components/DefaultErrorBoundary'
import FireCrackerIcon from '@/svgs/FireCrackerIcon'
import RightArrowIcon from '@/svgs/RightArrowIcon'
import StarIcon from '@/svgs/StarIcon'
import VolumeIcon from '@/svgs/VolumeIcon'
import { type Purchase2, type BookResponse } from '@/types/book'
import { formatNumber } from '@/utils/number'

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

  const serial = data.book.serial
  const categories = data.book.categories
  const category = categories[categories.length - 1]
  const authors = data.book.authors
  const episodeCount = serial.total
  const 리다무 = serial.wait_for_free
  const 연재주기 =
    data.book_banners.find((banner) => banner.style.layout === 'schedule')?.title ?? ''
  const events = data.book_banners
    .filter((banner) => banner.style.layout === 'event')
    .sort((a, b) => new Date(b.opening_date).getTime() - new Date(a.opening_date).getTime())
  const notices = data.book_banners
    .filter((banner) => banner.style.layout === 'announcement')
    .sort((a, b) => new Date(b.opening_date).getTime() - new Date(a.opening_date).getTime())
  const ratings = data.book.ratings
  const ratingCount = ratings.reduce((acc, rating) => acc + rating.count, 0)
  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.count * rating.rating, 0) / ratingCount
  const keywords = data.keyword_info.tags
  const description = data.book.introduction.description
  const carouselImages = [serial.header_image.merged, data.book.cover.xxlarge].filter((src) => src)

  return (
    <main className="mx-auto max-w-screen-xl grid-cols-[414px_1fr] md:grid md:h-dvh">
      <div className="md:overflow-y-auto">
        <CoverObserver carouselImages={carouselImages} title={serial.title} />
        <div className="relative">
          <div className="absolute -top-4 h-4 w-full rounded-t-2xl bg-white" />
        </div>
        <div className="px-4 py-2">
          <h1 className="mb-[5px] text-xl font-bold leading-6">{serial.title}</h1>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 whitespace-nowrap text-sm leading-[17px] text-[#787878]">
              <div>{category.name}</div>
              <div className="h-4 border" />
              <div>
                {authors[0].name} {authors.length > 1 && <span>외 {authors.length - 1}명</span>}
              </div>
              <div className="h-4 border" />
              <div className="overflow-x-hidden text-ellipsis">
                {serial.completion ? `총 ${episodeCount}화 (완결)` : 연재주기}
              </div>
            </div>
            <SeriesDescriptionBottomSheet className="flex-shrink-0">
              <div className="mb-8 p-4">
                <h4 className="py-2 font-medium">키워드</h4>
                <ul className="flex flex-wrap gap-1 whitespace-nowrap">
                  {keywords.map((keyword) => (
                    <li
                      key={keyword.id}
                      className="rounded border border-[#CCC] px-[6px] py-1 text-[13px] leading-4 text-gray-600"
                    >
                      <Link href={'https://ridi.com' + keyword.resource_url} target="_blank">
                        #{keyword.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h4 className="mt-12 py-2 font-medium">작품 소개</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="whitespace-pre-line text-[#787878]"
                />
              </div>
              <div className="mb-8 p-4">
                <h4 className="py-3 font-medium">상세정보</h4>
                <dl className="grid grid-cols-[80px_1fr] gap-2 text-[#787878]">
                  <dt>카테고리</dt>
                  <dd>
                    {categories
                      .map((category) => category.name)
                      .reverse()
                      .join(' > ')}
                  </dd>
                  <dt>작가</dt>
                  <dd className="flex gap-2">
                    {authors.map((author) => (
                      <span key={author.author_id}>{author.name}</span>
                    ))}
                  </dd>
                  <dt>연재주기</dt>
                  <dd>{연재주기}</dd>
                  <dt>출판사</dt>
                  <dd>{data.book.publisher.name}</dd>
                  <dt>출간일</dt>
                  <dd>{format(data.book.publication_date, 'yyyy.MM.dd')}</dd>
                  <dt>ISBN</dt>
                  <dd>{data.book.isbn}</dd>
                </dl>
                <h4 className="mt-8 py-3 font-medium">가격</h4>
                <dl className="grid grid-cols-[80px_1fr] gap-2 text-[#787878]">
                  <dt>대여</dt>
                  <dd className="text-[#1E9EFF]">
                    {formatPurchasePriceRange(serial.rental)}
                    {formatRentalDays(serial.rental_all.days)}
                  </dd>
                  <dt>소장</dt>
                  <dd className="text-[#1E9EFF]">{formatPurchasePriceRange(serial.purchase)}</dd>
                </dl>
                <h4 className="mt-8 py-3 font-medium">작가</h4>
                <dl className="grid grid-cols-[66px_1fr] items-center gap-5">
                  {authors.map((author, i) => (
                    <Fragment key={author.author_id}>
                      <dt
                        className={`relative aspect-square w-[68px] rounded-full p-4 text-white ${bg[i]}`}
                      >
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          {author.name[0]}
                        </div>
                      </dt>
                      <dd className="grid gap-[2px]">
                        <div className="text-sm font-medium">{author.name}</div>
                        <div className="text-sm text-[#787878]">{formatRole(author.role)}</div>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
            </SeriesDescriptionBottomSheet>
          </div>
          <div className="flex flex-wrap gap-2 whitespace-nowrap text-sm leading-[17px]">
            <Link className="flex items-center gap-[1px]" href={`${bookId}/reviews`}>
              <div className="flex items-center gap-[1px]">
                <StarIcon className="-translate-y-[2px]" fill="#DC3232" />
                <div className="flex items-center gap-[1px]">
                  <span className="text-[#DC3232]">{averageRating.toFixed(1)}점</span>
                  <span>({formatNumber(ratingCount)})</span>
                </div>
              </div>
              <RightArrowIcon className="-translate-y-[1px]" />
            </Link>
            <Link className="flex items-center gap-[1px]" href={`${bookId}/comments`}>
              댓글 {formatNumber(data.comment_count)}
              <RightArrowIcon className="-translate-y-[1px]" />
            </Link>
            <Link className="flex items-center gap-[1px]" href="">
              공유하기 <RightArrowIcon className="-translate-y-[1px]" />
            </Link>
          </div>
        </div>
        <ul className="no-scrollbar mt-1 flex gap-2 overflow-x-auto whitespace-nowrap text-nowrap px-4">
          {keywords.map((keyword) => (
            <Link
              key={keyword.id}
              className="rounded border border-[#CCC] px-[6px] py-1 text-[13px] leading-4"
              href={'https://ridi.com' + keyword.resource_url}
              target="_blank"
            >
              #{keyword.name}
            </Link>
          ))}
        </ul>
        <div className="my-[14px] h-[1px] w-full bg-[#E6E6E6]" />
        <div className="grid gap-[10px] px-4 text-sm leading-[21px] text-[#787878]">
          {notices.length > 0 && (
            <Accordion contents={notices.map((notice) => notice.title)} icon={<VolumeIcon />} />
          )}
          {events.length > 0 && (
            <Accordion contents={events.map((event) => event.title)} icon={<FireCrackerIcon />} />
          )}
        </div>
        <div className="my-[26px] flex justify-between px-4">
          <Link
            className="rounded-full bg-[#141414] px-10 py-3 text-sm leading-[17px] text-white"
            href={`${bookId}/episodes/${data.book.book_id}`}
          >
            첫화보기
          </Link>
          {리다무 && <리다무Button waitForFree={리다무} />}
        </div>
        <div className="hidden h-96 md:block" />
      </div>
      <div className="md:overflow-y-auto md:border-l">
        <DefaultErrorBoundary>
          <Suspense fallback={<Episodes5Skeleton />}>
            <Episodes5 bookId={bookId} episodeCount={serial.total} />
          </Suspense>
        </DefaultErrorBoundary>
        <DefaultErrorBoundary>
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviews10 bookId={bookId} ratings={data.book.ratings} />
          </Suspense>
        </DefaultErrorBoundary>
        <div className="h-40" />
      </div>
    </main>
  )
}

function formatPurchasePriceRange(purchase: Purchase2) {
  if (purchase.max_price === 0 && purchase.min_price === 0) {
    return '무료'
  } else if (purchase.min_price === purchase.max_price) {
    return `${formatNumber(purchase.min_price)}원`
  } else if (purchase.min_price === 0) {
    return `무료 ~ ${formatNumber(purchase.max_price)}원`
  } else {
    return `${formatNumber(purchase.min_price)} ~ ${formatNumber(purchase.max_price)}원`
  }
}

function formatRentalDays(days: number) {
  if (days === 0) {
    return '(무제한)'
  } else {
    return `(${days}일)`
  }
}

function formatRole(role: string) {
  switch (role) {
    case 'story_writer':
      return '글'
    case 'illustrator':
      return '그림'
    case 'original_author':
      return '원작'
    default:
      return ''
  }
}

const bg = ['bg-teal-500', 'bg-gray-700', 'bg-violet-500', 'bg-gray-400']
