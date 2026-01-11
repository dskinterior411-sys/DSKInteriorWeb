# DSK Interior - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service (Resend recommended)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@dskinterior.com
EMAIL_TO=contact@dskinterior.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the following SQL in the Supabase SQL Editor:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  images TEXT[],
  location TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation requests table
CREATE TABLE consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type TEXT NOT NULL,
  space_size TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  location TEXT NOT NULL,
  style_preferences TEXT[],
  specific_requirements TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, for public access)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read for projects, insert for forms)
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
```

### 4. Set Up Email Service (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key
3. Add it to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Next Steps

1. **Update Content**: Replace placeholder content with your actual information
2. **Add Projects**: Add your portfolio projects to the Supabase database
3. **Customize Design**: Adjust colors, fonts, and styling in `tailwind.config.ts`
4. **Configure Domain**: Set up your custom domain in Vercel
5. **Test Forms**: Test the consultation and contact forms

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will automatically deploy on every push to your main branch.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── portfolio/         # Portfolio pages
│   ├── contact/           # Contact page
│   ├── consultation/      # Consultation form page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── home/             # Homepage sections
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Troubleshooting

### Common Issues

1. **Module not found**: Run `npm install` again
2. **Environment variables**: Make sure `.env.local` is in the root directory
3. **Database connection**: Verify Supabase credentials
4. **Email not sending**: Check Resend API key and domain verification

## Support

For issues or questions, refer to the main README.md file.




