"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { createWhyChooseUs, updateWhyChooseUs } from "@/app/admin/actions";

interface WhyChooseUsFormProps {
    initialData?: any;
}

const whyChooseUsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    icon: z.string().min(1, "Icon name is required"),
    order: z.coerce.number().default(0),
});

type WhyChooseUsFormValues = z.infer<typeof whyChooseUsSchema>;

export default function WhyChooseUsForm({ initialData }: WhyChooseUsFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<WhyChooseUsFormValues>({
        resolver: zodResolver(whyChooseUsSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            icon: "",
            order: 0,
        },
    });

    const iconName = form.watch("icon");
    const IconComponent = (iconName && (LucideIcons as any)[iconName]) ? (LucideIcons as any)[iconName] : null;

    const onSubmit = async (data: WhyChooseUsFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                await updateWhyChooseUs(initialData.id, data);
            } else {
                await createWhyChooseUs(data);
            }
            router.push("/admin/why-choose-us");
            router.refresh();
        } catch (error) {
            console.error("Error saving why choose us item:", error);
            alert("Failed to save item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/why-choose-us"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Why Choose Us
                </Link>
                <h1 className="text-3xl font-display font-medium text-neutral-900">
                    {initialData ? "Edit Item" : "Add New Item"}
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Title</label>
                        <input
                            {...form.register("title")}
                            className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            placeholder="Ex: Personalized Design"
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
                            placeholder="Brief description..."
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
                                    placeholder="Ex: CheckCircle2, Award, Star"
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

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center"
                        >
                            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {initialData ? "Update Item" : "Create Item"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}


