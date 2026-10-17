'use client'

/*
 * Pulls plain text out of a memo or notes file, in the browser, so a marking
 * assistant can read it later. Plain text and PDFs with a text layer work;
 * scans and photos give back an empty string (they stay attached as files).
 */
const MAX_CHARS = 20000
const MAX_PDF_PAGES = 30

const clip = (text) => text.replace(/\s+\n/g, '\n').trim().slice(0, MAX_CHARS)

export async function extractText(file) {
  const name = file.name.toLowerCase()
  try {
    if (file.type.startsWith('text/') || /\.(txt|md|csv)$/.test(name)) return clip(await file.text())
    if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString()
      const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
      let text = ''
      for (let n = 1; n <= Math.min(pdf.numPages, MAX_PDF_PAGES) && text.length < MAX_CHARS; n += 1) {
        const page = await pdf.getPage(n)
        const content = await page.getTextContent()
        text += `${content.items.map((item) => item.str).join(' ')}\n`
      }
      return clip(text)
    }
  } catch {
    // Unreadable file: it is still attached, just without text for the assistant.
  }
  return ''
}
