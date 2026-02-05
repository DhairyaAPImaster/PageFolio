-- Create a function to grant Pro status to special email domains
CREATE OR REPLACE FUNCTION public.check_pro_email_domain()
RETURNS TRIGGER AS $$
BEGIN
  -- Grant Pro status to users with @pagefolio.secret.com email
  IF NEW.email LIKE '%@pagefolio.secret.com' THEN
    NEW.is_pro := true;
    NEW.plan_type := 'pro';
    NEW.credits := 1000;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to run on profile insert or update
DROP TRIGGER IF EXISTS grant_pro_for_special_emails ON public.profiles;
CREATE TRIGGER grant_pro_for_special_emails
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_pro_email_domain();