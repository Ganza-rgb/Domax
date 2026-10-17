import { aiConfig, modelsAvailable } from '@/lib/server/ai'
import { currentTeacher, json } from '@/lib/server/portal'

export const runtime = 'nodejs'

export async function GET() {
  if (!(await currentTeacher())) return json({ error: 'Sign in first.' }, 401)
  const config = aiConfig()
  return json({ enabled: config.enabled, available: config.enabled ? await modelsAvailable() : false, model: config.model || null, local: config.local, address: config.baseUrl, reason: config.reason })
}
