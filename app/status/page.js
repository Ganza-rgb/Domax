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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Status">
              System Status
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Check the current status of Domax services. All systems are operational.
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-[#f0f7ff] rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                      {service.status}
                    </span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] rounded-2xl text-center">
              <p className="text-gray-600 mb-2">Last updated: {new Date().toLocaleString()}</p>
              <p className="text-sm text-gray-500">All systems operational. No incidents reported.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










