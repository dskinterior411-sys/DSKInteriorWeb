"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    category: string;
    year: number;
    location: string;
    featured: boolean;
    images: string[];
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const supabase = createSupabaseClient();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) {
                alert("Error deleting project");
                console.error(error);
            } else {
                fetchProjects(); // Refresh list
            }
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-neutral-900">Projects</h1>
                    <p className="text-neutral-500 font-sans mt-1">Manage your portfolio items</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center justify-center space-x-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary-500 transition-colors shadow-lg shadow-neutral-900/20"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Project</span>
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 flex items-center space-x-4">
                <Search className="h-5 w-5 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="flex-1 outline-none text-neutral-700 font-sans"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-neutral-500">Loading projects...</div>
                ) : filteredProjects.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderKanban className="h-8 w-8 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900">No projects found</h3>
                        <p className="text-neutral-500 mt-1 mb-6">Get started by creating your first project.</p>
                        <Link
                            href="/admin/projects/new"
                            className="inline-flex items-center justify-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Project</span>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 border-b border-neutral-100 text-xs uppercase tracking-wider text-neutral-500 font-medium">
                                    <th className="p-4 pl-6">Image</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Location/Year</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 pr-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filteredProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-200">
                                                {project.images && project.images.length > 0 && (
                                                    <Image
                                                        src={project.images[0]}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-neutral-900">{project.title}</td>
                                        <td className="p-4 text-neutral-600">
                                            <span className="bg-neutral-100 px-2 py-1 rounded text-xs">{project.category}</span>
                                        </td>
                                        <td className="p-4 text-neutral-500 text-sm">
                                            {project.location}, {project.year}
                                        </td>
                                        <td className="p-4">
                                            {project.featured ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-neutral-400 text-xs">Standard</span>
                                            )}
                                        </td>
                                        <td className="p-4 pr-6 text-right space-x-2">
                                            <Link
                                                href={`/portfolio/${project.id}`}
                                                target="_blank"
                                                className="inline-block p-2 text-neutral-400 hover:text-primary-500 transition-colors"
                                                title="View Live"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className="inline-block p-2 text-neutral-400 hover:text-blue-500 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function FolderKanban(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
            <path d="M2 10h20" />
        </svg>
    )
}
