"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createSupabaseClient } from "@/lib/supabase";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import Link from "next/link";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(1, "Location is required"),
    year: z.coerce.number().min(2000, "Year must be valid"),
    featured: z.boolean().default(false),
    images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createSupabaseClient();

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: "",
            category: "",
            description: "",
            location: "",
            year: new Date().getFullYear(),
            featured: false,
            images: [],
        },
    });

    const onSubmit = async (data: ProjectFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                // Update
                const { error } = await supabase
                    .from("projects")
                    .update(data)
                    .eq("id", initialData.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("projects")
                    .insert([data]);

                if (error) throw error;
            }

            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/projects"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-display font-medium text-neutral-900">
                    {initialData ? "Edit Project" : "Create New Project"}
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Title</label>
                            <input
                                {...form.register("title")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Ex: Modern Luxury Apartment"
                            />
                            {form.formState.errors.title && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Category</label>
                            <select
                                {...form.register("category")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                            >
                                <option value="">Select Category</option>
                                <option value="modular-kitchen">Modular Kitchen</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                                <option value="retail">Retail</option>
                                <option value="corporate">Corporate</option>
                                <option value="hospitality">Hospitality</option>
                            </select>
                            {form.formState.errors.category && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.category.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Location</label>
                            <input
                                {...form.register("location")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Ex: Nashik, India"
                            />
                            {form.formState.errors.location && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.location.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Year</label>
                            <input
                                type="number"
                                {...form.register("year")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="2024"
                            />
                            {form.formState.errors.year && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.year.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Description</label>
                        <textarea
                            {...form.register("description")}
                            rows={5}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Detailed description of the project..."
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-2 block">Images</label>
                        <ImageUpload
                            value={form.watch("images")}
                            onChange={(urls) => form.setValue("images", urls)}
                        />
                        {form.formState.errors.images && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.images.message}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="featured"
                            {...form.register("featured")}
                            className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-neutral-700">Mark as Featured Project</label>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {initialData ? "Update Project" : "Create Project"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
