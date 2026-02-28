import StatForm from "@/components/admin/StatForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewStatPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/settings"
                    className="flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Settings
                </Link>
            </div>
            <StatForm />
        </div>
    );
}
