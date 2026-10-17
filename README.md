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

Seven sections. Every exam moves through the same four steps, and each step has one screen.

| Section | What it does |
|---|---|
| **Today** | Only the exams that need the teacher, each with one next action |
| **Exams** | Every exam and its step. Opening one shows the step bar: **Prepare → Collect → Mark → Release** |
| **Rubrics** | The rubric library. Every save is a new version; exams keep the version they started with |
| **Classes** | Students with their IDs in other systems (CAMIS/SDMS, Urubuto, university registration number) and optional email and phone; import from a CSV or pasted spreadsheet rows; consent records; the **class code** for the student portal and what students may do; papers shared with the whole class |
| **Results** | Classes compared, score spread, question-by-question difficulty, each student's result and change since the last exam, who needs support, and a note to the student that can be reworded by the assistant and sent |
| **Messages** | Questions from students, replies, notices to the whole class, or a message to one student; "Email instead" opens the teacher's mail app |
| **Settings** | Profile, the sign-off rule, the marking assistant's status, billing for the term, theme, resetting the example workspace |

The four steps of an exam:

- **Prepare:** class and rubric (with warnings if the rubric is incomplete), **exam materials** (the paper, the memo and notes, with text read from PDFs and text files; marking notes; the pass mark), then print answer sheets (`/dashboard/exams/[id]/sheets`). Every page for every student carries its own QR code.
- **Collect:** take or choose photos. Each photo is checked for blur and darkness, its code is read, and it is filed under the right student and page. Unreadable codes go to a "choose the student" lane. A live list shows who is missing; students can be marked absent.
- **Mark:** the marking room (`/dashboard/exams/[id]/mark`), full screen, one question across the whole class with names hidden. Tick the marking points or tap a mark; keyboard: number, Enter, arrow keys, Esc.
- **Release:** a checklist (every script in, every mark given, consent recorded), a preview of what a student sees, one deliberate release that also sends each student's result to the student portal, then a mark sheet export.

Every change is written to the exam's activity record, which the interface can't edit.

### Student portal (`/student`)

Free for students. One **class code** is shared with the whole class (not a personal code).

- The code alone opens the class: papers the teacher shared (view only or downloadable) and notices to everyone.
- Results and private messages also need the student's **own ID number** (CAMIS, Urubuto or registration number) from the class list. Wrong guesses are rate limited.
- The teacher chooses what students may do: see results, see where to focus, ask questions, download papers by default.
- A class of students under 16 cannot be shared until consent is recorded, and results only reach the portal after the teacher releases the exam.

Stored in a local SQLite file, `data/domax.db` (git ignored), using the database built into Node 24. The routes are under `app/api/portal` (teacher, needs sign-in) and `app/api/student` (students).

### Marking assistant (optional, off by default)

Suggests a mark for one answer when the teacher presses "Suggest a mark", with the points it matched and missed. It reads the rubric, the memo and the marking notes. It never saves a mark: "Use suggestion" only fills the box, and every suggestion is recorded beside the teacher's final mark so the Results page can show how often it was kept. Diagrams are never sent.

It talks to any local server that speaks the OpenAI chat protocol (Ollama, LM Studio, llama.cpp, vLLM). Set `AI_MODEL` (and `AI_BASE_URL` if not the default) in `.env.local`. Student work is only sent to this computer or a private network address; a public address is refused unless `AI_ALLOW_REMOTE=true` is set, which should follow NCSA authorisation. Student names are never sent. Handwriting from photos needs a model that can read images and a machine that can run it; typed answers work with any text model.

### Real versus simulated in this prototype

| Works for real | Simulated or not built |
|---|---|
| QR answer sheets, generated and printable | The teacher's workspace (classes, exams, marks) is still kept in the browser (`localStorage`, page photos in IndexedDB), so it does not follow the teacher to another device |
| Reading page codes from photos (jsQR), quality check, grayscale | Quality thresholds are first guesses, to be tuned on real scripts |
| Missing and incomplete script tracking | No upload or sync of scripts; "offline queue" is simply local storage |
| Question-by-question marking, versioned rubrics, exam materials and notes | CAMIS and Urubuto files need a real sample of each format first; import is CSV or pasted rows, not a live link to a school system |
| Release gate, consent check, activity record | Email is opened in the teacher's mail app; Domax does not send email or SMS itself yet |
| Results analysis for every class and student, from teacher marks only | Class comparison uses whatever exams are finished; trends need more than a term of data |
| Student portal: one class code, papers, results, messages, questions | Runs on a local SQLite file; it has to move to hosting in Rwanda before real students use it |
| Marking assistant against a local model, recorded beside the teacher's mark | Not tested against a real model yet, only a stand-in server; accuracy on Kinyarwanda and handwriting is unmeasured |
| Sign-in through NextAuth credentials | Only a placeholder account (`demo@domax.com` / `demo123`); the dashboard pages are not protected, but the portal's teacher routes need that sign-in |

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
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Sign-in (required in production). Without a secret in development, sessions end every time the dev server reloads |
| `AI_MODEL`, `AI_BASE_URL`, `AI_API_KEY` | The marking assistant. Off until `AI_MODEL` is set; `AI_BASE_URL` defaults to `http://localhost:11434/v1` |
| `AI_ALLOW_REMOTE` | Set to `true` only after NCSA authorises sending student work to a non-local model |
| `DOMAX_DATA_DIR` | Where the portal's SQLite file is kept. Defaults to `./data` |

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
3. Move the student portal and the teacher's workspace to the same hosted backend, so nothing depends on one browser.
4. CAMIS and Urubuto file formats, from real samples.
5. Measure the marking assistant on real scripts (how often teachers change its marks, by subject and language), then seek NCSA authorisation before any hosted model sees student work.
6. Further roles: second marker, head of department, exam officer, parents, sponsors.

Other Markdown files in the root (`PROJECT_SUMMARY.md`, `QUICK_START.md`, `MARKET_READINESS_ANALYSIS.md`, `ILLUSTRATION_ECOSYSTEM.md`) describe earlier versions of the product and are out of date.
