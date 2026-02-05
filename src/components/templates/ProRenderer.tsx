import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, MapPin, Twitter, Linkedin, Github, Instagram, Globe, ExternalLink, ArrowDown, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

function FloatingShape({ color, size, position, delay }: { color: string; size: number; position: { x: string; y: string }; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30"
      style={{ 
        background: color,
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

function GlowingText({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span 
      className="relative"
      style={{ textShadow: `0 0 40px ${color}50, 0 0 80px ${color}30` }}
    >
      {children}
    </span>
  );
}

function StatCard({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-6 rounded-2xl text-center backdrop-blur-sm border"
      style={{ backgroundColor: color + '10', borderColor: color + '30' }}
    >
      <div className="text-4xl font-bold mb-2" style={{ color }}>{value}</div>
      <div className="text-sm opacity-70">{label}</div>
    </motion.div>
  );
}

function ProjectCard({ project, template, index }: { project: WebsiteContent['projects'][0]; template: Template; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ backgroundColor: template.colors.primary + '10' }}
    >
      {project.imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          />
        </div>
      )}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        animate={{ y: isHovered ? 0 : 10 }}
      >
        <h3 className="font-bold text-xl text-white mb-2">{project.title}</h3>
        <motion.p 
          className="text-sm text-white/70 mb-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
        >
          {project.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export function ProRenderer({ template, content, isPreviewMode }: ProRendererProps) {
  const { personalInfo, socialLinks, skills, projects, education, experience } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const socialIcons = [
    { key: 'twitter', icon: Twitter, url: socialLinks.twitter },
    { key: 'linkedin', icon: Linkedin, url: socialLinks.linkedin },
    { key: 'github', icon: Github, url: socialLinks.github },
    { key: 'instagram', icon: Instagram, url: socialLinks.instagram },
    { key: 'website', icon: Globe, url: socialLinks.website },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.font,
      }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingShape color={template.colors.primary} size={600} position={{ x: '10%', y: '10%' }} delay={0} />
        <FloatingShape color={template.colors.secondary} size={400} position={{ x: '70%', y: '60%' }} delay={2} />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX: smoothProgress,
          background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.secondary})`,
        }}
      />

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center relative px-6"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto overflow-hidden border-4"
              style={{ borderColor: template.colors.primary }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {personalInfo.avatarUrl ? (
                <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-4xl font-bold"
                  style={{ backgroundColor: template.colors.primary, color: template.colors.background }}
                >
                  {personalInfo.name?.charAt(0) || 'A'}
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <GlowingText color={template.colors.primary}>
                {personalInfo.name || 'Your Name'}
              </GlowingText>
            </h1>
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl mb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: template.colors.secondary }}
          >
            {personalInfo.tagline || 'Your Tagline'}
          </motion.p>

          <motion.p 
            className="max-w-2xl mx-auto text-lg opacity-80 mb-10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personalInfo.bio || 'Write a brief bio about yourself...'}
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4 mb-12"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {socialIcons.map(({ key, icon: Icon, url }, index) => 
              url && (
                <motion.a 
                  key={key}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-sm"
                  style={{ 
                    borderColor: template.colors.primary + '40',
                    backgroundColor: template.colors.primary + '10',
                  }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Icon className="w-5 h-5" style={{ color: template.colors.primary }} />
                </motion.a>
              )
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 opacity-50" />
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <GlowingText color={template.colors.primary}>Skills & Expertise</GlowingText>
              </h2>
            </AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium border backdrop-blur-sm cursor-default"
                  style={{ 
                    backgroundColor: template.colors.primary + '15',
                    borderColor: template.colors.primary + '40',
                    color: template.colors.primary,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <GlowingText color={template.colors.primary}>Experience</GlowingText>
              </h2>
            </AnimatedSection>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border backdrop-blur-sm"
                  style={{ 
                    backgroundColor: template.colors.primary + '08',
                    borderColor: template.colors.primary + '20',
                  }}
                >
                  <h3 className="font-bold text-xl mb-1">{exp.position}</h3>
                  <p className="font-medium mb-2" style={{ color: template.colors.secondary }}>{exp.company}</p>
                  <p className="text-sm opacity-60 mb-3">{exp.startDate} - {exp.endDate || 'Present'}</p>
                  <p className="text-sm opacity-80">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                <GlowingText color={template.colors.primary}>Featured Work</GlowingText>
              </h2>
              <p className="text-center opacity-60 mb-12 max-w-2xl mx-auto">
                A selection of projects I'm proud of
              </p>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} template={template} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6 relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: template.colors.primary }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <GlowingText color={template.colors.primary}>Let's Connect</GlowingText>
            </h2>
            <p className="opacity-70 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            {personalInfo.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                  color: template.colors.background,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${template.colors.primary}40` }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                {personalInfo.email}
              </motion.a>
            )}
          </div>
        </AnimatedSection>
      </section>

      <ExtrasSections template={template} content={content} />

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-sm opacity-60 relative z-10" 
        style={{ borderTop: `1px solid ${template.colors.primary}15` }}
      >
        Built with Pagefolio
      </footer>
    </div>
  );
}
