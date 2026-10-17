# Domax

Marking help for teachers in Rwanda. Teachers photograph their students' handwritten exam scripts; Domax checks every page is in the right place, helps the teacher mark question by question, and the teacher releases results only when every mark is theirs.

**Stage: prototype for pilot sites.** The public site recruits pilot institutions (universities, polytechnics and secondary schools, plus the sponsors who fund public schools). The teacher workspace runs entirely in the browser with example data. There is no production backend yet.

## Rules the product is built on

These are not settings and must not be designed around:

1. **A teacher signs every mark.** No mark reaches a student without an explicit teacher action. There is no auto-release, scheduled release or admin override.
2. **Students never pay** to see their own results, comments or marked scripts.
3. **Data stays in Rwanda.** Personal data (names, IDs, marks, script images) is stored on Rwandan infrastructure under Law No. 058/2021 unless NCSA authorises otherwise. Nothing is sent to a foreign AI service without that authorisation.
4. **Identity is deterministic.** A page belongs to a student only because of the code printed on it. Domax never guesses from handwriting, names or position in the pile; an unreadable code goes to the teacher.
5. **Under-16 consent is a record**, with who recorded it, when and how, not a checkbox. Results for an under-16 class can't be released without it.
6. **Capture works offline.** Photographing scripts must work with no connection.

## What's in the repo

### Public site

| Route | Purpose |
|---|---|
| `/` | Homepage: the review screen, a five-stage product story, promises, audiences, the 12-week pilot |
| `/how-it-works` | The full walkthrough, stage by stage, and what Domax won't do yet |
| `/solutions/universities`, `/solutions/schools`, `/solutions/sponsors` | One page per audience |
| `/pricing` | Per-exam pricing with page allowances, sponsor option for public schools |
| `/data-protection` | How student data is handled under Law 058/2021 |
| `/about` | Why Domax exists and where it is on the road to launch |
| `/pilot` | Pilot request form (opens a pre-filled email; there is no form backend) |
| `/contact`, `/login` | Contact details; sign-in |
| `/privacy`, `/terms`, `/cookie-policy`, `/acceptable-use` | Legal pages (need legal review) |

Old routes (`/features`, `/product/*`, `/blog`, `/signup`, `/gdpr` and others) redirect to their replacements; see `next.config.js`.

### Teacher workspace (`/dashboard`)

Five sections. Every exam moves through the same four steps, and each step has one screen.

| Section | What it does |
|---|---|
| **Today** | Only the exams that need the teacher, each with one next action |
| **Exams** | Every exam and its step. Opening one shows the step bar: **Prepare → Collect → Mark → Release** |
| **Rubrics** | The rubric library. Every save is a new version; exams keep the version they started with |
| **Classes** | Students with their IDs in other systems (CAMIS/SDMS, Urubuto, university registration number), CSV import, consent records |
| **Settings** | Profile, the sign-off rule, billing for the term, theme, resetting the example workspace |

The four steps of an exam:

- **Prepare:** class and rubric (with warnings if the rubric is incomplete), then print answer sheets (`/dashboard/exams/[id]/sheets`). Every page for every student carries its own QR code.
- **Collect:** take or choose photos. Each photo is checked for blur and darkness, its code is read, and it is filed under the right student and page. Unreadable codes go to a "choose the student" lane. A live list shows who is missing; students can be marked absent.
- **Mark:** the marking room (`/dashboard/exams/[id]/mark`), full screen, one question across the whole class with names hidden. Tick the marking points or tap a mark; keyboard: number, Enter, arrow keys, Esc.
- **Release:** a checklist (every script in, every mark given, consent recorded), a preview of what a student sees, one deliberate release, then a mark sheet export.

Every change is written to the exam's activity record, which the interface can't edit.

### Real versus simulated in this prototype

