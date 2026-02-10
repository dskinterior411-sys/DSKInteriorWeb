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
            query = query.eq('category', category.toLowerCase());
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
