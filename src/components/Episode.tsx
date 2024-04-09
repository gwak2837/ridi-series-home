'use client'

import { format } from 'date-fns'
import Image from 'next/image'

import CheckboxIcon from '@/svgs/CheckboxIcon'
import DownloadIcon from '@/svgs/DownloadIcon'
import 무료Badge from '@/svgs/무료Badge'
import { type Book } from '@/types/episode'
import { formatFileSize } from '@/utils/math'

interface Props {
  book: Book
  selected?: boolean
  onClick?: (selected: boolean) => void
}

export default function Episode({ book, selected, onClick }: Props) {
  const bg = selected ? 'bg-[#F7F7F7]' : ''
  return (
    <li
      className={`flex items-center justify-between px-4 py-2 ${bg}`}
      onClick={() => onClick?.(!selected)}
    >
      <div className="flex items-center gap-3">
        {selected !== undefined && <CheckboxIcon checked={selected} className="mr-1" />}
        <Image
          alt={`${book.title} 썸네일`}
          className="rounded"
          height="67"
          priority
          src={book.thumbnail}
          width="46"
        />
        <div className="grid gap-[6px]">
          <div className="flex items-center gap-1">
            {book.rental.sale_price === 0 && <무료Badge className="flex-shrink-0" />}
            <h4 className="line-clamp-2 text-[13px] font-medium leading-4">{book.title}</h4>
          </div>
          <div className="text-[11px] leading-[13px] text-[#A5A5A5]">
            <span>{format(book.registration_date, 'yyyy.MM.dd')}, </span>
            <span>{formatFileSize(book.file.size * 1000)}</span>
          </div>
        </div>
      </div>
      {selected === undefined && <DownloadIcon />}
    </li>
  )
}
