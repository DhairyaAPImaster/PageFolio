import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, Crown, Zap, Layout, Layers, Grid3X3, Maximize } from 'lucide-react';
import { templates, categories, Template, sampleContent } from '@/lib/templates';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TemplatePreview, TemplatePreviewMini } from '@/components/builder/TemplatePreview';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const layoutIcons: Record<string, typeof Layout> = {
  centered: Layout,
  split: Layers,
  grid: Grid3X3,
  asymmetric: Zap,
  magazine: Layout,
  immersive: Maximize,
};

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const freeTemplates = filteredTemplates.filter(t => !t.isPro);
  const proTemplates = filteredTemplates.filter(t => t.isPro);

  const handleSelectTemplate = (template: Template) => {
    if (template.isPro && !profile?.is_pro) {
      navigate('/pricing');
      return;
    }
    if (!user) {
      navigate('/auth?mode=signup');
      return;
    }
    navigate(`/builder/${template.id}`);
  };

  const LayoutIcon = (layout: string) => {
    const Icon = layoutIcons[layout] || Layout;
    return <Icon className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              {templates.length} Templates
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Choose Your Perfect Template
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From minimal elegance to stunning immersive experiences. 
              Pro templates feature advanced animations and effects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => {
              let btn_class = 'px-5 py-2.5 text-sm font-medium transition-all flex items-center gap-2';
              if (selectedCategory === category.id) {
                btn_class += ` bg-gradient-to-r ${category.color} text-white shadow-lg`;
              } else {
                btn_class += ' bg-muted text-muted-foreground hover:bg-muted/80';
              }
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={btn_class}
                  style={{ borderRadius: '6px' }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              );
            })}
          </motion.div>

          {proTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white" style={{ borderRadius: '6px' }}>
                  <Crown className="w-4 h-4" />
                  <span className="font-semibold">Pro Templates</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Advanced animations, scroll effects & premium designs
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {proTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className="relative group"
                  >
                    <div className="card-elevated overflow-hidden border-2 border-amber-500/30 hover:border-amber-500/60 transition-colors">
                      <div 
                        className="aspect-[4/3] relative overflow-hidden cursor-pointer"
                        onClick={() => setPreviewTemplate(template)}
                      >
                        <TemplatePreviewMini template={template} />
                        
                        <div className="absolute top-3 right-3 badge-pro shadow-lg">
                          <Crown className="w-3 h-3 mr-1" />
                          PRO
                        </div>

                        {template.features && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex flex-wrap gap-1">
                              {template.features.slice(0, 2).map((feature, i) => (
                                <span 
                                  key={i}
                                  className="px-2 py-0.5 text-[10px] rounded-full bg-black/50 text-white backdrop-blur-sm"
                                >
                                  {feature}
                                </span>
                              ))}
                              {template.features.length > 2 && (
                                <span className="px-2 py-0.5 text-[10px] rounded-full bg-black/50 text-white backdrop-blur-sm">
                                  +{template.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <AnimatePresence>
                          {hoveredTemplate === template.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                            >
                              <Button size="sm" variant="secondary" className="bg-white/95 text-foreground shadow-lg">
                                <Eye className="w-4 h-4 mr-1" /> Preview
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Template Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {LayoutIcon(template.layout)}
                            <span className="capitalize">{template.layout}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                        <Button 
                          onClick={() => handleSelectTemplate(template)}
                          className="w-full btn-primary text-sm py-2"
                          disabled={!profile?.is_pro}
                        >
                          {profile?.is_pro ? 'Use Template' : 'Upgrade to Use'}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Free Templates Section */}
          {freeTemplates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold">Free Templates</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Beautiful designs, no upgrade required
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {freeTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    className="card-elevated overflow-hidden group"
                  >
                    <div 
                      className="aspect-[4/3] relative overflow-hidden cursor-pointer"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <TemplatePreviewMini template={template} />

                      {/* Layout Badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-black/30 text-white backdrop-blur-sm flex items-center gap-1">
                        {LayoutIcon(template.layout)}
                        <span className="capitalize">{template.layout}</span>
                      </div>

                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredTemplate === template.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-foreground/10 flex items-center justify-center"
                          >
                            <Button size="sm" variant="secondary" className="bg-white/95 text-foreground">
                              <Eye className="w-4 h-4 mr-1" /> Preview
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                      <Button 
                        onClick={() => handleSelectTemplate(template)}
                        className="w-full btn-primary text-sm py-2"
                      >
                        Use Template
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No templates found in this category.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Template Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-card">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-display text-2xl flex items-center gap-2">
                  {previewTemplate?.name}
                  {previewTemplate?.isPro && (
                    <Badge className="badge-pro ml-2">
                      <Crown className="w-3 h-3 mr-1" /> PRO
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-1">{previewTemplate?.description}</p>
              </div>
              {previewTemplate?.features && (
                <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
                  {previewTemplate.features.map((feature, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-200px)]">
            <div className="p-6">
              {previewTemplate && (
                <TemplatePreview 
                  template={previewTemplate} 
                  content={sampleContent}
                  isPreviewMode
                />
              )}
            </div>
          </ScrollArea>
          
          <div className="p-6 pt-4 border-t flex justify-between items-center bg-background/50 backdrop-blur-sm">
            <div className="text-sm text-muted-foreground">
              {previewTemplate?.isPro && !profile?.is_pro && (
                <span className="flex items-center gap-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  Upgrade to Pro to use this template
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                Close
              </Button>
              <Button 
                className="btn-primary"
                onClick={() => {
                  if (previewTemplate) {
                    setPreviewTemplate(null);
                    handleSelectTemplate(previewTemplate);
                  }
                }}
                disabled={previewTemplate?.isPro && !profile?.is_pro}
              >
                {previewTemplate?.isPro && !profile?.is_pro ? 'Upgrade Required' : 'Use This Template'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
