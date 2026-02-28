import { createServerSupabaseClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteStat } from "@/app/admin/actions";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const supabase = createServerSupabaseClient();
    const { data: stats, error } = await supabase
        .from("stats")
        .select("*")
        .order("order", { ascending: true });

    if (error) {
        console.error("Error fetching stats:", error);
        return <div>Error loading stats: {error.message}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-display font-medium text-neutral-900 mb-2">Stats & Settings</h1>
            <p className="text-neutral-500 mb-8">Manage company statistics displayed on the About section.</p>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Company Statistics</h2>
                <Link
                    href="/admin/settings/new"
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors flex items-center text-xs"
                >
                    <Plus className="h-3 w-3 mr-2" />
                    Add Stat
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 border-b border-neutral-100">
                        <tr>
                            <th className="p-4 text-xs font-bold uppercase tracking-wide text-neutral-500">Label</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wide text-neutral-500">Value</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wide text-neutral-500">Order</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wide text-neutral-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {stats?.map((stat) => (
                            <tr key={stat.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="p-4 font-medium text-neutral-900">{stat.label}</td>
                                <td className="p-4 text-neutral-600">{stat.value}</td>
                                <td className="p-4 text-neutral-400 font-mono text-xs">{stat.order}</td>
                                <td className="p-4 flex items-center justify-end space-x-2">
                                    <Link
                                        href={`/admin/settings/${stat.id}`}
                                        className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                    <form action={deleteStat.bind(null, stat.id)}>
                                        <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {stats?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-neutral-400">
                                    No stats found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
