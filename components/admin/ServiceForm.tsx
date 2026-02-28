"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { createService, updateService } from "@/app/admin/actions";

interface ServiceFormProps {
    initialData?: any;
}

const serviceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    icon: z.string().min(1, "Icon name is required"),
    link: z.string().optional(),
    order: z.coerce.number().default(0),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function ServiceForm({ initialData }: ServiceFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            icon: "",
            link: "",
            order: 0,
        },
    });

    const iconName = form.watch("icon");
    const IconComponent = (iconName && (LucideIcons as any)[iconName]) ? (LucideIcons as any)[iconName] : null;

    const onSubmit = async (data: ServiceFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                await updateService(initialData.id, data);
            } else {
                await createService(data);
            }
            router.push("/admin/services");
            router.refresh();
        } catch (error) {
            console.error("Error saving service:", error);
            alert("Failed to save service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/services"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Services
                </Link>
                <h1 className="text-3xl font-display font-medium text-neutral-900">
                    {initialData ? "Edit Service" : "Add New Service"}
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Service Title</label>
                        <input
                            {...form.register("title")}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Ex: Interior Design"
                        />
                        {form.formState.errors.title && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Description</label>
                        <textarea
                            {...form.register("description")}
                            rows={4}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Brief description of the service..."
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 flex items-center justify-between">
                                Icon Name
                                <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-primary-500 hover:underline text-xs flex items-center normal-case font-normal">
                                    Browse Icons <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    {...form.register("icon")}
                                    className="flex-1 p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="Ex: Armchair, Home, PenTool"
                                />
                                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-lg border border-neutral-200 text-neutral-600">
                                    {IconComponent ? <IconComponent className="h-6 w-6" /> : <span className="text-xs text-neutral-400">?</span>}
                                </div>
                            </div>
                            {form.formState.errors.icon && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.icon.message}</p>
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
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Link (Optional)</label>
                        <input
                            {...form.register("link")}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Ex: /contact?service=design"
                        />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {initialData ? "Update Service" : "Create Service"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
