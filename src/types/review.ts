export interface ReviewsResponse {
  success: boolean
  message: string | null
  data: ReviewsData
}

export interface ReviewsData {
  reviews: Review[]
  pagination: Pagination
}

export interface Review {
  spoiler: boolean
  rating: number
  content: string
  status: string
  review_id: number
  book_id: string
  user_id: string
  verified_buyer: boolean
  like_count: number
  created_at: string
  is_like: boolean
  is_screened: boolean
}

export interface Pagination {
  next_page: string | null
  prev_page: string | null
}

export enum ReviewOrder {
  LIKE = 'like',
  RECENT = 'recent',
}

export enum ReviewBuyerOnly {
  FALSE,
  TRUE,
}
