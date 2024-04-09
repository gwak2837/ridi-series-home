import { Suspense } from 'react'

import Episodes, { EpisodesSkeleton } from './Episodes'

import { type PageProps } from '@/common/types'
import DefaultErrorBoundary from '@/components/DefaultErrorBoundary'
import { type BookResponse } from '@/types/book'

async function getBookById(bookId: string) {
  const response = await fetch(`https://api.ridibooks.com/v1/books/${bookId}`)
  if (!response.ok) throw new Error('Failed to fetch book')

  const result = (await response.json()) as BookResponse
  if (!result.success) throw new Error(result.message)

  return result.data
}

export default async function Page({ params, searchParams }: PageProps) {
  const mode = searchParams.mode as string
  const bookId = params.id
  const data = await getBookById(bookId)

  const serial = data.book.serial

  return (
    <main className=" mx-auto max-w-screen-xl">
      <DefaultErrorBoundary>
        <Suspense fallback={<EpisodesSkeleton mode={mode} />}>
          <Episodes bookId={bookId} serial={serial} />
        </Suspense>
      </DefaultErrorBoundary>
    </main>
  )
}
