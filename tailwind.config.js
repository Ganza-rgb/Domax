/** @type {import('tailwindcss').Config} */
// Loaded by Tailwind v4 through `@config` in app/globals.css.
// Semantic roles mirror the CSS variables defined there.
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
          muted: '#5B6B82',
        },
        // Text
        ink: {
          DEFAULT: '#0A3059',
          2: '#4A5D75',
          3: '#5B6B82',
        },
        // Surfaces & lines
        canvas: '#F6F8FA',
        tint: '#F0F7FF',
        line: {
          DEFAULT: '#E3E8EF',
          strong: '#CFD8E3',
        },
        // Actions & status
        accent: {
          DEFAULT: '#005ffe',
          strong: '#0047cc',
          soft: '#E8F0FF',
        },
        positive: {
          DEFAULT: '#007A56',
          soft: '#E3F8F1',
        },
        caution: {
          DEFAULT: '#B45309',
          soft: '#FFF4E5',
        },
        critical: {
          DEFAULT: '#E11D48',
          soft: '#FDECEF',
        },
      },
      fontFamily: {
        headline: ['var(--font-display)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
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
        card: '0 1px 2px rgba(10, 48, 89, 0.05), 0 4px 12px -6px rgba(10, 48, 89, 0.12)',
        'card-hover': '0 2px 4px rgba(10, 48, 89, 0.06), 0 12px 28px -12px rgba(10, 48, 89, 0.22)',
        pop: '0 12px 32px -8px rgba(10, 48, 89, 0.22), 0 2px 6px rgba(10, 48, 89, 0.08)',
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
