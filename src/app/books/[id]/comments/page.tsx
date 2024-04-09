import { type PageProps } from '@/common/types'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="p-4 sm:p-8 md:p-16 lg:p-24">
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
    </main>
  )
}
