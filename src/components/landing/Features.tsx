import { motion } from 'framer-motion';
import { Palette, Layout, Zap, Smartphone, Wand2, CreditCard } from 'lucide-react';

const feature_list = [
  {
    icon: Layout,
    title: '40+ Professional Templates',
    description: 'From minimal to bold, find the perfect design for your personal brand.',
  },
  {
    icon: Zap,
    title: 'Build in 5 Minutes',
    description: 'Simple form-based input. Just fill in your details and watch your site come alive.',
  },
  {
    icon: Palette,
    title: 'Visual Editor (Pro)',
    description: 'Drag-and-drop sections, customize colors, fonts, and layouts with ease.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Every template looks stunning on all devices, from phones to desktops.',
  },
  {
    icon: Wand2,
    title: 'AI-Powered Content',
    description: 'Get smart suggestions for your bio, taglines, and project descriptions.',
  },
  {
    icon: CreditCard,
    title: 'Forever Free',
    description: 'No upgrades, no hidden costs, and no paywalls.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Everything you need to stand out
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools to create your perfect personal website, without any technical knowledge.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {feature_list.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="card-elevated p-6 group"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
