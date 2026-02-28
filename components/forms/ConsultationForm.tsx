"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight, ArrowLeft, Check,
  Home, Building2, Store, Briefcase, Coffee, Utensils,
  MapPin, Sparkles, User, Mail, Phone, Building, MessageSquare
} from "lucide-react";
import { ProjectCategory, ConsultationRequest } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";

const projectTypeSchema = z.object({
  projectType: z.enum(["modular-kitchen", "residential", "commercial", "retail", "corporate", "hospitality"]),
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

type FormData = z.infer<typeof projectTypeSchema> &
  z.infer<typeof projectDetailsSchema> &
  z.infer<typeof preferencesSchema> &
  z.infer<typeof contactSchema>;

const steps = [
  { id: 1, title: "Space & Use", subtitle: "What are we designing?", schema: projectTypeSchema },
  { id: 2, title: "Scope & Details", subtitle: "Project parameters", schema: projectDetailsSchema },
  { id: 3, title: "Aesthetics", subtitle: "Your vision & style", schema: preferencesSchema },
  { id: 4, title: "Your Details", subtitle: "How to reach you", schema: contactSchema },
  { id: 5, title: "Review", subtitle: "Confirm details", schema: z.object({}) },
];

const projectTypes = [
  { id: "residential", title: "Residential", icon: Home, desc: "Homes, Villas & Apartments" },
  { id: "commercial", title: "Commercial", icon: Building2, desc: "Offices & Workspaces" },
  { id: "modular-kitchen", title: "Modular Kitchen", icon: Utensils, desc: "Custom Kitchen Designs" },
  { id: "retail", title: "Retail", icon: Store, desc: "Shops & Showrooms" },
  { id: "hospitality", title: "Hospitality", icon: Coffee, desc: "Hotels & Restaurants" },
  { id: "corporate", title: "Corporate", icon: Briefcase, desc: "Enterprise Workplaces" },
] as const;

const spaceSizes = [
  { id: "small", title: "Compact", desc: "Under 500 sq ft" },
  { id: "medium", title: "Standard", desc: "500 - 2000 sq ft" },
  { id: "large", title: "Spacious", desc: "2000 - 5000 sq ft" },
  { id: "xlarge", title: "Premium", desc: "5000+ sq ft" },
];

const budgets = [
  { id: "under-10k", title: "Starter", desc: "Under $10k" },
  { id: "10k-25k", title: "Standard", desc: "$10k - $25k" },
  { id: "25k-50k", title: "Premium", desc: "$25k - $50k" },
  { id: "50k-100k", title: "Luxury", desc: "$50k - $100k" },
  { id: "over-100k", title: "Ultra Luxury", desc: "$100k+" },
];

const timelines = [
  { id: "asap", title: "Immediate", desc: "Ready to start" },
  { id: "1-3months", title: "Short Term", desc: "1 - 3 months" },
  { id: "3-6months", title: "Medium Term", desc: "3 - 6 months" },
  { id: "6-12months", title: "Long Term", desc: "6 - 12 months" },
  { id: "planning", title: "Just Planning", desc: "Exploring options" },
];

const styleOptions = [
  "Modern Minimalist",
  "Contemporary Luxury",
  "Classic Traditional",
  "Industrial Chic",
  "Scandinavian",
  "Bohemian Elegance",
  "Mid-Century Modern",
  "Transitional",
];

const STORAGE_KEY = "dsk-consultation-form-v2";

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
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { stylePreferences: [] },
  });

  const watchedValues = watch();

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const savedFormData = parsed.data || {};
        const savedStep = parsed.currentStep || 1;

        setFormData(savedFormData);
        setCurrentStep(savedStep);

        Object.keys(savedFormData).forEach((key) => {
          setValue(key as keyof FormData, savedFormData[key as keyof FormData]);
        });
      } catch (e) {
        console.error("Error loading saved form data:", e);
      }
    }
    setIsLoading(false);
  }, [setValue]);

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

  const clearSavedProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
    setCurrentStep(1);
    reset();
  };

  const nextStep = async () => {
    const currentSchema = steps[currentStep - 1].schema;
    const isStepValid = await trigger(Object.keys(currentSchema.shape) as Array<keyof FormData>);

    if (isStepValid) {
      const currentValues = watch();
      updateFormData(currentValues);

      if (currentStep < steps.length) {
        const nextStepNum = currentStep + 1;
        setCurrentStep(nextStepNum);

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
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-6 max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Check className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-light mb-6 text-neutral-900">
          Request Received
        </h2>
        <p className="text-lg text-neutral-600 mb-10 font-sans leading-relaxed">
          Thank you for sharing your vision with us. One of our lead designers will review your requirements and reach out within 24 hours to schedule your exclusive consultation.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-primary-600 transition-colors duration-300 tracking-wide uppercase text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>
      </motion.div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length) {
      handleSubmit(onSubmit)(e);
    }
  };

  // Generic Card Selector Component
  const CardSelector = ({
    options, name, columns = 2, icon: Icon
  }: {
    options: readonly any[], name: keyof FormData, columns?: number, icon?: any
  }) => (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {options.map((opt) => {
        const isSelected = watchedValues[name] === opt.id;
        const OptIcon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setValue(name, opt.id, { shouldValidate: true });
              updateFormData({ [name]: opt.id });
            }}
            className={`flex items-start p-5 rounded-2xl border-2 transition-all duration-300 text-left ${isSelected
              ? "border-primary-500 bg-primary-50/50 shadow-md transform -translate-y-1"
              : "border-neutral-100 hover:border-primary-200 hover:bg-neutral-50/50 hover:-translate-y-0.5"
              }`}
          >
            <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${isSelected ? "bg-primary-500 text-white shadow-sm" : "bg-neutral-100 text-neutral-600"
              }`}>
              {OptIcon ? <OptIcon className="w-5 h-5" /> : Icon ? <Icon className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current m-1.5" />}
            </div>
            <div>
              <h3 className={`font-semibold mb-1 ${isSelected ? "text-primary-900" : "text-neutral-900"}`}>
                {opt.title}
              </h3>
              <p className={`text-sm ${isSelected ? "text-primary-700/80" : "text-neutral-500"}`}>
                {opt.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        {/* Minimal Progress Bar */}
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-600">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: `${((currentStep - 1) / steps.length) * 100}%` }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-white rounded-[2rem] shadow-xl shadow-neutral-200/50 border border-neutral-100 p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-display font-light text-neutral-900 mb-3">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-neutral-500 font-sans text-lg">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>

            {currentStep === 1 && (
              <div className="space-y-6">
                <CardSelector options={projectTypes} name="projectType" columns={2} />
                {errors.projectType && (
                  <p className="text-red-500 text-sm flex items-center mt-2"><ArrowRight className="w-3 h-3 mr-1" /> {errors.projectType.message}</p>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">Approximate Space Size</h3>
                  <CardSelector options={spaceSizes} name="spaceSize" columns={2} icon={Building} />
                  {errors.spaceSize && <p className="text-red-500 text-sm mt-2">{errors.spaceSize.message}</p>}
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">Initial Budget Estimate</h3>
                  <CardSelector options={budgets} name="budgetRange" columns={2} />
                  {errors.budgetRange && <p className="text-red-500 text-sm mt-2">{errors.budgetRange.message}</p>}
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">Expected Timeline</h3>
                  <CardSelector options={timelines} name="timeline" columns={2} />
                  {errors.timeline && <p className="text-red-500 text-sm mt-2">{errors.timeline.message}</p>}
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">Project Location</h3>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("location")}
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all text-lg rounded-t-xl"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Style Preferences (Select multiple)
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {styleOptions.map((style) => {
                      const isSelected = watchedValues.stylePreferences?.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => {
                            const current = watchedValues.stylePreferences || [];
                            const updated = isSelected
                              ? current.filter((s) => s !== style)
                              : [...current, style];
                            setValue("stylePreferences", updated, { shouldValidate: true });
                            updateFormData({ stylePreferences: updated });
                          }}
                          className={`px-6 py-3 rounded-full border transition-all text-sm font-medium ${isSelected
                            ? "border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20"
                            : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-neutral-50"
                            }`}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                  {errors.stylePreferences && <p className="text-red-500 text-sm mt-3">{errors.stylePreferences.message}</p>}
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Specific Requirements
                  </h3>
                  <textarea
                    {...register("specificRequirements")}
                    rows={4}
                    placeholder="Tell us about your lifestyle, any specific needs, or must-haves..."
                    className="w-full p-5 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all text-base rounded-t-2xl resize-none placeholder:text-neutral-400"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2 block">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register("contactName")}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all rounded-t-xl"
                      />
                    </div>
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2 block">Company (Optional)</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="Your Company"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all rounded-t-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2 block">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="hello@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all rounded-t-xl"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2 block">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-0 border-b-2 border-neutral-200 focus:border-primary-500 focus:ring-0 focus:bg-primary-50/30 transition-all rounded-t-xl"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">Project Target</span>
                      <p className="font-medium text-lg capitalize">{watchedValues.projectType?.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">Location</span>
                      <p className="font-medium text-lg">{watchedValues.location}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">Size & Budget</span>
                      <p className="font-medium">{spaceSizes.find(s => s.id === watchedValues.spaceSize)?.title} • {budgets.find(b => b.id === watchedValues.budgetRange)?.title}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">Timeline</span>
                      <p className="font-medium">{timelines.find(t => t.id === watchedValues.timeline)?.title}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-2">Style Preferences</span>
                      <div className="flex flex-wrap gap-2">
                        {watchedValues.stylePreferences?.map(style => (
                          <span key={style} className="bg-white border border-neutral-200 px-3 py-1 rounded-full text-sm font-medium text-neutral-700">{style}</span>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2 pt-4 border-t border-neutral-200 mt-2">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-2">Contact Details</span>
                      <p className="font-medium text-lg">{watchedValues.contactName} {watchedValues.company ? `(${watchedValues.company})` : ''}</p>
                      <p className="text-neutral-600">{watchedValues.email} • {watchedValues.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-neutral-100">
          <button
            type="button"
            onClick={prevStep}
            className={`font-semibold flex items-center space-x-2 text-sm uppercase tracking-wider transition-colors ${currentStep === 1
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-500 hover:text-neutral-900"
              }`}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="group px-8 py-4 bg-neutral-900 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all duration-300 shadow-xl shadow-neutral-900/20 hover:shadow-2xl hover:-translate-y-0.5 flex items-center space-x-3"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="group px-8 py-4 bg-primary-500 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-600 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:-translate-y-0.5 flex items-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <Check className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

