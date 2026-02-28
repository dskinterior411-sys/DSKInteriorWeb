import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `project-uploads/${fileName}`;

        // Convert File to Buffer for upload (Node.js environment)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 1. Check if bucket exists, if not create it
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketName = 'project-images';
        const bucketExists = buckets?.find(b => b.name === bucketName);

        if (!bucketExists) {
            console.log(`Bucket ${bucketName} not found. Creating...`);
            const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
                public: true,
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/jpg']
            });

            if (createBucketError) {
                console.error("Failed to create bucket:", createBucketError);
                // We continue, hoping it might have been a race condition or list permission issue
            }
        }

        // 2. Upload file
        const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (uploadError) {
            console.error("Supabase Storage Upload Error:", uploadError);
            return NextResponse.json({ error: 'Upload failed', details: uploadError }, { status: 500 });
        }

        // 3. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload API Error:", error);
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}
