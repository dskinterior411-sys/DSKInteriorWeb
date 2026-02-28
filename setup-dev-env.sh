#!/bin/bash

# Setup Development Environment Variables
# This script updates .env.local with development Supabase credentials

echo "🔧 Setting up development environment variables..."
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "📄 Found existing .env.local file"
    echo "⚠️  Backing up to .env.local.backup"
    cp .env.local .env.local.backup
else
    echo "📝 Creating new .env.local file"
fi

# Create/update .env.local with development credentials
cat > .env.local << 'EOF'
# Development Environment Variables
# DO NOT COMMIT THIS FILE TO GIT

# Supabase - Development Project
# Replace these placeholders with your actual development project credentials
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_DEV_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_DEV_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_DEV_SERVICE_ROLE_KEY

# Admin Authentication
ADMIN_PASSWORD=your-secure-password-here

# Email Service (Optional - for development)
# RESEND_API_KEY=re_your_resend_api_key_here
# EMAIL_FROM=onboarding@resend.dev
# EMAIL_TO=your-email@example.com

# App URL (for development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ .env.local updated with development credentials!"
echo ""
echo "📋 Next steps:"
echo "1. Update ADMIN_PASSWORD in .env.local with a secure password"
echo "2. Restart your dev server: npm run dev"
echo "3. Run database schema on development Supabase project"
echo ""
echo "🔗 Development Supabase: Replace YOUR_DEV_PROJECT_ID with your actual project ID"
echo "📚 See PRODUCTION_ENV_VARS.md for production setup"


