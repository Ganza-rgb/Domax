'use client'

import { useRef, useState } from 'react'
import { useMotion, gsap, EASE } from '@/lib/motion'

/*
 * Illustrations of the Domax product, built from real interface pieces.
 * Sample data only: script codes rather than names, one biology question.
 */

export const MAX_MARK = 6

export const schemePoints = [
  { id: 'burst', text: 'Cell swells and bursts', awarded: true },
  { id: 'osmosis', text: 'Water enters by osmosis', awarded: true },
  { id: 'membrane', text: 'Across a partially permeable membrane', awarded: true },
  { id: 'wall', text: 'No cell wall to resist bursting', awarded: true },
  {
    id: 'direction',
    text: 'Water moves from dilute to concentrated solution',
    awarded: false,
    note: 'Direction given, but not in terms of the solutions.',
  },
  { id: 'term', text: 'Names haemolysis', awarded: false, note: 'Not found in the answer.' },
]

const SUGGESTED = schemePoints.filter((point) => point.awarded).length

/* ---------- Small shared pieces ---------- */

export function Tick({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`w-4 h-4 ${className}`}>
      <circle cx="8" cy="8" r="8" fill="#00cd90" />
      <path d="M4.6 8.3l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Dash() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="w-4 h-4">
      <circle cx="8" cy="8" r="7.25" fill="none" stroke="#CFD8E3" strokeWidth="1.5" />
      <path d="M5.5 8h5" stroke="#9AA8BA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Evidence({ id, active, children }) {
  return (
    <span
      data-evidence={id}
      className={`rounded-[3px] transition-[background-color,box-shadow] duration-300 ${
        active === id ? 'bg-[#FFE27A] shadow-[0_0_0_2px_#FFE27A]' : ''
      }`}
    >
      {children}
    </span>
  )
}

/** The student's handwritten answer, on lined paper. */
function HandwrittenAnswer({ active, className = '' }) {
  return (
    <p className={`font-hand text-[1.3rem] sm:text-[1.45rem] leading-[34px] text-[#1F2E57] ${className}`}>
      The cell will <Evidence id="burst" active={active}>swell up and burst</Evidence> because{' '}
      <Evidence id="osmosis" active={active}>water moves into it by osmosis</Evidence>{' '}
      <Evidence id="membrane" active={active}>through the partially permeable membrane</Evidence>. Water goes{' '}
      <Evidence id="direction" active={active}>from a high concentration to a low one</Evidence>.{' '}
      <Evidence id="wall" active={active}>Animal cells have no cell wall</Evidence> to stop them bursting.
    </p>
  )
}

function AppBar({ title, meta }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-5 h-12 border-b border-line bg-white">
      <div className="flex items-center gap-2.5 min-w-0">
        <img src="/favicon.svg" alt="" className="w-5 h-5 flex-shrink-0" />
        <span className="text-[13px] text-ink-3 truncate">{title}</span>
      </div>
      <span className="text-[13px] text-ink-3 tabular-nums whitespace-nowrap">{meta}</span>
    </div>
  )
}

/* ---------- Hero: the review screen ---------- */

const queue = [
  { code: '0409', state: 'signed', label: 'Signed · 5/6' },
  { code: '0412', state: 'current', label: 'Reviewing' },
  { code: '0415', state: 'ready', label: 'Ready · 6/6' },
  { code: '0418', state: 'you', label: 'You mark' },
  { code: '0421', state: 'ready', label: 'Ready · 3/6' },
  { code: '0424', state: 'ready', label: 'Ready · 4/6' },
]

const queueDot = {
  signed: 'bg-[#00cd90]',
  current: 'bg-accent',
  ready: 'bg-[#CFD8E3]',
  you: 'bg-[#F5A524]',
}

