# Domax — Automated Student Paper Correction & Review Platform (Rwanda focused)

A modern web application built with Next.js for automated student paper grading, rubric-based scoring, in-document annotations, and comprehensive analytics.

## 🚀 Features

### Public Marketing Site
- **Homepage**: Hero section with clear value proposition
- **Features**: Detailed feature showcase
- **Pricing**: Transparent pricing tiers (Starter, Pro, Enterprise)
- **About**: Company mission and values
- **Blog**: SEO-optimized content hub ##Currently not available yet
- **Contact/Demo**: Lead capture forms

### Authenticated Application
- **Dashboard**: Course and assignment management
- **Document Viewer**: PDF/DOCX viewing with annotation tools
- **Rubric System**: Create, edit, and apply rubrics
- **Grading Interface**: Inline annotations, comments, scoring
- **Analytics**: Class performance dashboards
- **Integrations**: LMS sync, Google Drive, SSO

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES Modules)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion + GSAP
- **Authentication**: NextAuth.js
- **Icons**: Heroicons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Brand Colors
- **Navy**: `#0A3059` (Primary brand color)
- **Primary Blue**: `#2563EB`
- **Success Gradient**: `#00C389` → `#2DD4BF`
- **Accent Orange**: `#FF9F43`

### Typography
- **Headlines**: Poppins (600-700 weight)
- **Body**: Inter (400 weight)

### Spacing
- Container max-width: 1200px
- 12-column grid system
- Vertical rhythm: 16/24/32/48/64px scale

## 📁 Project Structure

```
domax/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Authenticated app pages
│   └── page.js            # Homepage
├── components/             # React components
│   ├── atoms/             # Basic components (Button, Card, Input)
│   ├── molecules/         # Composite components (Navbar, Forms)
│   └── organisms/         # Complex components (Hero, FeatureGrid)
├── lib/                   # Utilities and helpers
├── services/              # API service wrappers
├── styles/                # Global styles
└── public/                # Static assets
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (when implemented)
DATABASE_URL=your-database-url

# Object Storage (S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=domax-submissions
```

## 🚦 Development Workflow

1. **Component Development**: Follow atomic design principles
2. **Styling**: Use Tailwind utility classes + custom CSS variables
3. **Animations**: Framer Motion for components, GSAP for complex timelines
4. **Accessibility**: WCAG AA compliance, keyboard navigation, screen reader support
5. **Performance**: Code splitting, image optimization, SSR/SSG

## 📝 SEO Implementation

- Server-side rendering for all public pages
- Structured data (JSON-LD) for Product, Organization, FAQ
- Semantic HTML with proper heading hierarchy
- Open Graph and Twitter Card metadata
- Sitemap.xml and robots.txt
- Canonical URLs

## 🧪 Testing

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## 📄 License

ISC

## 🎯 Roadmap

### MVP (Weeks 0-8)
- [x] Project setup and design system
- [x] Public marketing pages
- [ ] Authentication system
- [ ] Basic dashboard
- [ ] Document upload and viewer
- [ ] Rubric creation and grading
- [ ] Basic analytics

### Phase 2 (Weeks 9-16)
- [ ] Inline annotation editor
- [ ] Batch grading
- [ ] Automated scoring suggestions
- [ ] Plagiarism detection
- [ ] LMS integrations
- [ ] Admin panel and billing

### Phase 3
- [ ] Enterprise SSO (SAML)
- [ ] Advanced analytics
- [ ] Multi-region support
- [ ] Mobile app










