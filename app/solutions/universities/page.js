import AudiencePage from '@/components/organisms/AudiencePage'
import { EXAM_PRICES, formatRwf } from '@/lib/site'

export const metadata = {
  title: 'For universities & polytechnics — Domax',
  description:
    'Domax helps lecturers mark long handwritten exam scripts: page checks, a first read against the marking scheme, and lecturer sign-off on every mark.',
}

export default function UniversitiesPage() {
  return (
    <AudiencePage
      kicker="For universities & polytechnics"
      facts={[
        { value: formatRwf(EXAM_PRICES.find((l) => l.key === 'university').price), label: 'per student, per exam' },
        { value: 'Up to 15 pages', label: 'included in every exam' },
        { value: 'Lecturers sign', label: 'every mark before it is released' },
      ]}
      title="Long scripts, big cohorts, a first read for every one."
      lede="Long scripts, big cohorts, and marking that lands on lecturers at the busiest point of the semester. This is where Domax starts."
      sections={[
        {
          title: 'Why we’re starting here',
          body: [
            'University and polytechnic scripts are long, and the people marking them are some of the most expensive staff an institution has. That is where a first read saves the most.',
            'Your students are adults, so consent is simpler. We still ask for it, and still mask names before any page is read.',
          ],
        },
        {
          title: 'What lecturers get',
          body: [
            'Scripts sorted and checked before marking starts, so no one spends an evening hunting for page 4. Every answer comes with a suggested mark per point in your scheme, and the evidence it was given for. Lecturers accept, change, or mark it themselves, and sign off.',
            'Answers with long derivations or diagrams are marked by the lecturer. Domax organises them but doesn’t suggest a mark until the pilot shows it can.',
          ],
        },
        {
          title: 'What the exams office gets',
          body: [
            'A complete record of who marked what, what was suggested, and what was changed, ready for moderation and appeals. Marks come out in a sheet you can import, not retype.',
          ],
        },
      ]}
      closing="If you run exams at a university, a Rwanda Polytechnic college or another TVET institution, we’d like to talk about a pilot on one or two courses this term."
    />
  )
}