| Works for real | Simulated or not built |
|---|---|
| QR answer sheets, generated and printable | No server: all data is in the browser (`localStorage`, page photos in IndexedDB) |
| Reading page codes from photos (jsQR), quality check, grayscale | Quality thresholds are first guesses, to be tuned on real scripts |
| Missing and incomplete script tracking | No upload or sync; "offline queue" is simply local storage |
| Question-by-question marking, versioned rubrics | No AI mark suggestions (waits for NCSA authorisation and pilot evidence) |
| Release gate, consent check, activity record | Students can't see results yet: the result view is a preview only |
| Mark sheet export (CSV with every student's external IDs) | CAMIS and Urubuto files need a real sample of each format first |
| Sign-in through NextAuth credentials | Only a placeholder account (`demo@domax.com` / `demo123`); the dashboard is not protected |

## Pricing model

One price per exam (one student's script for one subject), with a page allowance per level and a published charge for extra pages. Institutions are invoiced per term; public schools are covered by a sponsor at a published cost-plus price. Primary isn't offered yet.

| Level | Per exam | Pages included |
|---|---|---|
| University & polytechnic | RWF 500 | 15 |
| A-Level | RWF 350 | 12 |
| O-Level | RWF 250 | 8 |

Each extra page is RWF 25; batch minimum RWF 10,000. `lib/pricing.js` is the single source for these numbers on the site and in the app. Its older page-credit functions are used only by the dormant payment routes under `app/api/billing` and `app/api/wallet`, which nothing in the app calls.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Run only one `next dev` per checkout: two dev servers share `.next/dev` and break each other's files.

Environment variables (`env.example` lists more that aren't used yet):

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | The inbox that receives pilot requests and contact email. Defaults to a placeholder, `hello@domax.rw` |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Sign-in (required in production) |

The workspace opens with example classes, rubrics and exams so every screen has something to show. **Settings → Reset to the example workspace** restores them.

## Project layout

```
app/
  page.js, how-it-works/, pricing/, solutions/, ...   public site
  dashboard/                                          teacher workspace
    page.js                                           Today
    exams/  new/  [examId]/  [examId]/mark/  [examId]/sheets/
    rubrics/  [rubricId]/                             library and editor ('new' creates one)
    classes/  new/  [classId]/
    settings/
  api/                                                auth plus dormant payment and wallet routes
components/
  site/                 public site building blocks (ProductVisuals, PageHero, Reveal, ClosingCta)
  workspace/            exam step bar, status, step panels
  dashboard/            workspace shell (sidebar, top bar, search palette, tour) and shared UI (ui.js)
  atoms/, molecules/, organisms/                      shared site components
states/
  useWorkspaceState.js  classes, rubrics, exams, marks, activity log, and the rules (step derivation, release gate)
  workspaceSeed.js      example data
  useUserState.js       teacher profile and term billing
  useThemeState.js      workspace light/dark theme
lib/
  pricing.js            prices (single source)
  scriptCodes.js        the page code format: DOMAX1|exam|student|page|total
  capture.js            photo processing: code reading, quality check, grayscale
  deviceStore.js        page photos in IndexedDB
  motion.js             GSAP helper with reduced-motion handling
  site.js               contact address and mailto helper
```

## Design

- **Type:** Bricolage Grotesque for headings, Inter for interface and body, Caveat only for handwriting inside script illustrations.
- **Colour:** brand blue `#005ffe` for actions, navy `#0A3059` / `#071A33` for text and statement surfaces, green `#00cd90` only for something signed or clear (the tick in the logo).
- **Workspace rule:** if a tired teacher can't understand a screen in five seconds, the screen is wrong. One next step per screen, teacher words, nothing to remember.

## Not built yet

In rough order for the pilot:

1. Backend: PostgreSQL with per-school isolation enforced in the database, private object storage, server-side role checks, an append-only audit log, all on Rwandan hosting.
2. Real accounts: school invites teachers; roles for school admin and students.
3. Student result page, free, reached with a class code.
4. CAMIS and Urubuto file formats, from real samples.
5. AI mark suggestions behind a swappable interface, after NCSA authorisation, recorded as training events with the teacher's final mark.
6. Further roles: second marker, head of department, exam officer, parents, sponsors.

Other Markdown files in the root (`PROJECT_SUMMARY.md`, `QUICK_START.md`, `MARKET_READINESS_ANALYSIS.md`, `ILLUSTRATION_ECOSYSTEM.md`) describe earlier versions of the product and are out of date.
