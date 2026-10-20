import { getDb } from '@/lib/server/db'
import { INLINE_SAFE, json, normaliseCode, safeFilename } from '@/lib/server/portal'

export const runtime = 'nodejs'

/**
 * A shared paper. The class code is required. "View only" papers are shown in
 * the browser without a download button; a determined student can still save
 * what they can see, so teachers should treat view-only as a courtesy.
 */
export async function GET(request, { params }) {
  const { id } = await params
  const url = new URL(request.url)
  const code = normaliseCode(url.searchParams.get('code'))
  const wantsDownload = url.searchParams.get('download') === '1'
  const paper = getDb().prepare('SELECT * FROM papers WHERE id = ? AND code = ?').get(id, code)
  if (!paper) return json({ error: 'That paper isn’t here.' }, 404)

  const inline = INLINE_SAFE(paper.mime)
  if (!paper.allow_download && (wantsDownload || !inline)) return json({ error: 'This paper is view only and can’t be opened in the browser.' }, 403)

  const disposition = wantsDownload || !inline ? 'attachment' : 'inline'
  return new Response(paper.data, {
    headers: {
      'Content-Type': inline ? paper.mime : 'application/octet-stream',
      'Content-Disposition': `${disposition}; filename="${safeFilename(paper.filename)}"`,
      'Content-Length': String(paper.size),
      'X-Content-Type-Options': 'nosniff',
      // The sandbox header stops scripts in images and text; Chrome's PDF viewer needs it left off.
      ...(paper.mime === 'application/pdf' ? {} : { 'Content-Security-Policy': "sandbox; default-src 'none'" }),
      'Cache-Control': 'private, no-store',
    },
  })
}
