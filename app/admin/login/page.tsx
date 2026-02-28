"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 text-center bg-neutral-50 border-b border-neutral-100">
                    <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="font-display font-bold text-2xl text-primary-500">D</span>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
                        Admin Access
                    </h1>
                    <p className="text-neutral-500 text-sm mt-2 font-sans">Enter credentials to manage DSK Interiors</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 block uppercase tracking-wide">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-neutral-300 font-sans"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-900 text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? "Authenticating..." : "Enter Dashboard"}
                    </button>
                </form>

                <div className="bg-neutral-50 px-8 py-4 text-center border-t border-neutral-100">
                    <p className="text-xs text-neutral-400">Restricted Area • DSK Interiors</p>
                </div>
            </div>
        </div>
    );
}
