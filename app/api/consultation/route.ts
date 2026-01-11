import { NextRequest, NextResponse } from "next/server";
import { ConsultationRequest } from "@/types";
import { createServerSupabaseClient } from "@/lib/supabase";
import { sendEmail, formatConsultationEmail, formatAutoReplyEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationRequest = await request.json();

    // Validate required fields
    if (!data.projectType || !data.contactName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase database
    try {
      const supabase = createServerSupabaseClient();
      
      const { data: insertedData, error: dbError } = await supabase
        .from("consultation_requests")
        .insert({
          project_type: data.projectType,
          space_size: data.spaceSize,
          budget_range: data.budgetRange,
          timeline: data.timeline,
          location: data.location,
          style_preferences: data.stylePreferences || [],
          specific_requirements: data.specificRequirements || "",
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          company: data.company || null,
          status: "new",
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json(
          { error: "Failed to save consultation request. Please try again." },
          { status: 500 }
        );
      }

      // Send email notification to business
      try {
        if (process.env.EMAIL_TO) {
          await sendEmail({
            to: process.env.EMAIL_TO,
            subject: `New Consultation Request: ${data.projectType}`,
            html: formatConsultationEmail(data),
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
          subject: "Thank You for Your Consultation Request - DSK Interior",
          html: formatAutoReplyEmail(data.contactName, 'consultation'),
        });
      } catch (emailError) {
        console.error("Auto-reply email error:", emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json(
        { 
          message: "Consultation request submitted successfully", 
          id: insertedData.id 
        },
        { status: 200 }
      );
    } catch (supabaseError) {
      // If Supabase is not configured, log and return success (for development)
      if (supabaseError instanceof Error && supabaseError.message.includes("Missing Supabase")) {
        console.warn("Supabase not configured. Logging data:", data);
        return NextResponse.json(
          { 
            message: "Consultation request received (database not configured)", 
            id: "dev-mode" 
          },
          { status: 200 }
        );
      }
      throw supabaseError;
    }
  } catch (error) {
    console.error("Error processing consultation request:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

