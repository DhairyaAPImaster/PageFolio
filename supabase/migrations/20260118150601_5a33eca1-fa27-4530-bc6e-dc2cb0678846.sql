-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  is_pro BOOLEAN DEFAULT false,
  credits INTEGER DEFAULT 10,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create templates table
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('minimal', 'professional', 'student', 'creator', 'developer', 'photographer')),
  description TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  is_pro_only BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create websites table
CREATE TABLE public.websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.templates(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_published BOOLEAN DEFAULT false,
  content JSONB DEFAULT '{}',
  custom_styles JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create credit_transactions table
CREATE TABLE public.credit_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'generation', 'publish', 'refund')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Templates policies (public read)
CREATE POLICY "Templates are viewable by everyone" ON public.templates FOR SELECT USING (true);

-- Websites policies
CREATE POLICY "Users can view their own websites" ON public.websites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own websites" ON public.websites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own websites" ON public.websites FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own websites" ON public.websites FOR DELETE USING (auth.uid() = user_id);

-- Credit transactions policies
CREATE POLICY "Users can view their own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transactions" ON public.credit_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON public.websites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, credits)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default templates
INSERT INTO public.templates (name, category, description, thumbnail_url, is_pro_only, config) VALUES
('Clean Slate', 'minimal', 'A beautifully simple design that lets your content shine', '/templates/minimal-1.jpg', false, '{"primaryColor": "#1a1a1a", "fontFamily": "Inter"}'),
('Noir', 'minimal', 'Elegant dark theme with sophisticated typography', '/templates/minimal-2.jpg', false, '{"primaryColor": "#0a0a0a", "fontFamily": "Playfair Display"}'),
('Executive', 'professional', 'Perfect for business professionals and executives', '/templates/professional-1.jpg', false, '{"primaryColor": "#2563eb", "fontFamily": "Source Sans Pro"}'),
('Resume Pro', 'professional', 'Showcase your career achievements with style', '/templates/professional-2.jpg', true, '{"primaryColor": "#059669", "fontFamily": "Roboto"}'),
('Campus', 'student', 'Ideal for students and recent graduates', '/templates/student-1.jpg', false, '{"primaryColor": "#8b5cf6", "fontFamily": "Nunito"}'),
('Scholar', 'student', 'Academic-focused with publications and research sections', '/templates/student-2.jpg', false, '{"primaryColor": "#0891b2", "fontFamily": "Merriweather"}'),
('Influencer', 'creator', 'Bold and eye-catching for content creators', '/templates/creator-1.jpg', false, '{"primaryColor": "#ec4899", "fontFamily": "Poppins"}'),
('Streamer', 'creator', 'Gaming and streaming focused with dynamic elements', '/templates/creator-2.jpg', true, '{"primaryColor": "#9333ea", "fontFamily": "Orbitron"}'),
('DevFolio', 'developer', 'Showcase your projects with code-inspired aesthetics', '/templates/developer-1.jpg', false, '{"primaryColor": "#22c55e", "fontFamily": "JetBrains Mono"}'),
('Terminal', 'developer', 'Command-line inspired minimal developer portfolio', '/templates/developer-2.jpg', false, '{"primaryColor": "#10b981", "fontFamily": "Fira Code"}'),
('Gallery', 'photographer', 'Let your visual work take center stage', '/templates/photographer-1.jpg', false, '{"primaryColor": "#f59e0b", "fontFamily": "Cormorant Garamond"}'),
('Aperture', 'photographer', 'Cinematic layout with immersive image presentation', '/templates/photographer-2.jpg', true, '{"primaryColor": "#ef4444", "fontFamily": "Lora"}')