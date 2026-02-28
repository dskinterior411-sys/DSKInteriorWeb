"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Download, Mail, Phone, Calendar, Loader2, Briefcase } from "lucide-react";

export default function CareersPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createSupabaseClient();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from("job_applications")
                .select("*")
                .order("created_at", { ascending: false });

            if (fetchError) {
                console.error("Error fetching applications:", fetchError);
                setError(`Error: ${fetchError.message}`);
            } else {
                setApplications(data || []);
            }
        } catch (err: any) {
            console.error("Unexpected error:", err);
            setError(`Unexpected error: ${err?.message || "Failed to load applications"}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-bold text-red-900 mb-2">Error Loading Applications</h2>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={fetchApplications}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-display font-medium text-neutral-900">Job Applications</h1>
                <p className="text-neutral-500 mt-1">View and manage job applications.</p>
            </div>

            <div className="space-y-4">
                {applications?.map((application) => (
                    <div key={application.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                                        <Briefcase className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-display font-medium text-neutral-900 mb-1">{application.name}</h3>
                                        <p className="text-primary-600 font-medium mb-2">{application.position}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                                            <a href={`mailto:${application.email}`} className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                                                <Mail className="h-4 w-4" />
                                                {application.email}
                                            </a>
                                            <a href={`tel:${application.phone}`} className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                                                <Phone className="h-4 w-4" />
                                                {application.phone}
                                            </a>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(application.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {application.resume_url && (
                                <a
                                    href={application.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                                >
                                    <Download className="h-4 w-4" />
                                    <span className="text-sm font-medium">View Resume</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {applications?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-neutral-400">No applications yet.</p>
                </div>
            )}
        </div>
    );
}


