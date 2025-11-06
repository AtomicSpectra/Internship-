export async function fetchLinkContent(url: string): Promise<string> {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`
    const resp = await fetch(`https://r.jina.ai/${normalized}`)
    if (!resp.ok) throw new Error('Failed to fetch link content')
    const text = await resp.text()
    return text.trim()
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unable to fetch link content'
    throw new Error(message)
  }
}

export async function uploadToFileIo(file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const resp = await fetch('https://file.io', { method: 'POST', body: form })
  if (!resp.ok) throw new Error('Upload failed')
  const data = await resp.json()
  if (!data?.link) throw new Error('Upload did not return a link')
  return data.link as string
}

// Uses OCR.space demo key for simple OCR of images and PDFs
export async function ocrSpaceByUrl(fileUrl: string): Promise<string> {
  const form = new FormData()
  form.append('apikey', 'helloworld')
  form.append('url', fileUrl)
  form.append('OCREngine', '2')
  const resp = await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: form })
  if (!resp.ok) throw new Error('OCR request failed')
  const data = await resp.json()
  const parsed = data?.ParsedResults?.[0]?.ParsedText as string | undefined
  if (!parsed) throw new Error('No text extracted')
  return parsed.trim()
}

export async function fetchWikipediaSummary(topic: string): Promise<string> {
  const title = encodeURIComponent(topic.trim())
  const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
  if (!resp.ok) throw new Error('Failed to fetch topic summary')
  const data = await resp.json()
  const summary = (data?.extract as string) || ''
  return summary.trim()
}


