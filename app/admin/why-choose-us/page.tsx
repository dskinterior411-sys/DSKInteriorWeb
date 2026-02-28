"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { deleteWhyChooseUs } from "@/app/admin/actions";

export default function WhyChooseUsPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createSupabaseClient();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from("why_choose_us")
                .select("*")
                .order("order", { ascending: true });

            if (fetchError) {
                console.error("Error fetching why choose us items:", fetchError);
                setError(`Error: ${fetchError.message}`);
            } else {
                setItems(data || []);
            }
        } catch (err: any) {
            console.error("Unexpected error:", err);
            setError(`Unexpected error: ${err?.message || "Failed to load items"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteWhyChooseUs(id);
                fetchItems(); // Refresh the list
            } catch (err) {
                console.error("Error deleting item:", err);
                alert("Failed to delete item. Please try again.");
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
                <h2 className="text-lg font-bold text-red-900 mb-2">Error Loading Items</h2>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={fetchItems}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-medium text-neutral-900">Why Choose Us</h1>
                    <p className="text-neutral-500 mt-1">Manage features displayed in the About section.</p>
                </div>
                <Link
                    href="/admin/why-choose-us/new"
                    className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors flex items-center text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map((item) => {
                    // @ts-ignore
                    const IconComponent = LucideIcons[item.icon] ? LucideIcons[item.icon] : LucideIcons.CheckCircle2;

                    return (
                        <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col h-full group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-primary-500">
                                    <IconComponent className="h-6 w-6" />
                                </div>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/why-choose-us/${item.id}`}
                                        className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-display font-medium text-neutral-900 mb-2">{item.title}</h3>
                            <p className="text-neutral-500 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>

                            <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-400">
                                Order: {item.order}
                            </div>
                        </div>
                    );
                })}
            </div>
            {items?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-neutral-400">No items found. Add one to get started.</p>
                </div>
            )}
        </div>
    );
}


