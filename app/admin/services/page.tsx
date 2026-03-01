"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { deleteService } from "@/app/admin/actions";

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = useMemo(() => createSupabaseClient(), []);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Debug: Log the actual URL being used
            const actualUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            console.log("🔍 Debug Info:", {
                supabaseUrl: actualUrl,
                hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                environment: actualUrl?.includes('dksbskydjrmkyvoaeelc') ? 'Development' :
                    actualUrl?.includes('bupbpxipmpqbwxknsazq') ? 'Production' : 'Unknown'
            });

            if (!actualUrl) {
                setError(`❌ Supabase URL not configured\n\nPlease:\n1. Add NEXT_PUBLIC_SUPABASE_URL to .env.local\n2. Restart dev server (npm run dev)\n3. Hard refresh browser (Cmd+Shift+R)`);
                setLoading(false);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from("services")
                .select("*")
                .order("order", { ascending: true });

            if (fetchError) {
                console.error("❌ Supabase error:", fetchError);
                setError(`Error: ${fetchError.message}\n\nCode: ${fetchError.code || 'N/A'}\n\nCheck browser console (F12) for details.`);
            } else {
                console.log("✅ Successfully fetched services:", data?.length || 0);
                setServices(data || []);
            }
        } catch (err: any) {
            console.error("❌ Unexpected error:", err);
            setError(`Unexpected error: ${err?.message || "Failed to load services"}\n\nCheck browser console (F12) for details.`);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                window.location.reload();
            } catch (err) {
                console.error("Error deleting service:", err);
                alert("Failed to delete service. Please try again.");
            }
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
                <h2 className="text-lg font-bold text-red-900 mb-2">Error Loading Services</h2>
                <p className="text-red-700 mb-4 whitespace-pre-line">{error}</p>
                <div className="mt-4 space-y-2">
                    <button
                        onClick={fetchServices}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mr-2"
                    >
                        Retry
                    </button>
                    <div className="text-sm text-red-600 mt-4 pt-4 border-t border-red-200">
                        <p className="font-semibold mb-2">Troubleshooting steps:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Check your browser console (F12) for detailed error messages</li>
                            <li>Verify the &apos;services&apos; table exists in your Supabase database</li>
                            <li>Run the SQL schema file (supabase_schema.sql) in your Supabase SQL Editor</li>
                            <li>Check that RLS policies allow public read access on the services table</li>
                            <li>Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-medium text-neutral-900">Services</h1>
                    <p className="text-neutral-500 mt-1">Manage your service offerings.</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors flex items-center text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services?.map((service) => {
                    // @ts-ignore
                    const IconComponent = LucideIcons[service.icon] ? LucideIcons[service.icon] : LucideIcons.HelpCircle;

                    return (
                        <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col h-full group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-primary-500">
                                    <IconComponent className="h-6 w-6" />
                                </div>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/services/${service.id}`}
                                        className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-display font-medium text-neutral-900 mb-2">{service.title}</h3>
                            <p className="text-neutral-500 text-sm mb-4 line-clamp-3 flex-1">{service.description}</p>

                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                                <span>Order: {service.order}</span>
                                {service.link && <span className="flex items-center font-mono">{service.link}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
            {services?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-neutral-400">No services found. Add one to get started.</p>
                </div>
            )}
        </div>
    );
}
