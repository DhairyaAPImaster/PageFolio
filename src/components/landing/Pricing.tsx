import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const creditOptions = [
  { credits: 50, price: 29 },
  { credits: 100, price: 49 },
  { credits: 250, price: 99 },
  { credits: 500, price: 179 },
];

const freeFeatures = [
  '1 website generation',
  'Access to free templates',
  'Form-based content editing',
  'Mobile-responsive design',
  'Pagefolio subdomain',
  'SSL certificate',
  'Pagefolio watermark',
];

const proFeatures = [
  'Everything in Free',
  'Remove watermark',
  'Visual drag-and-drop editor',
  'Color palette customization',
  'Font selector',
  'Section reordering',
  'Priority support',
  'Custom domain (coming soon)',
];

export function Pricing() {
  const navigate = useNavigate();
  const [selectedCredits, setSelectedCredits] = useState(creditOptions[0]);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more power. Credits work for generations and updates.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-elevated p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Zap className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">Starter</h3>
                <p className="text-sm text-muted-foreground">For getting started</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="font-display text-5xl font-bold text-foreground">Free</span>
              <span className="text-muted-foreground ml-2">forever</span>
            </div>

            <Button
              onClick={() => navigate('/auth?mode=signup')}
              variant="outline"
              className="w-full btn-secondary mb-8"
            >
              Get Started Free
            </Button>

            <ul className="space-y-4">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative card-elevated p-8 border-2 border-primary"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="badge-pro px-4 py-1.5 text-sm">
                <Sparkles className="w-4 h-4 mr-1" />
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">Pro</h3>
                <p className="text-sm text-muted-foreground">For professionals</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-display text-5xl font-bold text-foreground">${selectedCredits.price}</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>

            <div className="mb-6">
              <Select
                value={selectedCredits.credits.toString()}
                onValueChange={(value) => {
                  const option = creditOptions.find(o => o.credits.toString() === value);
                  if (option) setSelectedCredits(option);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select credits" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {creditOptions.map((option) => (
                    <SelectItem key={option.credits} value={option.credits.toString()}>
                      {option.credits} credits - ${option.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                1 credit = 1 website generation or update
              </p>
            </div>

            <Button
              onClick={() => navigate('/auth?mode=signup')}
              className="w-full btn-primary mb-8"
            >
              Upgrade to Pro
            </Button>

            <ul className="space-y-4">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
