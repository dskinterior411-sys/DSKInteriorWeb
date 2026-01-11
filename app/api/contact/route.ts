import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { sendEmail, formatContactEmail, formatAutoReplyEmail } from "@/lib/email";

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message || !data.subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase database
    try {
      const supabase = createServerSupabaseClient();
      
      const { data: insertedData, error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          subject: data.subject,
          message: data.message,
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json(
          { error: "Failed to save message. Please try again." },
          { status: 500 }
        );
      }

      // Send email notification to business
      try {
        if (process.env.EMAIL_TO) {
          await sendEmail({
            to: process.env.EMAIL_TO,
            subject: `Contact Form: ${data.subject}`,
            html: formatContactEmail(data),
          });
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the request if email fails
      }

      // Send auto-reply to user
      try {
        await sendEmail({
          to: data.email,
          subject: "Thank You for Contacting DSK Interior",
          html: formatAutoReplyEmail(data.name, 'contact'),
        });
      } catch (emailError) {
        console.error("Auto-reply email error:", emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json(
        { message: "Message sent successfully", id: insertedData.id },
        { status: 200 }
      );
    } catch (supabaseError) {
      // If Supabase is not configured, log and return success (for development)
      if (supabaseError instanceof Error && supabaseError.message.includes("Missing Supabase")) {
        console.warn("Supabase not configured. Logging data:", data);
        return NextResponse.json(
          { 
            message: "Message received (database not configured)", 
            id: "dev-mode" 
          },
          { status: 200 }
        );
      }
      throw supabaseError;
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

