import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET() {
    try {
        // 0. Check Env Vars
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
        const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!hasUrl || !hasServiceKey) {
            return NextResponse.json({
                success: false,
                message: "Missing Environment Variables",
                env: { hasUrl, hasServiceKey }
            }, { status: 500 });
        }

        const supabase = createServerSupabaseClient();

        // 0.5 Check Database Connection
        const { count, error: dbError } = await supabase.from('projects').select('*', { count: 'exact', head: true });

        if (dbError) {
            return NextResponse.json({
                success: false,
                message: "Database Connection Failed",
                dbError,
                env: { hasUrl, hasServiceKey }
            }, { status: 500 });
        }

        // 1. List Buckets
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();

        if (listError) {
            return NextResponse.json({
                step: 'List Buckets',
                error: listError,
                message: 'Failed to list buckets. Service Role might lack permissions.',
                dbConnection: 'OK',
                env: { hasUrl, hasServiceKey }
            }, { status: 500 });
        }

        const bucketName = 'project-images';
        const targetBucket = buckets?.find(b => b.name === bucketName);

        // 2. Create Bucket if missing
        let creationResult = "Bucket already exists";
        if (!targetBucket) {
            const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
                public: true,
                fileSizeLimit: 5242880,
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/jpg']
            });

            if (createError) {
                return NextResponse.json({
                    step: 'Create Bucket',
                    error: createError,
                    buckets: buckets
                }, { status: 500 });
            }
            creationResult = "Bucket created successfully";
        }

        return NextResponse.json({
            success: true,
            env: { hasUrl, hasServiceKey },
            dbConnection: { ok: true, count },
            buckets: buckets?.map(b => b.name),
            targetBucketStatus: creationResult,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
