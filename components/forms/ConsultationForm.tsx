"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { ProjectCategory, ConsultationRequest } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";

const projectTypeSchema = z.object({
  projectType: z.enum(["residential", "commercial", "retail", "corporate", "hospitality"]),
});

const projectDetailsSchema = z.object({
  spaceSize: z.string().min(1, "Space size is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  location: z.string().min(1, "Location is required"),
});

const preferencesSchema = z.object({
  stylePreferences: z.array(z.string()).min(1, "Select at least one style preference"),
  specificRequirements: z.string().optional(),
});

const contactSchema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  company: z.string().optional(),
});

type FormData = {
  projectType: ProjectCategory;
  spaceSize: string;
  budgetRange: string;
  timeline: string;
  location: string;
  stylePreferences: string[];
  specificRequirements: string;
  contactName: string;
  email: string;
  phone: string;
  company?: string;
};

const steps = [
  { id: 1, title: "Project Type", schema: projectTypeSchema },
  { id: 2, title: "Project Details", schema: projectDetailsSchema },
  { id: 3, title: "Preferences", schema: preferencesSchema },
  { id: 4, title: "Contact Info", schema: contactSchema },
  { id: 5, title: "Review", schema: z.object({}) },
];

const styleOptions = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Minimalist",
  "Industrial",
  "Scandinavian",
  "Bohemian",
  "Luxury",
];

const STORAGE_KEY = "dsk-consultation-form-progress";

export default function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {},
  });

  const watchedValues = watch();

  // Load saved progress from localStorage and sync with form
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const savedFormData = parsed.data || {};
        const savedStep = parsed.currentStep || 1;
        
        setFormData(savedFormData);
        setCurrentStep(savedStep);
        
        // Sync form values with saved data
        Object.keys(savedFormData).forEach((key) => {
          setValue(key as keyof FormData, savedFormData[key as keyof FormData]);
        });
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
    setIsLoading(false);
  }, [setValue]);

  // Save progress to localStorage
  const updateFormData = (data: Partial<FormData>) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: updated,
          currentStep,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      console.error("Error saving form data:", e);
    }
  };

  // Clear saved progress
  const clearSavedProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
    setCurrentStep(1);
    reset();
  };

  const nextStep = async () => {
    const currentSchema = steps[currentStep - 1].schema;
    const isValid = await trigger(Object.keys(currentSchema.shape) as Array<keyof FormData>);
    
    if (isValid) {
      // Get current form values
      const currentValues = watch();
      updateFormData(currentValues);
      
      if (currentStep < steps.length) {
        const nextStepNum = currentStep + 1;
        setCurrentStep(nextStepNum);
        
        // Save step change to localStorage
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              data: { ...formData, ...currentValues },
              currentStep: nextStepNum,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          console.error("Error saving step:", e);
        }
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Clear saved progress on success
        clearSavedProgress();
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "There was an error submitting your form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
        <p className="text-xl text-neutral-600 mb-8">
          We&apos;ve received your consultation request. Our team will contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  // Prevent form submission on Enter key in review step
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      handleSubmit(onSubmit)(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep > step.id
                      ? "bg-primary-600 text-white"
                      : currentStep === step.id
                      ? "bg-primary-600 text-white ring-4 ring-primary-200"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className="text-xs mt-2 text-neutral-600 hidden sm:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.id ? "bg-primary-600" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Select Project Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["residential", "commercial", "retail", "corporate", "hospitality"] as ProjectCategory[]).map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setValue("projectType", type);
                        updateFormData({ projectType: type });
                      }}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        watchedValues.projectType === type
                          ? "border-primary-600 bg-primary-50"
                          : "border-neutral-200 hover:border-primary-300"
                      }`}
                    >
                      <h3 className="font-semibold text-lg capitalize mb-2">{type}</h3>
                    </button>
                  )
                )}
              </div>
              {errors.projectType && (
                <p className="text-red-600 text-sm">{errors.projectType.message}</p>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Project Details</h2>
              <div>
                <label className="block text-sm font-semibold mb-2">Space Size</label>
                <select
                  {...register("spaceSize")}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select size</option>
                  <option value="small">Small (under 500 sq ft)</option>
                  <option value="medium">Medium (500-2000 sq ft)</option>
                  <option value="large">Large (2000-5000 sq ft)</option>
                  <option value="xlarge">Extra Large (5000+ sq ft)</option>
                </select>
                {errors.spaceSize && (
                  <p className="text-red-600 text-sm mt-1">{errors.spaceSize.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Budget Range</label>
                <select
                  {...register("budgetRange")}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select budget</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>
                {errors.budgetRange && (
                  <p className="text-red-600 text-sm mt-1">{errors.budgetRange.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Timeline</label>
                <select
                  {...register("timeline")}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6-12months">6-12 months</option>
                  <option value="planning">Just planning</option>
                </select>
                {errors.timeline && (
                  <p className="text-red-600 text-sm mt-1">{errors.timeline.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input
                  type="text"
                  {...register("location")}
                  placeholder="City, State"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Style Preferences</h2>
              <div>
                <label className="block text-sm font-semibold mb-4">
                  Select your preferred styles (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {styleOptions.map((style) => {
                    const isSelected = formData.stylePreferences?.includes(style) || watchedValues.stylePreferences?.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => {
                          const current = formData.stylePreferences || watchedValues.stylePreferences || [];
                          const updated = isSelected
                            ? current.filter((s) => s !== style)
                            : [...current, style];
                          setValue("stylePreferences", updated);
                          const newFormData = { ...formData, stylePreferences: updated };
                          setFormData(newFormData);
                          // Save to localStorage immediately
                          try {
                            localStorage.setItem(
                              STORAGE_KEY,
                              JSON.stringify({
                                data: newFormData,
                                currentStep,
                                timestamp: Date.now(),
                              })
                            );
                          } catch (e) {
                            console.error("Error saving form data:", e);
                          }
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-primary-600 bg-primary-50 text-primary-700"
                            : "border-neutral-200 hover:border-primary-300"
                        }`}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
                {errors.stylePreferences && (
                  <p className="text-red-600 text-sm mt-2">{errors.stylePreferences.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  {...register("specificRequirements")}
                  rows={4}
                  placeholder="Tell us about any specific requirements, ideas, or inspiration..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  {...register("contactName")}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
                {errors.contactName && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Company (Optional)</label>
                <input
                  type="text"
                  {...register("company")}
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Review Your Information</h2>
              <div className="bg-neutral-50 rounded-xl p-6 space-y-4">
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Project Type:</span>
                  <p className="text-lg capitalize">{formData.projectType}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Space Size:</span>
                  <p className="text-lg">{formData.spaceSize}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Budget Range:</span>
                  <p className="text-lg">{formData.budgetRange}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Timeline:</span>
                  <p className="text-lg">{formData.timeline}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Location:</span>
                  <p className="text-lg">{formData.location}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Style Preferences:</span>
                  <p className="text-lg">{formData.stylePreferences?.join(", ")}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Name:</span>
                  <p className="text-lg">{formData.contactName}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Email:</span>
                  <p className="text-lg">{formData.email}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-600">Phone:</span>
                  <p className="text-lg">{formData.phone}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-full font-semibold flex items-center space-x-2 ${
            currentStep === 1
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Consultation</span>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

