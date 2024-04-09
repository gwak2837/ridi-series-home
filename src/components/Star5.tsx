import StarIcon from '@/svgs/StarIcon'

interface Props {
  starCount: number
  className?: string
}

export default function Star5({ starCount, className = '' }: Props) {
  const flooredStarCount = Math.floor(starCount)
  const decimalPart = starCount - flooredStarCount
  const ratio = decimalPart * 100
  return (
    <div className={`flex gap-[2px] ${className}`}>
      {Array(flooredStarCount)
        .fill(0)
        .map((_, index) => (
          <StarIcon key={index} fill="#DC3232" />
        ))}
      {decimalPart > 0 && (
        <div className="relative w-3">
          <StarIcon
            className="absolute left-0 top-0"
            clipPath={`polygon(0 0, ${ratio}% 0, ${ratio}% 100%, 0 100%)`}
            fill="#DC3232"
          />
          <StarIcon
            className="absolute left-0 top-0"
            clipPath={`polygon(${ratio}% 0, 100% 0, 100% 100%, ${ratio}% 100%)`}
            fill="#E6E6E6"
          />
        </div>
      )}
      {Array(5 - flooredStarCount - (decimalPart > 0 ? 1 : 0))
        .fill(0)
        .map((_, index) => (
          <StarIcon key={index} fill="#E6E6E6" />
        ))}
    </div>
  )
}
