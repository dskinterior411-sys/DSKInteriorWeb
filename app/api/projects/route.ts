import { NextRequest, NextResponse } from "next/server";
import { Project, ProjectCategory } from "@/types";
import { createSupabaseClient } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Fallback mock projects data - used if Supabase is not configured
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    description: "A stunning transformation of a 3-bedroom apartment into a modern luxury living space.",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    ],
    location: "New York, NY",
    year: 2024,
    featured: true,
  },
  {
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
  {
    id: "3",
    title: "Boutique Retail Store",
    description: "An inviting retail space that enhances the shopping experience.",
    category: "retail",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    ],
    location: "Los Angeles, CA",
    year: 2023,
    featured: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Use request.nextUrl instead of new URL(request.url) to avoid static analysis issues
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category") as ProjectCategory | null;
    const featured = searchParams.get("featured") === "true";

    try {
      const supabase = createSupabaseClient();
      
      let query = supabase.from("projects").select("*");

      // Filter by category
      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      // Filter featured projects
      if (featured) {
        query = query.eq("featured", true);
      }

      // Order by created_at descending
      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error("Database error:", error);
        // Fallback to mock data if database query fails
        let projects = mockProjects;
        if (category && category !== "all") {
          projects = projects.filter((p) => p.category === category);
        }
        if (featured) {
          projects = projects.filter((p) => p.featured);
        }
        return NextResponse.json({ projects }, { status: 200 });
      }

      // Transform Supabase data to match Project type
      const projects: Project[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description || "",
        category: item.category as ProjectCategory,
        images: item.images || [],
        location: item.location || "",
        year: item.year || new Date().getFullYear(),
        featured: item.featured || false,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      return NextResponse.json({ projects }, { status: 200 });
    } catch (supabaseError) {
      // If Supabase is not configured, use mock data
      if (supabaseError instanceof Error && supabaseError.message.includes("Missing Supabase")) {
        console.warn("Supabase not configured. Using mock data.");
        let projects = mockProjects;
        if (category && category !== "all") {
          projects = projects.filter((p) => p.category === category);
        }
        if (featured) {
          projects = projects.filter((p) => p.featured);
        }
        return NextResponse.json({ projects }, { status: 200 });
      }
      throw supabaseError;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

