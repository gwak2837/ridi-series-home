const koKR = new Intl.NumberFormat('ko-KR')

export function formatNumber(number: number) {
  return koKR.format(number)
}
