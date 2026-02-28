import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, position, resume_url } = body;

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Insert job application
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          name,
          email,
          phone,
          position,
          resume_url: resume_url || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving job application:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in career API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


