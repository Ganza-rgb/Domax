import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import PageHero from '@/components/site/PageHero'
import ClosingCta from '@/components/site/ClosingCta'
import Reveal from '@/components/site/Reveal'

/**
 * Layout for the "who it's for" pages: a hero, a row of key facts, titled
 * sections, and the closing call to action.
 *
 * facts: [{ value, label }]  sections: [{ title, body: [paragraph] }]
 */
export default function AudiencePage({ kicker, title, lede, facts = [], sections, closing }) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero kicker={kicker} title={title} lede={lede}>
        <Button href="/pilot" size="xl">Request a pilot</Button>
        <Button href="/how-it-works" variant="secondary" size="xl">How it works</Button>
      </PageHero>

      <Reveal>
        {facts.length > 0 && (
          <div className="container-custom">
            <dl
              data-reveal
              data-reveal-stagger
              className={`grid grid-cols-1 sm:grid-cols-2 ${facts.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-[20px] bg-canvas p-6 sm:p-7">
                  <dd className="font-headline text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink leading-tight">
                    {fact.value}
                  </dd>
                  <dt className="text-[15px] text-ink-2 mt-2 leading-snug">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="container-custom py-20 sm:py-28">
          {sections.map((section) => (
            <section
              key={section.title}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-4 lg:gap-16 py-10 border-t border-line first:border-t-0 first:pt-0"
            >
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">{section.title}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] text-ink-2 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Reveal>

      <ClosingCta title="Let’s talk about a pilot." copy={closing} />
      <Footer />
    </main>
  )
}
