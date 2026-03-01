"use client";

import { useEffect, useState, useMemo } from "react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { createSupabaseClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
    const [testimonial, setTestimonial] = useState(null);
    const [loading, setLoading] = useState(true);
    const supabase = useMemo(() => createSupabaseClient(), []);

    useEffect(() => {
        async function fetchTestimonial() {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) {
                console.error("Error fetching testimonial:", error);
            } else {
                setTestimonial(data);
            }
            setLoading(false);
        }
        fetchTestimonial();
    }, [params.id, supabase]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!testimonial) {
        return <div>Testimonial not found</div>;
    }

    return (
        <div className="py-6">
            <TestimonialForm initialData={testimonial} />
        </div>
    );
}
