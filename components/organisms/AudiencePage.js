import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'

/**
 * Layout for the "who it's for" pages: a heading, an intro, a few titled
 * sections, and a closing call to action.
 */
export default function AudiencePage({ title, lede, sections, closing }) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">{title}</h1>
            <p className="lede mt-5">{lede}</p>
          </div>

          <div className="mt-14 max-w-3xl border-t border-line">
            {sections.map((section) => (
              <section key={section.title} className="py-9 border-b border-line">
                <h2 className="text-2xl">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] text-ink-2 leading-relaxed mt-3">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-14 max-w-2xl">
            <p className="text-[17px] text-ink-2 leading-relaxed">{closing}</p>
            <div className="mt-6">
              <Button href="/pilot" variant="primary" size="lg">
                Request a pilot
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
