import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Please upload PDF or Word document.' }, { status: 400 });
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `applications/${fileName}`;

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Check if bucket exists, if not create it
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketName = 'resumes';
        const bucketExists = buckets?.find(b => b.name === bucketName);

        if (!bucketExists) {
            const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
                public: false, // Resumes should be private
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            });

            if (createBucketError) {
                console.error("Failed to create bucket:", createBucketError);
            }
        }

        // Upload file
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

        // Get Public URL (or signed URL for private bucket)
        const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload Resume API Error:", error);
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}


