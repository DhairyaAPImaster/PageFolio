import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth?mode=signup');
  };

  const goToTemplates = () => {
    navigate('/templates');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23000'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-8"
            style={{ borderRadius: '6px' }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Join 10,000+ creators building stunning portfolios</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Your personal website,{' '}
            <span className="text-gradient">built in minutes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Choose from 40+ professional templates, fill in your details, and launch your 
            portfolio, resume, or bio link site. No coding required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={handleGetStarted}
              className="btn-primary text-base px-8 py-4 h-auto"
            >
              Start Building for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={goToTemplates}
              className="btn-secondary text-base px-8 py-4 h-auto"
            >
              Browse Templates
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {(() => {
                  const avatars = [];
                  for (let i = 1; i <= 5; i++) {
                    avatars.push(
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                        style={{ borderRadius: '50%' }}
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    );
                  }
                  return avatars;
                })()}
              </div>
              <span>10K+ users</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>5 min setup</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl opacity-50" style={{ borderRadius: '24px' }} />
            <div className="relative bg-card border border-border overflow-hidden" style={{ borderRadius: '16px', boxShadow: 'var(--shadow-strong)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-destructive/60" style={{ borderRadius: '50%' }} />
                  <div className="w-3 h-3 bg-yellow-500/60" style={{ borderRadius: '50%' }} />
                  <div className="w-3 h-3 bg-green-500/60" style={{ borderRadius: '50%' }} />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="px-4 py-1 bg-background text-xs text-muted-foreground" style={{ borderRadius: '4px' }}>
                    portfolio preview
                  </div>
                </div>
              </div>
              <div className="aspect-[16/10] bg-gradient-to-br from-background to-muted p-8">
                <div className="h-full bg-background/80 border border-border/50 flex items-center justify-center" style={{ borderRadius: '12px', boxShadow: 'var(--shadow-soft)' }}>
                  <div className="text-center">
                    <div className="w-20 h-20 gradient-hero mx-auto mb-4 flex items-center justify-center" style={{ borderRadius: '50%' }}>
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Your Name</h3>
                    <p className="text-muted-foreground">Designer & Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
