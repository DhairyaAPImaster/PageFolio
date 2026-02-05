import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Save, Sparkles, Lock, Loader2 } from 'lucide-react';
import { templates, Template, WebsiteContent, defaultContent } from '@/lib/templates';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ContentForm } from '@/components/builder/ContentForm';
import { VisualEditor } from '@/components/builder/VisualEditor';
import { TemplatePreview } from '@/components/builder/TemplatePreview';
import { Watermark } from '@/components/Watermark';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { saveContentDraft, loadContentDraft, clearContentDraft } from '@/lib/localStorage';

const defaultSections = [
  { id: 'hero', name: 'Hero / Profile', visible: true },
  { id: 'skills', name: 'Skills', visible: true },
  { id: 'experience', name: 'Experience', visible: true },
  { id: 'education', name: 'Education', visible: true },
  { id: 'projects', name: 'Projects', visible: true },
];

export default function Builder() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [template, setTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState<WebsiteContent>(defaultContent);
  const [sections, setSections] = useState(defaultSections);
  const [websiteName, setWebsiteName] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const foundTemplate = templates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      
      const savedDraft = loadContentDraft();
      if (savedDraft) {
        setContent(savedDraft);
      }
    } else {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  useEffect(() => {
    if (content !== defaultContent) {
      saveContentDraft(content);
    }
  }, [content]);

  const canUseVisualEditor = true;
  const showWatermark = false;

  const handleSave = async () => {
    if (!user || !template) return;

    if (!websiteName.trim()) {
      toast({ title: 'Please enter a website name', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const slug = websiteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { error } = await supabase.from('websites').insert({
        user_id: user.id,
        name: websiteName,
        slug,
        content: content as any,
        custom_styles: {
          template: template.id,
          colors: template.colors,
          font: template.font,
          sections,
        } as any,
        is_published: true,
      });

      if (error) throw error;

      // Deduct credit
      if (profile && profile.credits > 0) {
        await supabase
          .from('profiles')
          .update({ credits: profile.credits - 1 })
          .eq('user_id', user.id);
      }

      clearContentDraft();
      toast({ title: 'Website created!', description: 'Your website is now live.' });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/templates')} className="btn-ghost">
              <ArrowLeft className="w-4 h-4 mr-2" /> Templates
            </Button>
            <div className="h-6 w-px bg-border" />
            <Input
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="My Personal Website"
              className="w-48 md:w-64 input-primary text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {profile?.credits ?? 0} credits
            </span>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {showPreview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <TemplatePreview template={template} content={content} showWatermark={showWatermark} />
            {showWatermark && <Watermark />}
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Tabs defaultValue="content">
                <TabsList className="grid grid-cols-2 w-full bg-muted">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="design" className="relative">
                    Design
                    {!canUseVisualEditor && (
                      <Lock className="w-3 h-3 ml-1 text-muted-foreground" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <div className="card-elevated p-6">
                    <ContentForm content={content} onChange={setContent} />
                  </div>
                </TabsContent>

                <TabsContent value="design" className="mt-6">
                  <div className="card-elevated p-6">
                    {canUseVisualEditor ? (
                      <VisualEditor
                        template={template}
                        onTemplateChange={setTemplate}
                        sections={sections}
                        onSectionsChange={setSections}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-2xl gradient-premium mx-auto mb-4 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-display font-bold text-xl mb-2">Pro Feature</h3>
                        <p className="text-muted-foreground mb-4">
                          Upgrade to Pro to access the visual editor with custom colors, fonts, and section reordering.
                        </p>
                        <Button onClick={() => navigate('/pricing')} className="btn-primary">
                          Upgrade to Pro
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Live Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <h3 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wider">Live Preview</h3>
                <ScrollArea className="h-[calc(100vh-180px)] rounded-xl border shadow-medium">
                  <TemplatePreview template={template} content={content} isPreviewMode />
                </ScrollArea>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
