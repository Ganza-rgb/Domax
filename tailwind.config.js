/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A3059',
          'primary-blue': '#005ffe',
          teal: '#00cd90',
          'success-start': '#00cd90',
          'success-end': '#2DD4BF',
          orange: '#FF9F43',
        },
        surface: {
          dark: '#0F172A',
          light: '#FFFFFF',
          neutral: '#F6F8FA',
        },
        text: {
          muted: '#6B7280',
        },
      },
      fontFamily: {
        headline: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.01em' }],
        'hero': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        card: '12px',
        'card-lg': '16px',
      },
      boxShadow: {
        card: '0 6px 18px rgba(10, 37, 102, 0.06)',
        'card-hover': '0 12px 24px rgba(10, 37, 102, 0.12)',
        glow: '0 0 20px rgba(45, 212, 191, 0.3)',
      },
      backgroundImage: {
        'gradient-success': 'linear-gradient(135deg, #00cd90 0%, #2DD4BF 100%)',
        'gradient-primary': 'linear-gradient(135deg, #005ffe 0%, #0047cc 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00cd90 0%, #00b080 100%)',
      },
    },
  },
  plugins: [],
}

