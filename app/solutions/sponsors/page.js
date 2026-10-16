import AudiencePage from '@/components/organisms/AudiencePage'

export const metadata = {
  title: 'For sponsors & districts — Domax',
  description:
    'Fund marking support for public schools at a published cost-plus price per exam. Schools and students pay nothing, and you see what you are paying for.',
}

export default function SponsorsPage() {
  return (
    <AudiencePage
      title="For sponsors & districts"
      lede="Public schools don’t have a budget line for marking, and teachers’ marking happens in unpaid evenings. If your organisation funds teacher support, Domax gives you something concrete and measurable to fund."
      sections={[
        {
          title: 'How the money works',
          body: [
            'You pay a cost-plus price per exam marked, plus a fixed platform fee. We publish what each exam costs us to process and what our margin is, so you can see where the money goes. Schools and their students pay nothing.',
          ],
        },
        {
          title: 'What you get back',
          body: [
            'Each term, a report for every school you support: hours of teacher marking saved, how quickly results reached students, and how often teachers changed a suggested mark. These come from measurements in the product, not from estimates.',
          ],
        },
        {
          title: 'What stays fixed',
          body: [
            'Teachers sign every mark. Students see their results for free. Student data is stored in Rwanda and handled under Law 058/2021, with parents informed through the school. These terms are the same in every contract.',
          ],
        },
        {
          title: 'Starting small',
          body: [
            'We’d suggest funding one school for one term first, with the results shared openly, before committing to more.',
          ],
        },
      ]}
      closing="If you’re a district education office, an NGO or a development partner working with Rwandan schools, we’d like to talk."
    />
  )
}
