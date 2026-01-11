export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  images: string[];
  location: string;
  year: number;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectCategory = 
  | "residential" 
  | "commercial" 
  | "retail" 
  | "corporate" 
  | "hospitality"
  | "all";

export interface ConsultationRequest {
  id?: string;
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
  status?: "new" | "contacted" | "in_progress" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  createdAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
}




