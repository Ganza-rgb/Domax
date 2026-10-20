/*
 * The marking assistant's connection. It speaks the OpenAI-style chat
 * protocol that local model servers (Ollama, llama.cpp, LM Studio, vLLM) all
 * offer, so the model can be swapped without touching the app.
 *
 * Student work only ever goes to a machine on this computer or the school's
 * own network. A public address is refused unless AI_ALLOW_REMOTE=true is set
 * on purpose, which should only follow NCSA authorisation for the transfer.
 *
 * It is off until AI_MODEL is set.
 */
const PRIVATE_HOST = /^(localhost|127\.\d+\.\d+\.\d+|\[?::1\]?|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)$/

export function aiConfig() {
  const baseUrl = (process.env.AI_BASE_URL || 'http://localhost:11434/v1').replace(/\/$/, '')
  const model = process.env.AI_MODEL || ''
  let host = ''
  try {
    host = new URL(baseUrl).hostname
  } catch {}
  const local = PRIVATE_HOST.test(host)
  const remoteAllowed = process.env.AI_ALLOW_REMOTE === 'true'
  let reason = ''
  if (!model) reason = 'No model is set. Add AI_MODEL to .env.local.'
  else if (!local && !remoteAllowed) reason = 'The model address is not on this computer or your network, so student work will not be sent to it.'
  return { baseUrl, model, local, remoteAllowed, enabled: !reason, reason }
}

export class AssistantError extends Error {
  constructor(message, status = 502) {
    super(message)
    this.status = status
  }
}

export async function chat(messages, { timeoutMs = 180000, maxTokens = 700 } = {}) {
  const config = aiConfig()
  if (!config.enabled) throw new AssistantError(config.reason, 503)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.AI_API_KEY || 'local'}` },
      body: JSON.stringify({ model: config.model, messages, temperature: 0, max_tokens: maxTokens, stream: false }),
      signal: controller.signal,
    })
    if (!response.ok) throw new AssistantError(`The model answered with an error (${response.status}).`)
    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) throw new AssistantError('The model sent back nothing.')
    return text
  } catch (error) {
    if (error instanceof AssistantError) throw error
    if (error?.name === 'AbortError') throw new AssistantError('The model took too long. A smaller model, or typed answers, will be faster.', 504)
    throw new AssistantError('The assistant isn’t running. Start your local model server and try again.', 503)
  } finally {
    clearTimeout(timer)
  }
}

/** The first JSON object in a model's reply, even if it wrapped it in prose or a code fence. */
export function parseJson(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end <= start) throw new AssistantError('The model’s answer wasn’t in the format Domax expects. Try again.')
  try {
    return JSON.parse(text.slice(start, end + 1))
  } catch {
    throw new AssistantError('The model’s answer wasn’t in the format Domax expects. Try again.')
  }
}

export async function modelsAvailable() {
  const config = aiConfig()
  if (!config.enabled) return false
  try {
    const response = await fetch(`${config.baseUrl}/models`, { signal: AbortSignal.timeout(2000) })
    return response.ok
  } catch {
    return false
  }
}

export const clampText = (value, max) => String(value ?? '').slice(0, max)
export const asList = (value, max = 6, each = 200) => (Array.isArray(value) ? value.map((v) => clampText(v, each)).filter(Boolean).slice(0, max) : [])
