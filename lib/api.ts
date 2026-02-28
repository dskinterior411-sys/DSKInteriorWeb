import { createSupabaseClient } from './supabase';

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    location?: string;
    year?: number;
    featured: boolean;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
    link: string;
}

export interface Stat {
    id: string;
    label: string;
    value: string;
    order: number;
}

export async function getFeaturedProjects(): Promise<Project[]> {
    const supabase = createSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('featured', true)
            .order('created_at', { ascending: false })
            .limit(3);

        if (error) {
            console.error('Error fetching featured projects:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching featured projects:', error);
        return [];
    }
}

export async function getProjects(category?: string): Promise<Project[]> {
    const supabase = createSupabaseClient();

    try {
        let query = supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (category && category !== 'All') {
            query = query.eq('category', category); // Changed to exact match as usually categories are capitalized in DB or need normalization
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching projects:', error);
        return [];
    }
}

export async function getProjectById(id: string): Promise<Project | null> {
    const supabase = createSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching project with id ${id}:`, error);
            return null;
        }

        return data;
    } catch (error) {
        console.error(`Unexpected error fetching project with id ${id}:`, error);
        return null;
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching testimonials:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching testimonials:', error);
        return [];
    }
}

export async function getServices(): Promise<Service[]> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching services:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching services:', error);
        return [];
    }
}

export async function getStats(): Promise<Stat[]> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('stats')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching stats:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching stats:', error);
        return [];
    }
}

export interface Settings {
    [key: string]: string;
}

export async function getSettings(): Promise<Settings> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*');

        if (error) {
            console.error('Error fetching settings:', error);
            return {};
        }

        // Convert array of {key, value} to object {key: value}
        const settings: Settings = {};
        data?.forEach((item: any) => {
            settings[item.key] = item.value;
        });

        return settings;
    } catch (error) {
        console.error('Unexpected error fetching settings:', error);
        return {};
    }
}

export interface Location {
    id: string;
    city: string;
    description: string;
    image: string;
    order: number;
}

export async function getLocations(): Promise<Location[]> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching locations:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching locations:', error);
        return [];
    }
}

export interface WhyChooseUs {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

export async function getWhyChooseUs(): Promise<WhyChooseUs[]> {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('why_choose_us')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error('Error fetching why choose us:', error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching why choose us:', error);
        return [];
    }
}
