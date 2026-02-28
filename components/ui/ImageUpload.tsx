"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createSupabaseClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                newUrls.push(data.url);
            }

            onChange([...value, ...newUrls]);
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images");
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove));
    };

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 group">
                        <div className="absolute top-1 right-1 z-10">
                            <button
                                type="button"
                                onClick={() => handleRemove(url)}
                                className="bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={disabled}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                        <Image
                            src={url}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            <div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleUpload}
                    ref={fileInputRef}
                    disabled={disabled || isUploading}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isUploading}
                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary-500 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="flex flex-col items-center">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-2" />
                        ) : (
                            <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                        )}
                        <span className="text-sm font-medium text-neutral-600">
                            {isUploading ? "Uploading..." : "Click to upload images"}
                        </span>
                        <span className="text-xs text-neutral-400 mt-1">
                            JPG, PNG, WEBP up to 5MB
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}
