# Content Replacement Checklist - DSK Interior

Use this checklist to gather all the information needed to replace mock/placeholder data with your actual company information.

---

## 📞 Contact Information

### Primary Contact Details
- [ ] **Company Phone Number**
  - Current: `+1 (555) 123-4567`
  - Location: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/home/CTA.tsx`

- [ ] **Company Email Address**
  - Current: `contact@dskinterior.com`
  - Location: `components/layout/Footer.tsx`, `components/home/CTA.tsx`, `.env.local` (EMAIL_TO)

- [ ] **Company Address**
  - Current: `Your City, Country`
  - Location: `components/layout/Footer.tsx`

- [ ] **Business Hours** (Optional - add if needed)
  - Location: Footer or Contact page

---

## 🏢 Company Information

### Basic Details
- [ ] **Company Name** (if different from "DSK Interior")
  - Current: `DSK Interior`
  - Location: Multiple files (Header, Footer, metadata)

- [ ] **Company Tagline/Slogan**
  - Current: `Transform your space with bold, innovative designs`
  - Location: `components/home/Hero.tsx`

- [ ] **Company Description** (for About section)
  - Current: Generic description
  - Location: `components/home/About.tsx`

### Statistics (Update with real numbers)
- [ ] **Number of Projects Completed**
  - Current: `500+`
  - Location: `components/home/Hero.tsx`, `components/home/About.tsx`

- [ ] **Number of Happy Clients**
  - Current: `200+`
  - Location: `components/home/Hero.tsx`, `components/home/About.tsx`

- [ ] **Years of Experience**
  - Current: `15+`
  - Location: `components/home/Hero.tsx`, `components/home/About.tsx`

- [ ] **Awards/Recognition** (Optional)
  - Current: `50+`
  - Location: `components/home/About.tsx`

---

## 📸 Portfolio/Projects Data

### Project Information (Add to Supabase Database)

For each project, gather:

- [ ] **Project Title**
- [ ] **Project Description** (2-3 sentences)
- [ ] **Project Category** (residential, commercial, retail, corporate, hospitality)
- [ ] **Project Images** (High-quality photos - at least 3-5 per project)
  - Main image URL
  - Additional image URLs
- [ ] **Location** (City, State/Country)
- [ ] **Year Completed**
- [ ] **Featured** (Yes/No - for homepage showcase)
- [ ] **Key Features** (List of features/amenities)

**Minimum Recommended:**
- 6-10 projects total
- At least 2-3 featured projects for homepage
- Mix of categories (residential, commercial, etc.)

**Where to Add:** Supabase Dashboard → Table Editor → `projects` table

---

## 💬 Testimonials

For each testimonial, gather:

- [ ] **Client Name**
- [ ] **Client Role/Title**
- [ ] **Company Name** (if applicable)
- [ ] **Testimonial Content** (2-3 sentences)
- [ ] **Client Photo** (Optional - professional headshot)
- [ ] **Rating** (1-5 stars)

**Minimum Recommended:** 3-5 testimonials

**Location:** `components/home/Testimonials.tsx` (or add to database)

---

## 🎨 Services Information

### Service Details (Update descriptions if needed)

- [ ] **Residential Design**
  - Description: Current generic text
  - Features list: Update if needed
  - Location: `components/home/Services.tsx`

- [ ] **Commercial Design**
  - Description: Current generic text
  - Features list: Update if needed

- [ ] **Retail Design**
  - Description: Current generic text
  - Features list: Update if needed

- [ ] **Corporate Design**
  - Description: Current generic text
  - Features list: Update if needed

- [ ] **Hospitality Design**
  - Description: Current generic text
  - Features list: Update if needed

- [ ] **Custom Solutions**
  - Description: Current generic text
  - Features list: Update if needed

**Note:** If you offer different services, update the services array in `components/home/Services.tsx`

---

## 📝 About Section Content

- [ ] **Company Story/History**
  - Current: Generic text about experience
  - Location: `components/home/About.tsx`

- [ ] **Mission/Vision** (Optional)
  - Add if you have a specific mission statement

- [ ] **Team Information** (Optional)
  - Team size
  - Key team members
  - Expertise areas

- [ ] **Values/Principles**
  - Current: 4 values listed
  - Location: `components/home/About.tsx`
  - Update: Passion for Design, Excellence, Client-Centric, Timely Delivery

---

## 🔗 Social Media Links

- [ ] **Facebook URL**
  - Current: `#`
  - Location: `components/layout/Footer.tsx`

- [ ] **Instagram URL**
  - Current: `#`
  - Location: `components/layout/Footer.tsx`

- [ ] **LinkedIn URL**
  - Current: `#`
  - Location: `components/layout/Footer.tsx`

- [ ] **Other Social Media** (if applicable)
  - Twitter/X
  - Pinterest
  - YouTube
  - TikTok

---

## 📧 Email Configuration

