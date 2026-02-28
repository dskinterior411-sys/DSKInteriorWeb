import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reset = searchParams.get('reset') === 'true';
    const supabase = createServerSupabaseClient();
    const results: Record<string, string> = {};

    const projects = [
        {
            title: 'Modern Luxury Apartment',
            category: 'Residential',
            description: 'A stunning transformation of a 3-bedroom apartment into a modern luxury living space. This project showcases contemporary design with elegant finishes and smart space utilization.',
            location: 'New York, NY',
            year: 2024,
            featured: true,
            images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200']
        },
        {
            title: 'Corporate Headquarters',
            category: 'Commercial',
            description: 'A flagship office space designed to foster collaboration and innovation. Features open-plan areas, private pods, and a biophilic design approach.',
            location: 'San Francisco, CA',
            year: 2024,
            featured: false,
            images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200']
        },
        {
            title: 'Boutique Retail Store',
            category: 'Retail',
            description: 'An immersive retail environment for a high-end fashion brand. The design focuses on customer journey and product highlighting.',
            location: 'Los Angeles, CA',
            year: 2023,
            featured: false,
            images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200']
        },
        {
            title: 'Contemporary Office Space',
            category: 'Office',
            description: 'Modern office interior maximizing natural light and ergonomic comfort.',
            location: 'Chicago, IL',
            year: 2023,
            featured: false,
            images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200']
        },
        {
            title: 'Luxury Hotel Lobby',
            category: 'Hospitality',
            description: 'Grand entrance lobby for a 5-star hotel, featuring custom chandeliers and marble flooring.',
            location: 'Miami, FL',
            year: 2024,
            featured: false,
            images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200']
        },
        {
            title: 'Family Home Renovation',
            category: 'Residential',
            description: 'Complete renovation of a suburban family home, adding warmth and modern amenities.',
            location: 'Seattle, WA',
            year: 2023,
            featured: false,
            images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200']
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Homeowner',
            company: '',
            content: 'DSK Interior transformed our home beyond our expectations. Their attention to detail and creative vision is unmatched. We couldn\'t be happier!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Michael Chen',
            role: 'CEO',
            company: 'Tech Innovations',
            content: 'The corporate office redesign was phenomenal. Our team productivity has increased, and the space reflects our brand perfectly.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Director',
            company: 'Boutique Fashion',
            content: 'Our retail space is now a destination. Customers love the atmosphere, and sales have increased significantly. Highly recommend!',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
        }
    ];

    const services = [
        { title: 'Interior Design', description: 'Full-service residential design focused on creating functional yet luxurious living environments.', icon: 'Armchair', order: 1, link: '/contact?service=interior-design' },
        { title: 'Space Planning', description: 'Optimizing the layout of your home to ensure flow, balance, and maximum utility.', icon: 'Layout', order: 2, link: '/contact?service=space-planning' },
        { title: 'Styling & Decor', description: 'The finishing touches that turn a house into a home, from art selection to custom textiles.', icon: 'Palette', order: 3, link: '/contact?service=styling' },
        { title: 'Commercial Design', description: 'Create professional workspaces that enhance productivity and brand identity.', icon: 'Building2', order: 4, link: '/contact?service=commercial' },
        { title: 'Renovation', description: 'Expert guidance through structural changes and updates to breathe new life into your space.', icon: 'Home', order: 5, link: '/contact?service=renovation' },
        { title: 'Custom Furniture', description: 'Bespoke furniture design tailored specifically to your dimensions and style preferences.', icon: 'PenTool', order: 6, link: '/contact?service=custom-furniture' }
    ];

    const stats = [
        { label: 'Years Experience', value: '6+', order: 1 },
        { label: 'Projects Completed', value: '35+', order: 2 },
        { label: 'Cities Covered', value: '3', order: 3 },
        { label: 'Client Satisfaction', value: '100%', order: 4 }
    ];

    const settings = [
        { key: 'contact_phone', value: '+91 92261 46504', description: 'Main contact phone number' },
        { key: 'contact_email', value: 'dskinteriorsofficial@gmail.com', description: 'Primary contact email' },
        { key: 'contact_address', value: 'Shop No 3, Aaradhya Nakshtra, Near Ashoka College, Chandshi, Nashik 422003', description: 'Physical office address' },
        { key: 'social_instagram', value: 'https://instagram.com/dskinteriorsofficial?igsh=Yml0dThwdm1lMTZo&utm_source=qr', description: 'Instagram profile URL' },
        { key: 'social_facebook', value: 'https://www.facebook.com/dskinteriors', description: 'Facebook profile URL' },
        { key: 'social_linkedin', value: 'https://www.linkedin.com/company/dsk-interiors', description: 'LinkedIn profile URL' },
        { key: 'social_youtube', value: 'https://www.youtube.com/@DskInteriors', description: 'YouTube channel URL' },
        { key: 'hero_title', value: 'ELEVATING YOUR SPACE', description: 'Main heading on the home page' },
        { key: 'hero_subtitle', value: 'Inspired Interiors for Modern Living', description: 'Subtitle on the home page' },
        { key: 'hero_image', value: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000', description: 'Background image for the hero section' },
        { key: 'about_image', value: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000', description: 'Main image in the About section' },
        { key: 'about_story', value: 'At DSK Interiors, we believe that luxury is not just about aesthetics, but about the feeling of belonging. With over 6 years of experience transforming spaces in Nashik, Pune, and Mumbai, we blend functionality with sophisticated design to create homes and offices that inspire.', description: 'Company story text' }
    ];

    try {
        // Force Reset: Delete all data
        if (reset) {
            // ... (keep existing deletions) ...

            // 5. Settings
            const { data: stData } = await supabase.from('settings').select('key');
            if (stData && stData.length > 0) {
                const keys = stData.map(s => s.key);
                const { error } = await supabase.from('settings').delete().in('key', keys);
                if (error) results['settings_delete_error'] = error.message;
            }

            results['reset'] = 'Attempted to clear data via ID list.';
        }

        // ... (keep existing insertions) ...

        // 5. Settings
        const { count: settingsCount } = await supabase.from('settings').select('*', { count: 'exact', head: true });
        if (settingsCount === 0) {
            const { error } = await supabase.from('settings').insert(settings);
            if (error) { results['settings_error'] = error.message; }
            else { results['settings'] = 'Seeded'; }
        } else {
            results['settings'] = 'Skipped (Data exists)';
        }

        return NextResponse.json({ message: 'Seeding complete', details: results });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to seed database', details: error }, { status: 500 });
    }
}
