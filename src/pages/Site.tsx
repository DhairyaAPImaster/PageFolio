import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { templates, WebsiteContent, defaultContent } from '@/lib/templates';
import { TemplatePreview } from '@/components/builder/TemplatePreview';
import { Loader2, Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Site() {
  const { slug } = useParams<{ slug: string }>();

  const { data: website, isLoading, error } = useQuery({
    queryKey: ['public-website', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('websites')
        .select('*, templates:template_id(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading website...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Website Not Found</h1>
            <p className="text-muted-foreground">
              The website you're looking for doesn't exist.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <Globe className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild>
              <Link to="/templates">
                Create Your Own
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Find the template from our templates list or use the one from DB
  const template = templates.find(t => t.id === website.template_id) || 
    (website.templates?.config ? {
      id: website.template_id || 'default',
      name: website.templates?.name || 'Custom',
      category: 'minimal' as const,
      description: '',
      isPro: false,
      colors: {
        primary: '#1a1a1a',
        secondary: '#666666',
        background: '#ffffff',
        text: '#1a1a1a',
      },
      font: 'Inter',
      layout: 'centered' as const,
    } : templates[0]);

  // Parse website content
  const content: WebsiteContent = website.content 
    ? (typeof website.content === 'string' 
        ? JSON.parse(website.content) 
        : website.content as unknown as WebsiteContent)
    : defaultContent;

  return (
    <div className="min-h-screen">
      <TemplatePreview 
        template={template} 
        content={content}
        isPreviewMode={false}
        showWatermark={true}
      />
    </div>
  );
}
