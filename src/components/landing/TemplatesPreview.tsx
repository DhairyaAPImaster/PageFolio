import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates, categories } from '@/lib/templates';
import { TemplatePreviewMini } from '@/components/builder/TemplatePreview';

// Get a selection of templates for the landing page preview
const featuredTemplates = [
  templates.find(t => t.id === 'clean-slate'),
  templates.find(t => t.id === 'executive'),
  templates.find(t => t.id === 'prestige'),
  templates.find(t => t.id === 'campus'),
  templates.find(t => t.id === 'superstar'),
  templates.find(t => t.id === 'devfolio'),
  templates.find(t => t.id === 'exposure'),
  templates.find(t => t.id === 'neuron'),
].filter(Boolean);

export function TemplatesPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Templates</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            {templates.length}+ stunning templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professionally designed for every purpose. From minimal elegance to immersive experiences.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.filter(c => c.id !== 'all').map((category) => (
            <button
              key={category.id}
              onClick={() => navigate('/templates')}
              className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white hover:opacity-90 transition-opacity flex items-center gap-1.5`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Template Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {featuredTemplates.map((template, index) => template && (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`card-elevated overflow-hidden group cursor-pointer ${
                template.isPro ? 'border-2 border-amber-500/30' : ''
              }`}
              onClick={() => navigate('/templates')}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <TemplatePreviewMini template={template} />
                
                {template.isPro && (
                  <div className="absolute top-3 right-3 badge-pro shadow-md">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-white/90 text-foreground shadow-md">
                    Preview
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <span className="text-xs text-muted-foreground capitalize">{template.category}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/templates')}
            className="btn-primary text-base px-8 py-4 h-auto"
          >
            View All {templates.length} Templates
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
