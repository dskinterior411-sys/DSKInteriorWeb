"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import WhyChooseUsForm from "@/components/admin/WhyChooseUsForm";
import { Loader2 } from "lucide-react";

export default function EditWhyChooseUsPage() {
    const params = useParams();
    const id = params.id as string;
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createSupabaseClient();

    useEffect(() => {
        async function fetchItem() {
            try {
                const { data, error } = await supabase
                    .from("why_choose_us")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setItem(data);
            } catch (err) {
                console.error("Error fetching item:", err);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchItem();
    }, [id, supabase]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-bold text-red-900 mb-2">Item Not Found</h2>
                <p className="text-red-700">The item you're looking for doesn't exist.</p>
            </div>
        );
    }

    return <WhyChooseUsForm initialData={item} />;
}


