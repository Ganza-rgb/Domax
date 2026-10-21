'use client'

/**
 * Results charts, built on Recharts against Domax's own workspace tokens.
 *
 * Mark colors are fixed hexes, not CSS variables: SVG fill/stroke attributes
 * don't reliably resolve var(), and Recharts needs a plain string anyway.
 * They were checked with the dataviz skill's validate_palette.js against both
 * the light and the dark chart surface (--sky-panel) and pass contrast + CVD
 * on both — the lighter theme-dark text tokens (--vscode-accent etc. under
 * .theme-dark) are tuned for text contrast, not mark contrast, and fail the
 * dark lightness band, so they're not used here.
 */

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from 'recharts'
import { useThemeState } from '@/states/useThemeState'

const MARK = { info: '#005ffe', positive: '#007A56', caution: '#B45309' }

function useAxisColors() {
  const { isDark } = useThemeState()
  return isDark
    ? { grid: 'rgba(255,255,255,0.09)', subtle: '#9AABC2', text: '#EEF3FA', panel: '#101E33' }
    : { grid: '#E3E8EF', subtle: '#5B6B82', text: '#0A3059', panel: '#FFFFFF' }
}

function ChartTooltip({ active, payload, label, axis, children }) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: axis.panel,
        border: `1px solid ${axis.grid}`,
        borderRadius: 8,
        padding: '8px 10px',
        fontSize: 13,
        lineHeight: 1.4,
        color: axis.text,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ fontWeight: 600 }}>{label}</div>
      {children(payload[0])}
    </div>
  )
}

const tickStyle = (axis) => ({ fill: axis.subtle, fontSize: 12 })

/* ------------------------------------------------------------------ */
/* ScoreSpreadChart — students per score band, colored by the pass mark */
/* ------------------------------------------------------------------ */
function bandTone(band, pass) {
  if (band.min >= pass) return 'positive'
  if (band.max <= pass) return 'caution'
  return 'info'
}

export function ScoreSpreadChart({ bands, pass }) {
  const axis = useAxisColors()
  const data = bands.map((band) => ({ ...band, tone: bandTone(band, pass) }))

  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke={axis.grid} />
          <XAxis dataKey="label" tick={tickStyle(axis)} axisLine={{ stroke: axis.grid }} tickLine={false} />
          <YAxis allowDecimals={false} tick={tickStyle(axis)} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            cursor={{ fill: axis.grid, opacity: 0.5 }}
            content={({ active, payload, label }) => (
              <ChartTooltip active={active} payload={payload} label={label} axis={axis}>
                {(entry) => <div>{entry.value} {entry.value === 1 ? 'student' : 'students'}</div>}
              </ChartTooltip>
            )}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {data.map((d) => (
              <Cell key={d.key} fill={MARK[d.tone]} />
            ))}
            <LabelList dataKey="count" position="top" fill={axis.subtle} fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <table className="sr-only">
        <caption>Number of students in each score band</caption>
        <thead>
          <tr><th>Score band</th><th>Students</th></tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}><td>{d.label}</td><td>{d.count}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QuestionDifficultyChart — average score per question                */
/* ------------------------------------------------------------------ */
export function QuestionDifficultyChart({ perQuestion }) {
  const axis = useAxisColors()
  const plotted = perQuestion.filter((q) => q.avgPct !== null)
  const skipped = perQuestion.length - plotted.length
  const data = plotted.map((q) => ({
    key: q.question.id,
    name: `Q${q.question.number}`,
    title: q.question.title,
    avgPct: Math.round(q.avgPct),
    zero: q.zero,
    tone: q.avgPct < 50 ? 'caution' : 'info',
  }))

  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke={axis.grid} />
          <XAxis dataKey="name" tick={tickStyle(axis)} axisLine={{ stroke: axis.grid }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={tickStyle(axis)} axisLine={false} tickLine={false} width={34} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            cursor={{ fill: axis.grid, opacity: 0.5 }}
            content={({ active, payload, label }) => (
              <ChartTooltip active={active} payload={payload} label={label} axis={axis}>
                {(entry) => (
                  <>
                    <div style={{ color: axis.subtle }}>{entry.payload.title}</div>
                    <div>{entry.value}% average{entry.payload.zero ? ` · ${entry.payload.zero} got 0` : ''}</div>
                  </>
                )}
              </ChartTooltip>
            )}
          />
          <Bar dataKey="avgPct" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((d) => (
              <Cell key={d.key} fill={MARK[d.tone]} />
            ))}
            <LabelList dataKey="avgPct" position="top" formatter={(v) => `${v}%`} fill={axis.subtle} fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {skipped > 0 && (
        <p className="mt-2 text-xs text-[var(--sky-subtle)]">{skipped} question{skipped === 1 ? '' : 's'} not shown yet (no marks).</p>
      )}
      <table className="sr-only">
        <caption>Average score on each question</caption>
        <thead>
          <tr><th>Question</th><th>Average</th></tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}><td>Q{d.name} · {d.title}</td><td>{d.avgPct}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ScoreTrendLine — one score series across exams, with the pass mark  */
/* ------------------------------------------------------------------ */
export function ScoreTrendLine({ points, pass, height = 200 }) {
  const axis = useAxisColors()
  const data = points.map((p) => ({ ...p, pct: Math.round(p.pct) }))

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 12, right: 16, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={axis.grid} />
          <XAxis dataKey="title" tick={tickStyle(axis)} axisLine={{ stroke: axis.grid }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={tickStyle(axis)} axisLine={false} tickLine={false} width={34} tickFormatter={(v) => `${v}%`} />
          {Number.isFinite(pass) && (
            <ReferenceLine
              y={pass}
              stroke={axis.subtle}
              strokeDasharray="4 4"
              label={{ value: `Pass ${pass}%`, position: 'insideTopRight', fill: axis.subtle, fontSize: 11 }}
            />
          )}
          <Tooltip
            cursor={{ stroke: axis.grid }}
            content={({ active, payload, label }) => (
              <ChartTooltip active={active} payload={payload} label={label} axis={axis}>
                {(entry) => <div>{entry.value}%{Number.isFinite(pass) && entry.payload.passed === false ? ` · below ${pass}%` : ''}</div>}
              </ChartTooltip>
            )}
          />
          <Line type="monotone" dataKey="pct" stroke={MARK.info} strokeWidth={2} dot={{ r: 4, fill: MARK.info, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      <table className="sr-only">
        <caption>Score across exams</caption>
        <thead>
          <tr><th>Exam</th><th>Score</th></tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={d.examId || i}><td>{d.title}</td><td>{d.pct}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
