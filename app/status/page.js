import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'System Status — Domax',
  description: 'Check the current status of Domax services and view uptime history.',
}

export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.9%' },
    { name: 'Grading Engine', status: 'operational', uptime: '99.8%' },
    { name: 'File Processing', status: 'operational', uptime: '99.9%' },
    { name: 'LMS Integrations', status: 'operational', uptime: '99.7%' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              System Status
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Check the current status of Domax services. All systems are operational.
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-white border border-line rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="text-[17px] font-semibold text-ink mb-1">{service.name}</h3>
                    <p className="text-sm text-ink-2">Uptime: {service.uptime}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-positive-soft text-positive rounded-md text-sm font-semibold">
                      {service.status}
                    </span>
                    <div className="w-2.5 h-2.5 bg-[#00cd90] rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 sm:p-10 bg-canvas border border-line rounded-2xl text-center">
              <p className="text-ink-2 mb-2">Last updated: {new Date().toLocaleString()}</p>
              <p className="text-sm text-ink-3">All systems operational. No incidents reported.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










