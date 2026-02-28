"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";

const jobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  position: z.string().min(1, "Position is required"),
  resume: z.instanceof(File).optional(),
});

type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

export default function JobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
    },
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Please upload a PDF or Word document");
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setErrorMessage("");
    }
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    setResumeUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'resumes'); // Specify bucket

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Resume upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading resume:', error);
      return null;
    } finally {
      setResumeUploading(false);
    }
  };

  const onSubmit = async (data: JobApplicationFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      let resumeUrl: string | null = null;

      // Upload resume if provided
      if (resumeFile) {
        resumeUrl = await uploadResume(resumeFile);
        if (!resumeUrl) {
          setErrorMessage("Failed to upload resume. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Submit application
      const response = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          resume_url: resumeUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      setSubmitStatus("success");
      form.reset();
      setResumeFile(null);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submitStatus === "success" && (
          <SuccessMessage message="Thank you! Your application has been submitted successfully. We'll get back to you soon." />
        )}

        {submitStatus === "error" && errorMessage && (
          <ErrorMessage message={errorMessage} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">
              Full Name *
            </label>
            <input
              {...form.register("name")}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="John Doe"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">
              Email *
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">
              Phone *
            </label>
            <input
              type="tel"
              {...form.register("phone")}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="+91 98765 43210"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">
              Position Applied For *
            </label>
            <input
              {...form.register("position")}
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="Interior Designer"
            />
            {form.formState.errors.position && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.position.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wide text-neutral-700">
            Resume (PDF or Word Document)
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
              id="resume-upload"
              disabled={resumeUploading || isSubmitting}
            />
            <label
              htmlFor="resume-upload"
              className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-neutral-50 transition-colors ${
                resumeUploading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                {resumeUploading ? (
                  <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-2" />
                ) : (
                  <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                )}
                <span className="text-sm font-medium text-neutral-600">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </span>
                <span className="text-xs text-neutral-400 mt-1">
                  PDF or Word document, max 5MB
                </span>
              </div>
            </label>
          </div>
          {resumeFile && (
            <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Resume selected: {resumeFile.name}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || resumeUploading}
          className="w-full bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  );
}


