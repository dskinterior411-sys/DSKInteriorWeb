"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { createSupabaseClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function EditProjectPage({ params }: { params: { id: string } }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const supabase = createSupabaseClient();

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) {
                console.error("Error fetching project:", error);
            } else {
                setProject(data);
            }
            setLoading(false);
        }
        fetchProject();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="py-6">
            <ProjectForm initialData={project} />
        </div>
    );
}
