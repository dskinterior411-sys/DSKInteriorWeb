"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateSettings } from "@/app/admin/actions";
import { Loader2, Save, Globe, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Image as ImageIcon, Palette } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface GeneralSettingsFormProps {
    initialSettings: Record<string, string>;
}

export default function GeneralSettingsForm({ initialSettings }: GeneralSettingsFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: initialSettings
    });

    const onSubmit = async (data: Record<string, string>) => {
        setLoading(true);
        try {
            await updateSettings(data);
            router.refresh();
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8 pb-20">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-medium text-neutral-900">General Settings</h1>
                    <p className="text-neutral-500 mt-1">Manage global website content and configurations.</p>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 flex items-center shadow-lg hover:shadow-xl"
                >
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                            <Phone className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-neutral-900">Contact Information</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Phone Number</label>
                            <input {...register("contact_phone")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Email Address</label>
                            <input {...register("contact_email")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Office Address</label>
                            <textarea {...register("contact_address")} rows={3} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                        <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
                            <Globe className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-neutral-900">Social Media Links</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</label>
                            <input {...register("social_instagram")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 flex items-center gap-2"><Facebook className="h-4 w-4" /> Facebook</label>
                            <input {...register("social_facebook")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</label>
                            <input {...register("social_linkedin")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700 flex items-center gap-2"><Youtube className="h-4 w-4" /> YouTube</label>
                            <input {...register("social_youtube")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-neutral-900">Hero Section (Home Page)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Main Title</label>
                                <input {...register("hero_title")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Subtitle</label>
                                <input {...register("hero_subtitle")} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Hero Background Image</label>
                            <ImageUpload
                                value={watch("hero_image") ? [watch("hero_image")] : []}
                                onChange={(urls) => setValue("hero_image", urls[0])}
                            />
                            <p className="text-xs text-neutral-400">Recommended: 1920x1080px (Landscape)</p>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                        <div className="w-10 h-10 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
                            <Globe className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-neutral-900">About Section</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Company Story</label>
                                <textarea {...register("about_story")} rows={6} className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">About Image</label>
                            <ImageUpload
                                value={watch("about_image") ? [watch("about_image")] : []}
                                onChange={(urls) => setValue("about_image", urls[0])}
                            />
                            <p className="text-xs text-neutral-400">Recommended: 1000x1200px (Portrait)</p>
                        </div>
                    </div>
                </div>

                {/* Theme Colors */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                        <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-lg flex items-center justify-center">
                            <Palette className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-neutral-900">Theme Colors</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Primary Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    {...register("theme_primary")}
                                    defaultValue={initialSettings.theme_primary || "#b28e5d"}
                                    className="w-16 h-16 rounded-lg border border-neutral-200 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    {...register("theme_primary")}
                                    defaultValue={initialSettings.theme_primary || "#b28e5d"}
                                    className="flex-1 p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
                                    placeholder="#b28e5d"
                                />
                            </div>
                            <p className="text-xs text-neutral-400">Main brand color (gold/brown)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Accent Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    {...register("theme_accent")}
                                    defaultValue={initialSettings.theme_accent || "#FDCDCA"}
                                    className="w-16 h-16 rounded-lg border border-neutral-200 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    {...register("theme_accent")}
                                    defaultValue={initialSettings.theme_accent || "#FDCDCA"}
                                    className="flex-1 p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
                                    placeholder="#FDCDCA"
                                />
                            </div>
                            <p className="text-xs text-neutral-400">Background color (pink)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">Dark Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    {...register("theme_dark")}
                                    defaultValue={initialSettings.theme_dark || "#0D0000"}
                                    className="w-16 h-16 rounded-lg border border-neutral-200 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    {...register("theme_dark")}
                                    defaultValue={initialSettings.theme_dark || "#0D0000"}
                                    className="flex-1 p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm"
                                    placeholder="#0D0000"
                                />
                            </div>
                            <p className="text-xs text-neutral-400">Text/UI dark color</p>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                        <p className="text-sm text-neutral-600">
                            <strong>Note:</strong> After saving, refresh the page to see color changes. Colors will update across the entire website.
                        </p>
                    </div>
                </div>

            </div>
        </form>
    );
}
