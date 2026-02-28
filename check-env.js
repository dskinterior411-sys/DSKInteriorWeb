// Quick script to check environment variables
// Run: node check-env.js

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔍 Checking .env.local file...\n');

if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!');
    console.log('\n📝 Creating .env.local with correct values...\n');
    
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_PASSWORD=your-secure-password-here
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file!');
} else {
    let content = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Current .env.local content:');
    console.log('─'.repeat(50));
    console.log(content);
    console.log('─'.repeat(50));
    
    // Check for placeholder URL
    if (content.includes('YOUR_PROJECT_ID') || content.includes('YOUR_ANON_KEY')) {
        console.log('\n⚠️  Please replace placeholders with your actual Supabase credentials!');
    } else if (content.includes('NEXT_PUBLIC_SUPABASE_URL')) {
        console.log('\n✅ Supabase URL found!');
    } else {
        console.log('\n⚠️  URL not found. Make sure NEXT_PUBLIC_SUPABASE_URL is set.');
    }
}

console.log('\n📋 Next steps:');
console.log('1. Restart your dev server: npm run dev');
console.log('2. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)');
console.log('3. Check browser console for debug info\n');



