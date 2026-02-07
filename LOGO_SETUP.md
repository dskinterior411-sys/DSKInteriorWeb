# Logo Setup Instructions

## 📁 Where to Place Your Logo

1. **Save your logo file** in the `public` folder:
   ```
   /public/logo.png
   ```

2. **Recommended formats:**
   - **PNG** (with transparent background) - `logo.png` ✅ Recommended
   - **SVG** (scalable vector) - `logo.svg` (if you have it)

3. **File requirements:**
   - Minimum size: 200x200px (for PNG)
   - Transparent background (preferred)
   - High resolution for crisp display
   - Optimized for web (compressed but clear)

## ✅ What's Already Set Up

The website is configured to use your logo in:

1. **Header** (top navigation)
   - Displays on all pages
   - Responsive sizing
   - Hover animation

2. **Footer** (bottom of page)
   - White/inverted version for dark background
   - Clickable link to homepage

3. **Favicon** (browser tab icon)
   - Uses logo as site icon

## 🎨 Logo Styling

The logo will automatically:
- Scale responsively on mobile/tablet/desktop
- Maintain aspect ratio
- Have smooth hover animations
- Display with proper contrast (inverted in footer)

## 📝 Next Steps

1. **Save your logo file** as `logo.png` in the `public` folder
2. **Test locally** - Run `npm run dev` and check:
   - Header logo displays correctly
   - Footer logo displays correctly (white/inverted)
   - Logo is clickable and links to homepage
   - Logo looks good on mobile devices

3. **If logo doesn't appear:**
   - Check file name is exactly `logo.png` (case-sensitive)
   - Check file is in the `public` folder (not `public/images`)
   - Clear browser cache and refresh
   - Check browser console for errors

## 🔄 After Adding Logo

Once you've added the logo file:
1. Test locally
2. Commit and push to GitHub
3. Deploy to Vercel
4. Logo will appear on live site!

---

**Current Status:** ✅ Code ready, waiting for logo file

