"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createSupabaseClient } from "@/lib/supabase";
import { Loader2, Save, ArrowLeft, Star } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import Link from "next/link";

const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    company: z.string().optional(),
    content: z.string().min(10, "Content must be at least 10 characters"),
    rating: z.coerce.number().min(1).max(5),
    image: z.string().min(1, "Image is required"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
    initialData?: any;
}

export default function TestimonialForm({ initialData }: TestimonialFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createSupabaseClient();

    const form = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: initialData ? {
            ...initialData,
            image: initialData.image // Ensure single string is what we expect, though upload gives array
        } : {
            name: "",
            role: "",
            company: "",
            content: "",
            rating: 5,
            image: "",
        },
    });

    const onSubmit = async (data: TestimonialFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                // Update
                const { error } = await supabase
                    .from("testimonials")
                    .update(data)
                    .eq("id", initialData.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("testimonials")
                    .insert([data]);

                if (error) throw error;
            }

            router.push("/admin/testimonials");
            router.refresh();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to handle the array-based ImageUpload with our single-string form field
    const handleImageChange = (urls: string[]) => {
        if (urls.length > 0) {
            form.setValue("image", urls[0]);
        } else {
            form.setValue("image", "");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/testimonials"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Testimonials
                </Link>
                <h1 className="text-3xl font-display font-medium text-neutral-900">
                    {initialData ? "Edit Testimonial" : "New Testimonial"}
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Client Name</label>
                            <input
                                {...form.register("name")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Ex: Sarah Johnson"
                            />
                            {form.formState.errors.name && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Rating (1-5)</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    {...form.register("rating")}
                                    className="w-20 p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                                <div className="flex text-amber-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= (form.watch("rating") || 0) ? "fill-current" : "text-neutral-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {form.formState.errors.rating && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.rating.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Role / Title</label>
                            <input
                                {...form.register("role")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Ex: Homeowner, CEO"
                            />
                            {form.formState.errors.role && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.role.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Company (Optional)</label>
                            <input
                                {...form.register("company")}
                                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Ex: Tech Corp"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Testimonial Content</label>
                        <textarea
                            {...form.register("content")}
                            rows={4}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="What did the client say?"
                        />
                        {form.formState.errors.content && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.content.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-2 block">Client Photo</label>
                        <ImageUpload
                            value={form.watch("image") ? [form.watch("image")] : []}
                            onChange={handleImageChange}
                        />
                        {form.formState.errors.image && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.image.message}</p>
                        )}
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {initialData ? "Update Testimonial" : "Create Testimonial"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
