"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteLocation } from "@/app/admin/actions";
import { getLocations, Location } from "@/lib/api";

export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLocations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getLocations();
            setLocations(data || []);
        } catch (err: any) {
            console.error("Unexpected error:", err);
            setError(`Unexpected error: ${err?.message || "Failed to load locations"}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this location?")) {
            try {
                await deleteLocation(id);
                window.location.reload();
            } catch (err) {
                console.error("Error deleting location:", err);
                alert("Failed to delete location. Please try again.");
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
                <h2 className="text-lg font-bold text-red-900 mb-2">Error Loading Locations</h2>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                    onClick={fetchLocations}
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
                    <h1 className="text-3xl font-display font-medium text-neutral-900">Locations</h1>
                    <p className="text-neutral-500 mt-1">Manage service areas and locations.</p>
                </div>
                <Link
                    href="/admin/locations/new"
                    className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors flex items-center text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations?.map((location) => (
                    <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                            {location.image ? (
                                <Image
                                    src={location.image}
                                    alt={location.city}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                                    <MapPin className="h-12 w-12 text-neutral-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/admin/locations/${location.id}`}
                                        className="p-2 bg-white/90 text-primary-500 rounded-lg hover:bg-white transition-colors"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(location.id)}
                                        className="p-2 bg-white/90 text-red-500 rounded-lg hover:bg-white transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-display font-medium text-neutral-900 mb-2">{location.city}</h3>
                            <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{location.description}</p>
                            <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-400">
                                Order: {location.order}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {locations?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-neutral-400">No locations found. Add one to get started.</p>
                </div>
            )}
        </div>
    );
}


