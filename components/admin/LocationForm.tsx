"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ui/ImageUpload";
import { createLocation, updateLocation } from "@/app/admin/actions";

interface LocationFormProps {
    initialData?: any;
}

const locationSchema = z.object({
    city: z.string().min(1, "City is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().min(1, "Image is required"),
    order: z.coerce.number().default(0),
});

type LocationFormValues = z.infer<typeof locationSchema>;

export default function LocationForm({ initialData }: LocationFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<LocationFormValues>({
        resolver: zodResolver(locationSchema),
        defaultValues: initialData || {
            city: "",
            description: "",
            image: "",
            order: 0,
        },
    });

    const onSubmit = async (data: LocationFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                await updateLocation(initialData.id, data);
            } else {
                await createLocation(data);
            }
            router.push("/admin/locations");
            router.refresh();
        } catch (error) {
            console.error("Error saving location:", error);
            alert("Failed to save location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/locations"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Locations
                </Link>
                <h1 className="text-3xl font-display font-medium text-neutral-900">
                    {initialData ? "Edit Location" : "Add New Location"}
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">City Name</label>
                        <input
                            {...form.register("city")}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Ex: Nashik"
                        />
                        {form.formState.errors.city && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Description</label>
                        <textarea
                            {...form.register("description")}
                            rows={4}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Brief description of the location..."
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-2 block">Image</label>
                        <ImageUpload
                            value={form.watch("image") ? [form.watch("image")] : []}
                            onChange={(urls) => form.setValue("image", urls[0] || "")}
                        />
                        {form.formState.errors.image && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.image.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Display Order</label>
                        <input
                            type="number"
                            {...form.register("order")}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="0"
                        />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {initialData ? "Update Location" : "Create Location"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

