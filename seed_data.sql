-- SEED DATA FOR DSK INTERIORS

-- 1. PROJECTS
INSERT INTO projects (title, category, description, location, year, featured, images) VALUES
(
  'Modern Luxury Apartment',
  'Residential',
  'A stunning transformation of a 3-bedroom apartment into a modern luxury living space. This project showcases contemporary design with elegant finishes and smart space utilization.',
  'New York, NY',
  2024,
  true,
  ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200']
),
(
  'Corporate Headquarters',
  'Commercial',
  'A flagship office space designed to foster collaboration and innovation. Features open-plan areas, private pods, and a biophilic design approach.',
  'San Francisco, CA',
  2024,
  false,
  ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200']
),
(
  'Boutique Retail Store',
  'Retail',
  'An immersive retail environment for a high-end fashion brand. The design focuses on customer journey and product highlighting.',
  'Los Angeles, CA',
  2023,
  false,
  ARRAY['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200']
),
(
  'Contemporary Office Space',
  'Office',
  'Modern office interior maximizing natural light and ergonomic comfort.',
  'Chicago, IL',
  2023,
  false,
  ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200']
),
(
  'Luxury Hotel Lobby',
  'Hospitality',
  'Grand entrance lobby for a 5-star hotel, featuring custom chandeliers and marble flooring.',
  'Miami, FL',
  2024,
  false,
  ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200']
),
(
  'Family Home Renovation',
  'Residential',
  'Complete renovation of a suburban family home, adding warmth and modern amenities.',
  'Seattle, WA',
  2023,
  false,
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200']
);

-- 2. TESTIMONIALS
INSERT INTO testimonials (name, role, company, content, rating, image) VALUES
(
  'Sarah Johnson',
  'Homeowner',
  '',
  'DSK Interior transformed our home beyond our expectations. Their attention to detail and creative vision is unmatched. We couldn''t be happier!',
  5,
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
),
(
  'Michael Chen',
  'CEO',
  'Tech Innovations',
  'The corporate office redesign was phenomenal. Our team productivity has increased, and the space reflects our brand perfectly.',
  5,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
),
(
  'Emily Rodriguez',
  'Director',
  'Boutique Fashion',
  'Our retail space is now a destination. Customers love the atmosphere, and sales have increased significantly. Highly recommend!',
  5,
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
);

-- 3. SERVICES
-- Note: 'icon' stores the Lucide icon name which will be mapped on the frontend
INSERT INTO services (title, description, icon, "order", link) VALUES
('Interior Design', 'Full-service residential design focused on creating functional yet luxurious living environments.', 'Armchair', 1, '/contact?service=interior-design'),
('Space Planning', 'Optimizing the layout of your home to ensure flow, balance, and maximum utility.', 'Layout', 2, '/contact?service=space-planning'),
('Styling & Decor', 'The finishing touches that turn a house into a home, from art selection to custom textiles.', 'Palette', 3, '/contact?service=styling'),
('Commercial Design', 'Create professional workspaces that enhance productivity and brand identity.', 'Building2', 4, '/contact?service=commercial'),
('Renovation', 'Expert guidance through structural changes and updates to breathe new life into your space.', 'Home', 5, '/contact?service=renovation'),
('Custom Furniture', 'Bespoke furniture design tailored specifically to your dimensions and style preferences.', 'PenTool', 6, '/contact?service=custom-furniture');

-- 4. STATS
INSERT INTO stats (label, value, "order") VALUES
('Years Experience', '6+', 1),
('Projects Completed', '35+', 2),
('Cities Covered', '3', 3),
('Client Satisfaction', '100%', 4);