export function ReviewScreen() {
  const scope = useRef(null)
  const [active, setActive] = useState('osmosis')
  const [signed, setSigned] = useState(false)

  useMotion(scope, () => {
    const tl = gsap.timeline({ defaults: { ease: EASE } })
    tl.from('[data-frame]', { autoAlpha: 0, y: 48, duration: 1 })
      .fromTo('[data-scan]', { yPercent: 0, autoAlpha: 1 }, { yPercent: 100, duration: 1.4, ease: 'power1.inOut' }, '-=0.3')
      .to('[data-scan]', { autoAlpha: 0, duration: 0.3 })
      .from('[data-point-icon]', { scale: 0, autoAlpha: 0, duration: 0.35, stagger: 0.14, ease: 'back.out(2.2)' }, '-=1.3')
      .from('[data-mark]', { autoAlpha: 0, y: 8, duration: 0.4 }, '-=0.2')
  })

  return (
    <div ref={scope} className="relative">
      <div
        data-frame
        className="rounded-[22px] border border-line bg-white shadow-[0_40px_80px_-40px_rgba(10,48,89,0.45),0_2px_6px_rgba(10,48,89,0.06)] overflow-hidden"
      >
        <AppBar title="S4 Biology · End of term · Question 4" meta="12 of 38 scripts" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_19rem] lg:grid-cols-[11rem_1fr_20rem] text-left">
          {/* Queue */}
          <ul className="hidden lg:block border-r border-line bg-canvas py-3" aria-label="Scripts in this batch">
            {queue.map((item) => (
              <li
                key={item.code}
                className={`flex items-center gap-2.5 px-4 py-2 text-[13px] ${
                  item.state === 'current' ? 'bg-white text-ink font-semibold' : 'text-ink-2'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${queueDot[item.state]}`} aria-hidden="true" />
                <span className="tabular-nums">{item.code}</span>
                <span className="ml-auto text-[11px] text-ink-3 font-normal truncate">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Scanned page */}
          <div className="relative paper px-5 sm:px-8 py-6 border-b md:border-b-0 md:border-r border-line overflow-hidden min-h-[16rem]">
            <span
              data-scan
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-transparent to-[#005ffe]/15 border-b-2 border-[#005ffe]/50 opacity-0"
            />
            <div className="flex items-baseline justify-between text-[12px] text-ink-3 mb-3">
              <span>Script 0412 · page 2 of 5</span>
              <span>Name masked</span>
            </div>
            <p className="text-[13px] font-semibold text-ink mb-1.5">
              4. Explain what happens to a red blood cell placed in distilled water. ({MAX_MARK} marks)
            </p>
            <HandwrittenAnswer active={active} />
          </div>

          {/* Marking scheme */}
          <div className="flex flex-col">
            <div className="px-4 sm:px-5 pt-4 pb-2">
              <p className="text-[12px] text-ink-3">Marking scheme</p>
            </div>
            <ul className="px-2 sm:px-3 space-y-0.5 flex-1">
              {schemePoints.map((point) => (
                <li key={point.id}>
                  <button
                    type="button"
                    onClick={() => setActive(point.id)}
                    aria-pressed={active === point.id}
                    className={`w-full flex items-start gap-2.5 text-left rounded-lg px-2.5 py-2 text-[13px] leading-snug transition-colors ${
                      active === point.id ? 'bg-canvas' : 'hover:bg-canvas'
                    }`}
                  >
                    <span data-point-icon className="mt-px flex-shrink-0">
                      {point.awarded ? <Tick /> : <Dash />}
                    </span>
                    <span className="flex-1">
                      <span className={point.awarded ? 'text-ink' : 'text-ink-2'}>{point.text}</span>
                      <span className="sr-only">{point.awarded ? ' (awarded)' : ' (not awarded)'}</span>
                      {point.note && active === point.id && (
                        <span className="block text-[12px] text-ink-3 mt-0.5">{point.note}</span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div
              data-mark
              className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 mt-3 border-t border-line min-h-[4rem]"
              aria-live="polite"
            >
              {signed ? (
                <>
                  <p className="flex items-center gap-2 text-[13px] text-positive font-medium">
                    <Tick /> Signed at {SUGGESTED}/{MAX_MARK}
                  </p>
                  <button type="button" onClick={() => setSigned(false)} className="text-[13px] text-ink-3 underline underline-offset-2 hover:text-ink">
                    Undo
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[13px] text-ink-2">
                    Suggested <span className="text-xl font-semibold text-ink tabular-nums ml-1">{SUGGESTED}</span>
                    <span className="text-ink-3">/{MAX_MARK}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setSigned(true)}
                    className="min-h-9 px-4 rounded-full bg-accent text-white text-[13px] font-semibold hover:bg-accent-strong transition-colors"
                  >
                    Sign this mark
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Story stage visuals ---------- */

function Panel({ children, className = '' }) {
  return (
    <div className={`relative w-full sm:aspect-[5/4] rounded-[28px] bg-[#EEF2F7] overflow-hidden flex items-center justify-center px-5 py-8 sm:p-10 ${className}`}>
      {children}
    </div>
  )
}

function Chip({ children, tone = 'ok' }) {
  const tones = {
    ok: 'bg-white text-ink',
    warn: 'bg-[#FFF4E0] text-[#8A5300]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-[0_1px_2px_rgba(10,48,89,0.08)] ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function CaptureVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="w-[11.5rem] sm:w-[13rem] aspect-[9/18.5] rounded-[34px] bg-[#0B1626] p-2 shadow-[0_30px_60px_-30px_rgba(10,48,89,0.6)]">
          <div className="relative w-full h-full rounded-[27px] bg-[#1C2635] overflow-hidden flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-full aspect-[3/4] paper rounded-sm -rotate-2 shadow-lg p-3">
                <div className="space-y-[9px] pt-2" aria-hidden="true">
                  {[90, 70, 85, 60, 80, 50, 75].map((w, i) => (
                    <div key={i} className="h-[3px] rounded bg-[#2B3D6B]/50" style={{ width: `${w}%` }} />
                  ))}
                </div>
                {['top-1 left-1 border-t-2 border-l-2', 'top-1 right-1 border-t-2 border-r-2', 'bottom-1 left-1 border-b-2 border-l-2', 'bottom-1 right-1 border-b-2 border-r-2'].map((pos) => (
                  <span key={pos} className={`absolute w-4 h-4 border-[#00cd90] ${pos}`} aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-1 px-2 pb-2">
              <Chip><Tick className="w-3 h-3" /> Sharp</Chip>
              <Chip><Tick className="w-3 h-3" /> Whole page</Chip>
            </div>
            <div className="flex justify-center pb-4">
              <span className="w-11 h-11 rounded-full border-[3px] border-white/80 bg-white/20" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-48 rounded-2xl bg-white p-4 shadow-[0_12px_30px_-16px_rgba(10,48,89,0.35)]">
          <p className="text-[12px] text-ink-3">Saved on this phone</p>
          <p className="text-2xl font-semibold font-headline text-ink tabular-nums mt-1">186 pages</p>
          <p className="text-[12px] text-ink-2 mt-1 leading-snug">Uploads when the school is back online.</p>
          <div className="mt-3 h-1.5 rounded-full bg-[#EEF2F7] overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </Panel>
  )
}

// Deterministic 9x9 pattern standing in for the header-sheet code.
const QR_CELLS = Array.from({ length: 81 }, (_, i) => {
  const r = Math.floor(i / 9)
  const c = i % 9
  const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3)
  return finder ? !(r % 2 === 1 && (c % 2 === 1 || c === 7)) : (r * 7 + c * 3 + r * c) % 5 < 2
})

export function PageCheckVisual() {
  const pages = [1, 2, 3, 4, 5]
  return (
    <Panel>
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_12px_30px_-16px_rgba(10,48,89,0.35)]">
          <div className="grid grid-cols-9 gap-px w-14 h-14 flex-shrink-0" aria-hidden="true">
            {QR_CELLS.map((on, i) => (
              <span key={i} className={on ? 'bg-ink' : 'bg-transparent'} />
            ))}
          </div>
          <div className="text-[13px] leading-snug">
            <p className="font-semibold text-ink">Header sheet · Script 0412</p>
            <p className="text-ink-2">S4 Biology · End of term</p>
            <p className="text-ink-3">Expects 5 pages</p>
          </div>
        </div>
        <ul className="grid grid-cols-5 gap-2.5" aria-label="Pages received for script 0412">
          {pages.map((n) =>
            n === 3 ? (
              <li key={n} className="aspect-[3/4] rounded-lg border-2 border-dashed border-[#F5A524] bg-[#FFF8EC] flex flex-col items-center justify-center text-[10px] font-semibold text-[#8A5300]">
                <span className="text-base leading-none">?</span>
                <span>Page 3</span>
              </li>
            ) : (
              <li key={n} className="relative aspect-[3/4] rounded-lg paper shadow-sm p-1.5">
                <div className="space-y-1 pt-1" aria-hidden="true">
                  {[80, 60, 70, 50].map((w, i) => (
                    <div key={i} className="h-[2px] rounded bg-[#2B3D6B]/40" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <span className="absolute -top-1.5 -right-1.5"><Tick className="w-3.5 h-3.5" /></span>
                <span className="sr-only">Page {n} received</span>
              </li>
            ),
          )}
        </ul>
        <div className="rounded-xl bg-white px-4 py-3 text-[13px] text-ink leading-snug shadow-[0_1px_2px_rgba(10,48,89,0.08)] border-l-4 border-[#F5A524]">
          Page 3 of script 0412 is missing. Retake it before marking starts.
        </div>
      </div>
    </Panel>
  )
}

export function FirstReadVisual() {
  return (
    <Panel>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_40px_-24px_rgba(10,48,89,0.45)] overflow-hidden">
        <div className="paper px-5 py-4 border-b border-line">
          <HandwrittenAnswer active="osmosis" className="!text-[1.2rem] !leading-[30px]" />
        </div>
        <ul className="p-3 space-y-1">
          {schemePoints.slice(0, 5).map((point) => (
            <li key={point.id} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${point.id === 'osmosis' ? 'bg-canvas' : ''}`}>
              {point.awarded ? <Tick /> : <Dash />}
              <span className={point.awarded ? 'text-ink' : 'text-ink-2'}>{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

export function ReviewQueueVisual() {
  const rows = [
    { code: '0418', reason: 'Q6 is a diagram', tag: 'You mark', tone: 'you' },
    { code: '0412', reason: 'Two readings of Q4 disagree', tag: 'Check', tone: 'check', selected: true },
    { code: '0427', reason: 'Page 3 was retaken', tag: 'Check', tone: 'check' },
    { code: '0415', reason: 'Every point is clear', tag: 'Ready', tone: 'ready' },
    { code: '0421', reason: 'Every point is clear', tag: 'Ready', tone: 'ready' },
  ]
  const tags = {
    you: 'bg-[#FFF4E0] text-[#8A5300]',
    check: 'bg-accent-soft text-accent-strong',
    ready: 'bg-positive-soft text-positive',
  }
  return (
    <Panel>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_40px_-24px_rgba(10,48,89,0.45)] overflow-hidden">
        <div className="flex items-baseline justify-between px-4 py-3 border-b border-line">
          <p className="text-[13px] font-semibold text-ink">Review queue</p>
          <p className="text-[12px] text-ink-3">38 scripts · 9 need you</p>
        </div>
        <ul>
          {rows.map((row) => (
            <li key={row.code} className={`px-4 py-2.5 border-b border-line last:border-b-0 ${row.selected ? 'bg-canvas' : ''}`}>
              <div className="flex items-center gap-3 text-[13px]">
                <span className="tabular-nums text-ink-3">{row.code}</span>
                <span className="flex-1 text-ink truncate">{row.reason}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tags[row.tone]}`}>{row.tag}</span>
              </div>
              {row.selected && (
                <div className="flex gap-2 mt-2.5 pl-11">
                  <span className="inline-flex items-center min-h-8 px-3.5 rounded-full bg-accent text-white text-[12px] font-semibold">Accept 4/6</span>
                  <span className="inline-flex items-center min-h-8 px-3.5 rounded-full border border-line-strong text-ink text-[12px] font-semibold">Change</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

export function ReleaseVisual() {
  const sheet = [
    ['0409', 5],
    ['0412', 4],
    ['0415', 6],
    ['0418', 3],
  ]
  return (
    <Panel>
      <div className="flex items-center gap-5 sm:gap-7">
        <div className="w-[10.5rem] sm:w-[12rem] aspect-[9/18.5] rounded-[32px] bg-[#0B1626] p-2 shadow-[0_30px_60px_-30px_rgba(10,48,89,0.6)]">
          <div className="w-full h-full rounded-[25px] bg-white overflow-hidden p-3.5 flex flex-col">
            <p className="text-[10px] text-ink-3">S4 Biology · End of term</p>
            <p className="text-[13px] font-semibold text-ink mt-0.5">Question 4</p>
            <p className="font-headline text-4xl font-semibold text-ink mt-3 tabular-nums">
              4<span className="text-lg text-ink-3">/6</span>
            </p>
            <div className="mt-3 rounded-lg bg-canvas p-2.5 text-[10.5px] leading-snug text-ink-2">
              Good: you explained osmosis and why the cell bursts. Say which way water moves between the
              solutions, and name the process.
            </div>
            <p className="mt-auto text-[9.5px] text-ink-3 flex items-center gap-1">
              <Tick className="w-3 h-3" /> Signed by your teacher
            </p>
          </div>
        </div>
        <div className="hidden sm:block w-52 rounded-2xl bg-white shadow-[0_12px_30px_-16px_rgba(10,48,89,0.35)] overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <p className="text-[13px] font-semibold text-ink">Mark sheet</p>
            <p className="text-[11px] text-ink-3">Set out for CAMIS</p>
          </div>
          <table className="w-full text-[12px]">
            <tbody>
              {sheet.map(([code, mark]) => (
                <tr key={code} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-1.5 text-ink-2 tabular-nums">{code}</td>
                  <td className="px-4 py-1.5 text-right font-semibold text-ink tabular-nums">{mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  )
}