- [ ] **Email From Address**
  - Current: `noreply@dskinterior.com` or `onboarding@resend.dev`
  - Location: `.env.local`, Vercel environment variables
  - **Note:** Must be verified domain in Resend for production

- [ ] **Email To Address** (where form submissions go)
  - Current: `contact@dskinterior.com`
  - Location: `.env.local`, Vercel environment variables

---

## 🖼️ Images & Media

### Logo
- [ ] **Company Logo** (if you have one)
  - Format: PNG/SVG with transparent background
  - Location: `public/logo.png` or `public/logo.svg`
  - Update: `components/layout/Header.tsx`

### Hero Section
- [ ] **Hero Background Image/Video** (Optional)
  - Current: Gradient background
  - Location: `components/home/Hero.tsx`

### Project Images
- [ ] **High-quality project photos**
  - Minimum: 3-5 images per project
  - Recommended: 1920x1080px or higher
  - Format: JPG/WebP
  - **Storage Options:**
    - Upload to Supabase Storage
    - Use Cloudinary/ImageKit
    - Host on CDN

---

## 🌐 SEO & Metadata

### Page Metadata
- [ ] **Site Title**
  - Current: `DSK Interior - Creative Interior Design Solutions`
  - Location: `app/layout.tsx`

- [ ] **Site Description**
  - Current: Generic description
  - Location: `app/layout.tsx`

- [ ] **Keywords** (for SEO)
  - Location: `app/layout.tsx`

- [ ] **Open Graph Image** (for social media sharing)
  - Location: `app/layout.tsx`

---

## 📄 Legal Pages (Optional but Recommended)

- [ ] **Privacy Policy**
  - Create: `app/privacy/page.tsx`
  - Link in Footer

- [ ] **Terms of Service**
  - Create: `app/terms/page.tsx`
  - Link in Footer

---

## 🎯 Call-to-Action Text

- [ ] **Hero CTA Button Text**
  - Current: `Get Free Consultation`
  - Location: `components/home/Hero.tsx`

- [ ] **Hero Secondary CTA**
  - Current: `View Our Work`
  - Location: `components/home/Hero.tsx`

- [ ] **Footer CTA** (if different)
  - Location: `components/home/CTA.tsx`

---

## 📋 Form Configuration

### Consultation Form Options
- [ ] **Budget Ranges** (Update if needed)
  - Current: Under $10k, $10k-$25k, etc.
  - Location: `components/forms/ConsultationForm.tsx`

- [ ] **Timeline Options** (Update if needed)
  - Current: ASAP, 1-3 months, etc.
  - Location: `components/forms/ConsultationForm.tsx`

- [ ] **Style Preferences** (Update if needed)
  - Current: Modern, Contemporary, Traditional, etc.
  - Location: `components/forms/ConsultationForm.tsx`

---

## 📍 Location-Specific Information

- [ ] **Service Areas**
  - Cities/regions you serve
  - Add to About section or separate page

- [ ] **Office Location(s)**
  - Physical address(es)
  - Map integration (optional)

---

## 🎨 Brand Colors (Optional - if you want to change)

- [ ] **Primary Color**
  - Current: Red (#ef4444)
  - Location: `tailwind.config.ts`

- [ ] **Accent Color**
  - Current: Blue (#0ea5e9)
  - Location: `tailwind.config.ts`

---

## 📊 Quick Reference: Files to Update

### High Priority
1. `components/layout/Footer.tsx` - Contact info, social links
2. `components/layout/Header.tsx` - Phone number
3. `components/home/Hero.tsx` - Stats, tagline
4. `components/home/About.tsx` - Company story, stats
5. `components/home/Testimonials.tsx` - Real testimonials
6. `app/layout.tsx` - SEO metadata
7. Supabase Database - Projects data

### Medium Priority
8. `components/home/Services.tsx` - Service descriptions
9. `components/home/CTA.tsx` - Contact info
10. `.env.local` - Email addresses

### Low Priority
11. `tailwind.config.ts` - Brand colors (if changing)
12. Legal pages (Privacy, Terms)

---

## ✅ Data Collection Template

Use this template to gather information:

```markdown
## Company Information
- Name: _______________
- Phone: _______________
- Email: _______________
- Address: _______________

## Statistics
- Projects: _______________
- Clients: _______________
- Years: _______________
- Awards: _______________

## Social Media
- Facebook: _______________
- Instagram: _______________
- LinkedIn: _______________

## Projects (List each)
1. Title: _______________
   Category: _______________
   Location: _______________
   Year: _______________
   Images: _______________

## Testimonials (List each)
1. Name: _______________
   Company: _______________
   Quote: _______________
```

---

## 🚀 After Gathering Data

1. **Update Files**: Replace placeholder text with actual data
2. **Add Projects**: Insert project data into Supabase
3. **Add Testimonials**: Update testimonials component
4. **Test**: Verify all information displays correctly
5. **Deploy**: Push changes and redeploy

---

**Need Help?** Check individual component files for exact locations of each piece of content.



