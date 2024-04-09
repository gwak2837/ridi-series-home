'use client'

import { type ReactNode, useState } from 'react'

import BottomSheet from '@/components/BottomSheet'
import BoldDownArrowIcon from '@/svgs/BoldDownArrowIcon'

enum BottomSheetTab {
  DESCRIPTION,
  INFO,
}

interface Props {
  className?: string
  children: ReactNode[]
}

export default function SeriesDescriptionBottomSheet({ className, children }: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [tab, setTab] = useState(BottomSheetTab.DESCRIPTION)

  return (
    <>
      <button className="p-2" onClick={() => setIsOpened(true)}>
        <BoldDownArrowIcon className={className} />
      </button>
      <BottomSheet open={isOpened} showDragButton onClose={() => setIsOpened(false)}>
        <div className="flex h-full flex-col rounded-2xl bg-white pt-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
            <button
              aria-pressed={tab === BottomSheetTab.DESCRIPTION}
              className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:text-black"
              onClick={() => setTab(BottomSheetTab.DESCRIPTION)}
            >
              작품 소개
            </button>
            <button
              aria-pressed={tab === BottomSheetTab.INFO}
              className="border-b-2 border-gray-100 p-4 text-gray-400 aria-pressed:border-black aria-pressed:text-black"
              onClick={() => setTab(BottomSheetTab.INFO)}
            >
              작품 정보
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            {tab === BottomSheetTab.DESCRIPTION && children[0]}
            {tab === BottomSheetTab.INFO && children[1]}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}
