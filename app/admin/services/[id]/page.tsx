import ServiceForm from "@/components/admin/ServiceForm";
import { createServerSupabaseClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
    params: { id: string };
}

export default async function EditServicePage({ params }: PageProps) {
    const supabase = createServerSupabaseClient();
    const { data: service } = await supabase
        .from("services")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!service) {
        notFound();
    }

    return <ServiceForm initialData={service} />;
}
