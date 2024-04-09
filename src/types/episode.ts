/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EpisodeResponse {
  success: boolean
  message: any
  data: EpisodeData
}

export interface EpisodeData {
  last_read_book: any
  last_purchased_book: any
  purchase: Purchase
  rental: Rental
  purchase_all: PurchaseAll
  rental_all: RentalAll
  selling_books: SellingBook[]
  pagination: Pagination
}

export interface Purchase {
  max_sale_price: number
  min_sale_price: number
  min_sale_price_non_zero: number
  max_full_price: number
  min_full_price: number
}

export interface Rental {
  max_sale_price: number
  min_sale_price: number
  min_sale_price_non_zero: number
  max_full_price: number
  min_full_price: number
  max_days: number
  min_days: number
}

export interface PurchaseAll {
  full_price: number
  sale_price: number
  discount_rate: any
  max_discount_rate: number
  min_discount_rate: number
}

export interface RentalAll {
  full_price: number
  sale_price: number
  days: any
  discount_rate: any
  max_discount_rate: number
  min_discount_rate: number
}

export interface SellingBook {
  book: Book
  is_wait_free_available: boolean
  ownership: any
}

export interface Book {
  book_id: string
  title: string
  set: any
  adults_only: boolean
  open: boolean
  registration_date: string
  publication_date: string
  file: File
  purchase: Purchase2
  rental: Rental2
  style: Style
  serial: Serial
  categories: Category[]
  thumbnail: string
  scheduled_free: any
  is_original: boolean
  is_only: boolean
  trial: boolean
  ridiselect: boolean
}

export interface File {
  size: number
  variants: Variant[]
  format: string
  page_count: number
  character_count: any
  comic: boolean
  webtoon: boolean
}

export interface Variant {
  quality: string
  size: number
}

export interface Purchase2 {
  full_price: number
  sale_price: number
}

export interface Rental2 {
  full_price: number
  sale_price: number
  days: number
  pointback: any
}

export interface Style {
  layout: string
}

export interface Serial {
  title: string
  scheduled_free: ScheduledFree
  free: Free
}

export interface ScheduledFree {
  active: boolean
  remain_episodes_count: number
}

export interface Free {
  purchase: number
  rental: number
}

export interface Category {
  category_id: number
  name: string
  genre: string
  parent_id: number
  priority?: number
  use_series: string
}

export interface Pagination {
  next_page: string
  prev_page: any
}
