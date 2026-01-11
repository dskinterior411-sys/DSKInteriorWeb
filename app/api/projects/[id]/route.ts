import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/types";
import { createSupabaseClient } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Fallback mock project data - used if Supabase is not configured
const mockProjects: Record<string, Project> = {
  "1": {
    id: "1",
    title: "Modern Luxury Apartment",
    description: "A stunning transformation of a 3-bedroom apartment into a modern luxury living space. This project showcases contemporary design with elegant finishes and smart space utilization.",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
    ],
    location: "New York, NY",
    year: 2024,
    featured: true,
  },
  "2": {
    id: "2",
    title: "Corporate Headquarters",
    description: "A sophisticated workspace that inspires creativity and collaboration.",
    category: "corporate",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    ],
    location: "San Francisco, CA",
    year: 2024,
    featured: true,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const supabase = createSupabaseClient();
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Database error:", error);
        // Fallback to mock data
        const project = mockProjects[id];
        if (!project) {
          return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
          );
        }
        return NextResponse.json({ project }, { status: 200 });
      }

      if (!data) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Transform Supabase data to match Project type
      const project: Project = {
        id: data.id,
        title: data.title,
        description: data.description || "",
        category: data.category,
        images: data.images || [],
        location: data.location || "",
        year: data.year || new Date().getFullYear(),
        featured: data.featured || false,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return NextResponse.json({ project }, { status: 200 });
    } catch (supabaseError) {
      // If Supabase is not configured, use mock data
      if (supabaseError instanceof Error && supabaseError.message.includes("Missing Supabase")) {
        console.warn("Supabase not configured. Using mock data.");
        const project = mockProjects[id];
        if (!project) {
          return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
          );
        }
        return NextResponse.json({ project }, { status: 200 });
      }
      throw supabaseError;
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

