# 📁 DSK Interior - Project Structure Guide

## 🎨 CSS Files Overview

**You have ONLY ONE CSS file:**
- `app/globals.css` - This is your main CSS file

**Why only one?**
- This project uses **Tailwind CSS** (utility-first CSS framework)
- Most styling is done using Tailwind classes directly in components
- `globals.css` contains:
  - Tailwind directives (`@tailwind base/components/utilities`)
  - Custom CSS utilities and animations
  - Global styles and overrides

---

## 📂 Complete Project Structure

```
DSK Inerior/
│
├── 📄 Configuration Files
│   ├── package.json          # Dependencies and scripts
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.ts    # Tailwind CSS configuration (colors, themes)
│   ├── next.config.js        # Next.js configuration
│   └── postcss.config.js     # PostCSS configuration (for Tailwind)
│
├── 📁 app/                    # Next.js App Router (Main Application)
│   ├── globals.css           # ⭐ THE ONLY CSS FILE
│   ├── layout.tsx            # Root layout (wraps all pages)
│   ├── page.tsx              # Homepage (/)
│   │
│   ├── 📁 api/               # Backend API Routes
│   │   ├── consultation/
│   │   │   └── route.ts      # POST /api/consultation
│   │   ├── contact/
│   │   │   └── route.ts      # POST /api/contact
│   │   └── projects/
│   │       ├── route.ts      # GET /api/projects
│   │       └── [id]/
│   │           └── route.ts  # GET /api/projects/[id]
│   │
│   ├── 📁 portfolio/          # Portfolio Pages
│   │   ├── page.tsx          # /portfolio (list view)
│   │   └── [id]/
│   │       └── page.tsx      # /portfolio/[id] (detail view)
│   │
│   ├── 📁 contact/
│   │   └── page.tsx          # /contact page
│   │
│   └── 📁 consultation/
│       └── page.tsx          # /consultation page
│
├── 📁 components/             # React Components (Reusable UI)
│   ├── 📁 layout/            # Layout Components
│   │   ├── Header.tsx        # Navigation header
│   │   └── Footer.tsx        # Site footer
│   │
│   ├── 📁 home/               # Homepage Sections
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Services.tsx      # Services section
│   │   ├── FeaturedProjects.tsx
│   │   ├── About.tsx
│   │   ├── ServiceAreas.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTA.tsx           # Call-to-action section
│   │
│   ├── 📁 forms/              # Form Components
│   │   └── ConsultationForm.tsx  # Multi-step consultation form
│   │
│   └── 📁 ui/                 # Base UI Components
│       ├── LoadingSpinner.tsx
│       ├── ErrorMessage.tsx
│       └── SuccessMessage.tsx
│
├── 📁 lib/                     # Utility Functions
│   ├── supabase.ts           # Supabase client setup
│   ├── email.ts              # Email service (Resend)
│   └── utils.ts              # Helper functions
│
├── 📁 types/                   # TypeScript Type Definitions
│   └── index.ts              # Shared types/interfaces
│
├── 📁 public/                  # Static Assets
│   └── logo.jpeg             # Company logo
│
└── 📄 Documentation Files
    ├── README.md
    ├── PROGRESS.md
    ├── NOTES.md
    ├── SETUP.md
    └── ... (other .md files)
```

---

## 🎨 How Styling Works

### 1. **Tailwind CSS** (Primary Styling Method)
- **Location**: Classes are written directly in component files (`.tsx`)
- **Example**: `<div className="bg-accent-500 text-white p-4 rounded-lg">`
- **Configuration**: `tailwind.config.ts` defines colors, fonts, etc.

### 2. **globals.css** (Custom Styles)
- **Location**: `app/globals.css`
- **Contains**:
  ```css
  /* Tailwind directives */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  /* Custom utilities */
  .gradient-text { ... }
  .shadow-soft { ... }
  
  /* Animations */
  @keyframes blob { ... }
  ```

### 3. **Component-Level Styling**
- Each component (`.tsx` file) uses Tailwind classes
- No separate CSS files per component
- Styles are co-located with components

---

## 🔍 Key Files Explained

### **app/globals.css** ⭐
- **Purpose**: Global styles, custom utilities, animations
- **When to edit**: 
  - Add custom CSS utilities
  - Define animations
  - Override default styles
  - Add global resets

### **tailwind.config.ts**
- **Purpose**: Configure Tailwind CSS
- **Contains**:
  - Color palette (primary, accent, dark, neutral)
  - Font families
  - Custom animations
  - Breakpoints

### **app/layout.tsx**
- **Purpose**: Root layout that wraps all pages
- **Imports**: `globals.css` (this is where CSS is loaded)
- **Contains**: Metadata, fonts, global providers

---

## 📝 Where Styles Are Applied

### **Global Styles** → `app/globals.css`
```css
body {
  @apply bg-accent-500 text-neutral-900;
}
```

### **Component Styles** → Inside `.tsx` files
```tsx
// components/home/Hero.tsx
<section className="bg-accent-500 p-8">
  <h1 className="text-4xl font-bold">Title</h1>
</section>
```

### **Color Configuration** → `tailwind.config.ts`
```typescript
colors: {
  accent: {
    500: '#FDCDCA', // Your pink color
  }
}
```

---

## 🎯 Quick Reference

| What | Where | Purpose |
|------|-------|---------|
| **CSS File** | `app/globals.css` | Only CSS file - global styles |
| **Colors** | `tailwind.config.ts` | Color palette definition |
| **Components** | `components/` | React components with inline Tailwind |
| **Pages** | `app/` | Next.js pages/routes |
| **API** | `app/api/` | Backend API endpoints |
| **Utilities** | `lib/` | Helper functions |
| **Types** | `types/` | TypeScript definitions |

---

## 💡 How to Add Styles

### **Option 1: Use Tailwind Classes** (Recommended)
```tsx
<div className="bg-accent-500 text-white p-4 rounded-lg">
  Content
</div>
```

### **Option 2: Add to globals.css**
```css
/* In app/globals.css */
@layer utilities {
  .my-custom-class {
    @apply bg-accent-500 p-4;
  }
}
```

### **Option 3: Add to tailwind.config.ts**
```typescript
// For reusable utilities
extend: {
  // Add custom classes here
}
```

---

## 🚀 Summary

✅ **ONE CSS file**: `app/globals.css`  
✅ **Tailwind CSS**: Styling via classes in components  
✅ **Organized structure**: Components, pages, API routes separated  
✅ **TypeScript**: Type-safe code throughout  

**Main takeaway**: You don't need multiple CSS files. Tailwind handles most styling, and `globals.css` is for custom utilities and global overrides.




