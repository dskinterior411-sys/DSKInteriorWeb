# DSK Interior Website

A modern, creative, and bold interior design business website built with Next.js 14, TypeScript, and Tailwind CSS.

## 📊 Project Status

**Current Progress:** 60% Complete

- ✅ Project setup and architecture
- ✅ Core frontend development
- ✅ Portfolio and forms
- ✅ API routes structure
- 🚧 Database integration (in progress)
- 🚧 Email integration (in progress)
- 📋 Content updates (pending)
- 📋 Testing and deployment (pending)

**Track Progress:** See [PROGRESS.md](./PROGRESS.md)  
**Development Notes:** See [NOTES.md](./NOTES.md)

## Features

- 🎨 Creative & Bold Design
- 📱 Fully Responsive
- 🖼️ Portfolio Gallery with Filtering
- 📝 Multi-step Project Consultation Form
- 📧 Contact Forms with Email Integration
- ⚡ Optimized Performance
- 🔍 SEO Optimized

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (Free Tier)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Fill in your environment variables in `.env.local`:
   - Supabase URL and keys
   - Email service API key (Resend recommended)
   - App URL

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── portfolio/         # Portfolio pages
│   ├── contact/           # Contact page
│   ├── consultation/      # Consultation form page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── portfolio/        # Portfolio components
│   └── forms/            # Form components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## Progress Tracking

### Quick Commands

```bash
# View progress
cat PROGRESS.md

# Add a note (using script)
./.progress-tracker.sh

# Or manually edit
code PROGRESS.md
code NOTES.md
```

### Progress Files

- **PROGRESS.md**: Detailed task tracking with completion status
- **NOTES.md**: Quick notes, ideas, and reminders
- **CHANGELOG.md**: Version history and changes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The site will be live with automatic deployments on every push.

## Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Progress Tracker](./PROGRESS.md) - Development progress
- [Development Notes](./NOTES.md) - Notes and comments
- [Changelog](./CHANGELOG.md) - Version history

## Contributing

1. Check [PROGRESS.md](./PROGRESS.md) for current tasks
2. Add notes to [NOTES.md](./NOTES.md) as you work
3. Update progress in [PROGRESS.md](./PROGRESS.md) when tasks are complete
4. Document changes in [CHANGELOG.md](./CHANGELOG.md)

## License

Private - DSK Interior

---

**Last Updated:** 2025-01-10  
**Current Version:** 0.1.0
