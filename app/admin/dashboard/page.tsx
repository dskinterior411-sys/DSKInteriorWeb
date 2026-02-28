import Link from "next/link";
import { FolderKanban, MessageSquare, Palette, Settings, ArrowRight, MapPin, Star, Briefcase } from "lucide-react";

export default function AdminDashboard() {
    const modules = [
        {
            title: "Projects",
            description: "Manage your portfolio projects, images, and details.",
            icon: FolderKanban,
            href: "/admin/projects",
            color: "bg-blue-500",
        },
        {
            title: "Testimonials",
            description: "Add or edit client reviews and ratings.",
            icon: MessageSquare,
            href: "/admin/testimonials",
            color: "bg-green-500",
        },
        {
            title: "Services",
            description: "Update your service offerings and icons.",
            icon: Palette,
            href: "/admin/services",
            color: "bg-purple-500",
        },
        {
            title: "Locations",
            description: "Manage service areas and locations.",
            icon: MapPin,
            href: "/admin/locations",
            color: "bg-teal-500",
        },
        {
            title: "Why Choose Us",
            description: "Manage features in the About section.",
            icon: Star,
            href: "/admin/why-choose-us",
            color: "bg-yellow-500",
        },
        {
            title: "Job Applications",
            description: "View and manage job applications.",
            icon: Briefcase,
            href: "/admin/careers",
            color: "bg-indigo-500",
        },
        {
            title: "Stats & Settings",
            description: "Update company statistics.",
            icon: Settings,
            href: "/admin/settings",
            color: "bg-orange-500",
        },
        {
            title: "General Settings",
            description: "Edit contact info, social links, and home page content.",
            icon: Settings, // using Settings icon for General too, distinguishing by name
            href: "/admin/general",
            color: "bg-slate-500",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-medium text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500 font-sans mt-2">Welcome back to DSK Interiors Admin Panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map((module) => {
                    const Icon = module.icon;
                    return (
                        <Link
                            key={module.title}
                            href={module.href}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 ${module.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`h-6 w-6 ${module.color.replace('bg-', 'text-')}`} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">{module.title}</h3>
                            <p className="text-sm text-neutral-500 font-light mb-4">{module.description}</p>
                            <div className="flex items-center text-primary-500 text-sm font-medium">
                                <span>Manage</span>
                                <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
