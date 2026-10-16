import AudiencePage from '@/components/organisms/AudiencePage'

export const metadata = {
  title: 'For secondary schools — Domax',
  description:
    'Domax helps O-Level and A-Level teachers mark handwritten assessments, with every mark signed by the teacher and results free for students.',
}

export default function SchoolsPage() {
  return (
    <AudiencePage
      title="For secondary schools"
      lede="A teacher with several streams of forty or more students marks hundreds of scripts at the end of every term, usually at night. Domax does the first read so they can spend that time on the answers that need them."
      sections={[
        {
          title: 'How it fits the term',
          body: [
            'Teachers set and sit assessments as they do now. Students write on paper. The only addition is a header sheet on each script, which tells Domax whose it is and how many pages it should have.',
            'After the exam, a teacher or the school’s ICT lead photographs or scans the scripts. Capture works offline and uploads when the connection allows.',
          ],
        },
        {
          title: 'Teachers stay in charge',
          body: [
            'Domax suggests marks against the school’s own marking scheme. Teachers review every answer, change what they disagree with, and sign before anything is released. Marks come out in a sheet set out for CAMIS.',
          ],
        },
        {
          title: 'Students’ data and parents',
          body: [
            'Most secondary students are under 16, so we work through the school: parents are told what Domax does, and consent is arranged with you before any real scripts are used. Names are masked before any page is read by AI, and scripts are stored in Rwanda.',
          ],
        },
        {
          title: 'Students see their results free',
          body: [
            'Each class gets an access code. Students use it to see their marked scripts and anything their teacher chooses to share. They never pay, and access never depends on the school’s account.',
          ],
        },
        {
          title: 'Price',
          body: [
            'O-Level: RWF 250 per student per exam, up to 8 pages. A-Level: RWF 350, up to 12 pages. Private schools pay directly. For public schools, we look for a sponsor so the school pays nothing.',
          ],
        },
      ]}
      closing="We’re looking for one secondary school, ideally outside Kigali, to pilot with this term. If that could be you, tell us about your school."
    />
  )
}
