import ConsultationForm from "@/components/forms/ConsultationForm";

export default function ConsultationPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-custom section-padding">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Project <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you with a personalized proposal
          </p>
        </div>
        <ConsultationForm />
      </div>
    </div>
  );
}

