"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLocationById, Location } from "@/lib/api";
import LocationForm from "@/components/admin/LocationForm";
import { Loader2 } from "lucide-react";

export default function EditLocationPage() {
    const params = useParams();
    const id = params.id as string;
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLocation() {
            if (!id) return;
            try {
                const data = await getLocationById(id);
                setLocation(data);
            } catch (err) {
                console.error("Error fetching location:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchLocation();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!location) {
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-bold text-red-900 mb-2">Location Not Found</h2>
                <p className="text-red-700">The location you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return <LocationForm initialData={location} />;
}


