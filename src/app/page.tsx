import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Hello worlds</div>
      <Link href="/books/4362000001">상수리나무 아래</Link>
    </main>
  )
}
