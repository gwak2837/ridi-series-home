'use client'

interface Props {
  bookId: string
}

export default function ReviewSubmitForm({ bookId }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>이 책을 평가해주세요!</div>
      <textarea />
      <input className="peer hidden" id="review-caution" type="checkbox" />
      <label htmlFor="review-caution">리뷰 작성 유의사항</label>
      <button>리뷰 남기기</button>
      <div className="hidden peer-checked:block">
        <p>
          건전한 리뷰 정착 및 양직의 리뷰를 위해 아래 해당하는 리뷰는 비공개 조치될 수 있음을
          안내드립니다.
        </p>
        <ol>
          <li>1. 타인에게 불쾌감을 주는 욕설</li>
          <li>2. 비속어나 타인을 비방하는 내용</li>
          <li>3. 특정 종교, 민족, 계층을 비방하는 내용</li>
        </ol>
        <p>
          이 외에도 건전한 리뷰 문화 형성을 위한 운영 목적과 취지에 맞지 않는 내용은 담당자에 의해
          리뷰가 비공개 처리될 수 있습니다.
        </p>
      </div>
    </form>
  )
}
