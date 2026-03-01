"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, MessageSquare, Star, Quote } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import Image from "next/image";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = useMemo(() => createSupabaseClient(), []);

    const fetchTestimonials = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from("testimonials")
                .select("*")
                .order("created_at", { ascending: false });

            if (fetchError) {
                console.error("Error fetching testimonials:", fetchError);
                setError(`Error: ${fetchError.message}`);
            } else {
                setTestimonials(data || []);
            }
        } catch (err: any) {
            console.error("Unexpected error:", err);
            setError(`Unexpected error: ${err?.message || "Failed to load testimonials"}`);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            const { error } = await supabase.from("testimonials").delete().eq("id", id);
            if (error) {
                alert("Error deleting testimonial");
                console.error(error);
            } else {
                fetchTestimonials(); // Refresh list
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-neutral-900">Testimonials</h1>
                    <p className="text-neutral-500 font-sans mt-1">Manage client reviews</p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="inline-flex items-center justify-center space-x-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary-500 transition-colors shadow-lg shadow-neutral-900/20"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Testimonial</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-8 text-center text-neutral-500">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                    <div className="col-span-full p-12 text-center bg-white rounded-xl border border-neutral-100">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="h-8 w-8 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900">No testimonials yet</h3>
                        <p className="text-neutral-500 mt-1 mb-6">Add your first client review.</p>
                    </div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col h-full bg-white relative group">
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/admin/testimonials/${testimonial.id}`}
                                    className="p-2 bg-neutral-100 rounded-full hover:bg-blue-100 text-neutral-500 hover:text-blue-600 transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(testimonial.id)}
                                    className="p-2 bg-neutral-100 rounded-full hover:bg-red-100 text-neutral-500 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900">{testimonial.name}</h3>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wide">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex mb-4 text-amber-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>

                            <div className="flex-1">
                                <Quote className="h-6 w-6 text-primary-200 mb-2" />
                                <p className="text-neutral-600 text-sm italic line-clamp-4">
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
