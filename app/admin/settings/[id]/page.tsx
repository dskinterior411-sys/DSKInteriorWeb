import StatForm from "@/components/admin/StatForm";
import { createServerSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: { id: string };
}

export default async function EditStatPage({ params }: PageProps) {
    const supabase = createServerSupabaseClient();
    const { data: stat } = await supabase
        .from("stats")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!stat) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/settings"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Settings
                </Link>
            </div>
            <StatForm initialData={stat} />
        </div>
    );
}
