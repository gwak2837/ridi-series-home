'use client'

import { useState } from 'react'

import Modal from '@/components/Modal'
import 리다무Icon from '@/svgs/리다무Icon'
import { type WaitForFree } from '@/types/book'

interface Props {
  waitForFree: WaitForFree
}

export default function 리다무Button({ waitForFree }: Props) {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpened(true)}>
        <div className="flex items-center gap-1 px-[10px] py-1 text-sm text-[#1E9EFF]">
          지금 {waitForFree.rental_volume}편 무료 <리다무Icon className="-translate-y-[1px]" />
        </div>
        <div className="h-[3px] w-full rounded bg-[#1E9EFF]" />
      </button>
      <Modal open={isOpened} onClose={() => setIsOpened(false)}>
        <div className="w-screen max-w-xs rounded-xl bg-white">
          <h4 className="pt-4 text-center text-lg">리디 기다리면 무료</h4>
          <ul className="m-4 grid gap-1 text-sm">
            <li>
              · &nbsp;이 작품의 무료이용권{' '}
              <span className="text-[#1E9EFF]">{waitForFree.rental_volume}장</span>을 보내드립니다.
            </li>
            <li>
              · &nbsp;이용권 사용 후{' '}
              <span className="text-[#1E9EFF]">{waitForFree.rental_days}일</span>마다{' '}
              <span className="text-[#1E9EFF]">{waitForFree.rental_volume}장</span>이 충전됩니다.
            </li>
            <li>
              · &nbsp;해당 이용권으로{' '}
              <span className="text-[#1E9EFF]">{waitForFree.rental_days}일</span> 동안 대여하실 수
              있습니다.
            </li>
            <li>
              · &nbsp;최근{' '}
              <span className="text-[#1E9EFF]">{waitForFree.last_restricted_episodes}편</span>은
              이용권 사용이 불가합니다.
            </li>
          </ul>
          <button className="w-full border-t p-4 text-center" onClick={() => setIsOpened(false)}>
            확인
          </button>
        </div>
      </Modal>
    </>
  )
}
