"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- SETTINGS ACTIONS ---
export async function updateSettings(formData: Record<string, string>) {
    const supabase = createServerSupabaseClient();

    // Remove empty values or handle them? For settings, empty string is valid.
    // We map the object to the { key, value } format expected by the table
    const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
        // updated_at: new Date().toISOString() // Removing this for now to match current schema
    }));

    const { error } = await supabase
        .from("settings")
        .upsert(updates, { onConflict: 'key' });

    if (error) {
        console.error("Error updating settings:", error);
        throw new Error("Failed to update settings");
    }

    revalidatePath("/", "layout"); // Revalidate everything
    return { success: true };
}

// --- SERVICES ACTIONS ---
export async function createService(data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("services").insert([data]);
    if (error) throw error;
    revalidatePath("/admin/services");
    revalidatePath("/", "layout");
}

export async function updateService(id: string, data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("services").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/services");
    revalidatePath("/", "layout");
}

export async function deleteService(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/services");
    revalidatePath("/", "layout");
}

// --- STATS ACTIONS ---
export async function createStat(data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("stats").insert([data]);
    if (error) throw error;
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
}

export async function updateStat(id: string, data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("stats").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
}

export async function deleteStat(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
}

// --- PROJECT ACTIONS ---
export async function createProject(data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("projects").insert([data]);
    if (error) throw error;
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath("/", "layout");
}

export async function updateProject(id: string, data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("projects").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath("/", "layout");
}

export async function deleteProject(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath("/", "layout");
}

// --- LOCATIONS ACTIONS ---
export async function createLocation(data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("locations").insert([data]);
    if (error) throw error;
    revalidatePath("/admin/locations");
    revalidatePath("/", "layout");
}

export async function updateLocation(id: string, data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("locations").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/locations");
    revalidatePath("/", "layout");
}

export async function deleteLocation(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("locations").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/locations");
    revalidatePath("/", "layout");
}

// --- WHY CHOOSE US ACTIONS ---
export async function createWhyChooseUs(data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("why_choose_us").insert([data]);
    if (error) throw error;
    revalidatePath("/admin/why-choose-us");
    revalidatePath("/", "layout");
}

export async function updateWhyChooseUs(id: string, data: any) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("why_choose_us").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/why-choose-us");
    revalidatePath("/", "layout");
}

export async function deleteWhyChooseUs(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("why_choose_us").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/why-choose-us");
    revalidatePath("/", "layout");
}
