export async function fetchJSON(input: string | URL | Request, init?: RequestInit) {
  const response = await fetch(input, init)
  if (!response.ok) throw new Error('Network response was not ok')
  return await response.json()
}

interface RIDIBaseResponse {
  success: boolean
  message: string | null
}

export async function fetchRIDI<T extends RIDIBaseResponse>(
  input: string | URL | Request,
  init?: RequestInit,
) {
  const result = (await fetchJSON(input, init)) as T
  if (!result.success) throw new Error(result.message ?? 'Unknown error at RIDI API')
  return result
}
