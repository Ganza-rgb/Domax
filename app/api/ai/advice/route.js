import { AssistantError, asList, chat, clampText, parseJson } from '@/lib/server/ai'
import { currentTeacher, json } from '@/lib/server/portal'

export const runtime = 'nodejs'

const SYSTEM = `You write a short, kind note from a teacher to a secondary school student in Rwanda about one exam result.
Use only the facts you are given. Do not invent marks, topics or study methods the facts don't support.
Plain, simple English a 14-year-old can read. 2 to 3 sentences, then up to 3 short study tips tied to the weak questions.
Do not use the student's name. Reply with one JSON object and nothing else:
{"summary": "the note", "tips": ["tip", "tip"]}`

/** Wording help for a teacher's note to a student. The teacher reads it before anything is sent. */
export async function POST(request) {
  if (!(await currentTeacher())) return json({ error: 'Sign in first.' }, 401)
  const body = await request.json().catch(() => null)
  const pct = Number(body?.pct)
  if (!Number.isFinite(pct)) return json({ error: 'That request was incomplete.' }, 400)
  const focus = (Array.isArray(body.focus) ? body.focus : []).slice(0, 5).map((f) => `- ${clampText(f.title, 200)}: scored ${Number(f.got)} of ${Number(f.max)}${Number.isFinite(Number(f.classPct)) ? `, class average ${Math.round(Number(f.classPct))}%` : ''}`)
  const facts = [
    `Exam: ${clampText(body.examTitle, 120)}`,
    `Score: ${Math.round(pct)}% (pass mark ${Number(body.passMark) || 50}%)`,
    focus.length ? `Weak questions:\n${focus.join('\n')}` : 'No question stood out as weak.',
    asList(body.strong, 4).length ? `Went well: ${asList(body.strong, 4).join('; ')}` : '',
  ].filter(Boolean).join('\n')

  try {
    const reply = parseJson(await chat([{ role: 'system', content: SYSTEM }, { role: 'user', content: facts }], { maxTokens: 400 }))
    const summary = clampText(reply.summary, 700).trim()
    if (!summary) throw new AssistantError('The model sent back nothing usable. Try again.')
    return json({ summary, tips: asList(reply.tips, 3, 240) })
  } catch (error) {
    if (error instanceof AssistantError) return json({ error: error.message }, error.status)
    return json({ error: 'The assistant could not write that note.' }, 500)
  }
}
