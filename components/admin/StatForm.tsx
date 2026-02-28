"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createStat, updateStat } from "@/app/admin/actions";

interface StatFormProps {
    initialData?: any;
    onSuccess?: () => void;
}

const statSchema = z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
    order: z.coerce.number().default(0),
});

type StatFormValues = z.infer<typeof statSchema>;

export default function StatForm({ initialData }: StatFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<StatFormValues>({
        resolver: zodResolver(statSchema),
        defaultValues: initialData || {
            label: "",
            value: "",
            order: 0,
        },
    });

    const onSubmit = async (data: StatFormValues) => {
        setLoading(true);
        try {
            if (initialData) {
                await updateStat(initialData.id, data);
            } else {
                await createStat(data);
            }
            router.push("/admin/settings");
            router.refresh();
        } catch (error) {
            console.error("Error saving stat:", error);
            alert("Failed to save stat");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
            <h2 className="text-xl font-display font-medium text-neutral-900 mb-6">
                {initialData ? "Edit Statistic" : "Add New Statistic"}
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Label</label>
                    <input
                        {...form.register("label")}
                        className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="Ex: Years Experience"
                    />
                    {form.formState.errors.label && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.label.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Value</label>
                    <input
                        {...form.register("value")}
                        className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="Ex: 6+"
                    />
                    {form.formState.errors.value && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.value.message}</p>
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

                <div className="pt-4 border-t border-neutral-100 flex justify-end items-center space-x-4">
                    <Link href="/admin/settings" className="text-sm text-neutral-500 hover:text-neutral-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-neutral-900 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center text-sm"
                    >
                        {loading && <Loader2 className="h-3 w-3 mr-2 animate-spin" />}
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}
