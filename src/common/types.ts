import { type ReactNode } from 'react'

export type LayoutProps<T extends Record<string, unknown> = Record<string, string>> = {
  children: ReactNode
  params: T
}

export type PageProps<T extends Record<string, unknown> = Record<string, string>> = {
  params: T
  searchParams: Record<string, string | string[] | undefined>
}

export type ErrorProps = {
  error: Error
  reset: () => void
}

export type RouteProps = {
  params: Record<string, string>
}

export type Params = {
  lang: 'ko' | 'en'
  postId: string
  questionCount: string
}
