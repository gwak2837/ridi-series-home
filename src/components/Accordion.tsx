import { Fragment, type ReactElement } from 'react'

import DownArrowIcon from '@/svgs/DownArrowIcon'

interface Props {
  icon: ReactElement
  contents: string[]
}

export default function Accordion({ icon, contents }: Props) {
  const lastContent = contents[0]
  const pastContents = contents.slice(1)
  const isContentMany = pastContents.length > 0
  const cursor = isContentMany ? 'cursor-pointer' : ''
  return (
    <label className={`grid grid-cols-[auto_1fr_auto] items-center gap-2 ${cursor}`}>
      <input className="peer hidden" type="checkbox" />
      {icon}
      <div>{lastContent}</div>
      {isContentMany && (
        <>
          <DownArrowIcon className="peer-checked:rotate-180" />
          {pastContents.map((content) => (
            <Fragment key={content}>
              <div />
              <li className="hidden peer-checked:block">{content}</li>
              <div />
            </Fragment>
          ))}
        </>
      )}
    </label>
  )
}
