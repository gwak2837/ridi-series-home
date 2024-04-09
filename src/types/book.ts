/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookResponse {
  success: boolean
  message: any
  data: BookData
}

export interface BookData {
  book: Book
  book_banners: BookBanner[]
  collections: any[]
  comment_count: number
  coupons: any[]
  favorite: any
  hashtags: Hashtag[]
  keyword_info: KeywordInfo
  new_release_notification: any
  preview: any
  related_set_books: any[]
  style: Style3
}

export interface Book {
  book_id: string
  title: string
  web_title: string
  cover: BookCover
  original_cover_size: OriginalBookCoverSize
  authors: Author[]
  isbn: string
  set: any
  introduction: Introduction
  adults_only: boolean
  open: boolean
  registration_date: string
  publication_date: string
  file: File
  publisher: Publisher
  purchase: Purchase
  rental: Rental
  trial: boolean
  style: Style
  serial: Serial
  categories: Category[]
  ratings: Rating[]
  ridiselect: boolean
  thumbnail: string
  scheduled_free: any
  is_original: boolean
  is_only: boolean
}

export interface BookCover {
  small: string
  large: string
  xxlarge: string
}

export interface OriginalBookCoverSize {
  width: number
  height: number
}

export interface Author {
  author_id: number
  name: string
  role: string
}

export interface Introduction {
  romance_guide: any
  sequence_guide: any
  related_serial_info: any
  trailer_video: string
  trailer_image: any
  description: string
  table_of_contents: any
  publisher_review: any
  author_bio: any
}

export interface File {
  size: number
  format: string
  page_count: number
  character_count: any
  comic: boolean
  webtoon: boolean
  variants: Variant[]
}

export interface Variant {
  quality: string
  size: number
}

export interface Publisher {
  publisher_id: number
  name: string
}

export interface Purchase {
  full_price: number
  sale_price: number
}

export interface Rental {
  sale_price: number
  days: number
  pointback: any
  full_price: number
}

export interface Style {
  layout: string
}

export interface Serial {
  serial_id: string
  title: string
  header_image: HeaderImage
  cover: Cover2
  original_cover_size: OriginalCoverSize2
  episode: number
  total: number
  completion: boolean
  publishing_schedule: PublishingSchedule
  wait_for_free: WaitForFree
  scheduled_free: ScheduledFree
  free: Free
  unit: string
  purchase: Purchase2
  purchase_all: PurchaseAll
  rental: Rental2
  rental_all: RentalAll
  last_opened_episode_date: string
}

export interface HeaderImage {
  object: string
  overlay: any
  background: string
  merged: string
}

export interface Cover2 {
  small: string
  large: string
  xxlarge: string
}

export interface OriginalCoverSize2 {
  width: number
  height: number
}

export interface PublishingSchedule {
  periodical: boolean
}

export interface WaitForFree {
  interval_hours: number
  rental_days: number
  rental_volume: number
  last_restricted_episodes: number
  next_available_date: any
  opening_date: string
  closing_date: string
}

export interface ScheduledFree {
  active: boolean
  remain_episodes_count: number
}

export interface Free {
  purchase: number
  rental: number
}

export interface Purchase2 {
  max_price: number
  min_price: number
  min_price_non_zero: number
}

export interface PurchaseAll {
  full_price: number
  sale_price: number
  discount_rate: number
  max_discount_rate: number
  min_discount_rate: number
}

export interface Rental2 {
  max_price: number
  min_price: number
  min_price_non_zero: number
}

export interface RentalAll {
  full_price: number
  sale_price: number
  days: number
  discount_rate: number
  max_discount_rate: number
  min_discount_rate: number
}

export interface Category {
  category_id: number
  name: string
  genre: string
  parent_id: number
  priority?: number
  use_series: string
}

export interface Rating {
  rating: number
  count: number
}

export interface BookBanner {
  title: string
  link?: string
  message?: string
  style: Style2
  opening_date: string
  closing_date: string
  adults_only?: boolean
  detail: any
}

export interface Style2 {
  layout: string
}

export interface Hashtag {
  hashtag_id: number
  name: string
}

export interface KeywordInfo {
  genre: string
  title: string
  set_id: number
  tags: Tag[]
}

export interface Tag {
  id: number
  name: string
  resource_url: string
  adult_exclude_resource_url: string
}

export interface Style3 {
  layout: string
}
