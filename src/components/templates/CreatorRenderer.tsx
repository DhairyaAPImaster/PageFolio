import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, Twitter, Instagram, Youtube, Twitch, ExternalLink, Sparkles, Heart, Users, Eye, Zap } from 'lucide-react';

interface CreatorRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

// Gradient Mesh Background
function GradientMesh({ colors }: { colors: { primary: string; secondary: string; accent?: string } }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
        style={{ 
          background: colors.primary,
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25"
        style={{ 
          background: colors.secondary,
          right: '15%',
          top: '40%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {colors.accent && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20"
          style={{ 
            background: colors.accent,
            left: '50%',
            bottom: '10%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      )}
    </div>
  );
}

// Neon Text Effect
function NeonText({ children, color, size = 'lg' }: { children: React.ReactNode; color: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-6xl',
    xl: 'text-5xl md:text-8xl',
  };

  return (
    <motion.span
      className={`${sizeClasses[size]} font-bold relative inline-block`}
      style={{ 
        color,
        textShadow: `0 0 10px ${color}80, 0 0 20px ${color}60, 0 0 30px ${color}40, 0 0 40px ${color}20`,
      }}
      animate={{
        textShadow: [
          `0 0 10px ${color}80, 0 0 20px ${color}60, 0 0 30px ${color}40, 0 0 40px ${color}20`,
          `0 0 15px ${color}90, 0 0 25px ${color}70, 0 0 35px ${color}50, 0 0 45px ${color}30`,
          `0 0 10px ${color}80, 0 0 20px ${color}60, 0 0 30px ${color}40, 0 0 40px ${color}20`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

// Floating Social Card
function FloatingSocialCard({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  delay 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="p-6 rounded-2xl backdrop-blur-md border relative overflow-hidden"
      style={{ 
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderColor: color + '30',
      }}
    >
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30"
        style={{ backgroundColor: color }}
      />
      <Icon className="w-8 h-8 mb-3" style={{ color }} />
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-60">{label}</div>
    </motion.div>
  );
}

// Animated Stat Badge
function StatBadge({ stat, color, index }: { stat: { value: string; label: string }; color: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="text-center p-6 rounded-2xl relative overflow-hidden cursor-default"
      style={{ backgroundColor: color + '10' }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{ background: `radial-gradient(circle at center, ${color}30, transparent)` }}
        whileHover={{ opacity: 1 }}
      />
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color }}>{stat.value}</div>
      <div className="text-sm opacity-70">{stat.label}</div>
    </motion.div>
  );
}

// Content Card with Hover Effects
function ContentCard({ project, template, index }: { project: WebsiteContent['projects'][0]; template: Template; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
    >
      {project.imageUrl && (
        <div className="aspect-[4/5] overflow-hidden">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      )}
      
      {/* Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }}
        animate={{ 
          background: isHovered 
            ? `linear-gradient(to top, ${template.colors.primary}CC 0%, ${template.colors.secondary}80 50%, transparent 100%)`
            : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)'
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <motion.p
            className="text-white/80 text-sm mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          >
            {project.description}
          </motion.p>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              View <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Tags */}
      {project.tags && (
        <div className="absolute top-4 left-4 flex gap-2">
          {project.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function CreatorRenderer({ template, content, isPreviewMode }: CreatorRendererProps) {
  const { personalInfo, socialLinks, skills, projects, experience, stats, testimonials } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.font,
      }}
    >
      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none">
        <GradientMesh colors={template.colors} />
      </div>

      {/* Scanline Effect for Streamer Template */}
      {template.features?.includes('scanline-effect') && (
        <div 
          className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
          }}
        />
      )}

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center relative px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Avatar with Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div 
              className="w-36 h-36 md:w-48 md:h-48 rounded-full mx-auto overflow-hidden border-4 relative"
              style={{ 
                borderColor: template.colors.primary,
                boxShadow: `0 0 60px ${template.colors.primary}60`,
              }}
            >
              {personalInfo.avatarUrl ? (
                <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-5xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                  }}
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Name with Neon Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <NeonText color={template.colors.primary} size="xl">
              {personalInfo.name || 'Creator'}
            </NeonText>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl mt-6 mb-8"
            style={{ color: template.colors.secondary }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-xl mx-auto text-lg mb-10"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.twitter && (
              <motion.a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                }}
              >
                <Twitter className="w-6 h-6 text-white" />
              </motion.a>
            )}
            {socialLinks.instagram && (
              <motion.a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${template.colors.secondary}, ${template.colors.primary})`,
                }}
              >
                <Instagram className="w-6 h-6 text-white" />
              </motion.a>
            )}
            {(socialLinks as any).youtube && (
              <motion.a 
                href={(socialLinks as any).youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-600"
              >
                <Youtube className="w-6 h-6 text-white" />
              </motion.a>
            )}
            {(socialLinks as any).tiktok && (
              <motion.a 
                href={(socialLinks as any).tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black border border-white/20"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6" style={{ color: template.colors.primary }} />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <NeonText color={template.colors.primary} size="md">The Numbers</NeonText>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatBadge key={stat.id} stat={stat} color={template.colors.primary} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills as Floating Tags */}
      {skills.length > 0 && (
        <section className="py-20 overflow-hidden relative z-10">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <span
                key={index}
                className="text-2xl md:text-4xl font-bold mx-6 px-6 py-3 rounded-full border"
                style={{ 
                  borderColor: template.colors.primary + '40',
                  color: template.colors.primary,
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </section>
      )}

      {/* Content/Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
              <NeonText color={template.colors.primary} size="md">Featured Content</NeonText>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              The work I'm most proud of
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ContentCard key={project.id} project={project} template={template} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <NeonText color={template.colors.primary} size="md">Love from the Community</NeonText>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl backdrop-blur-sm border"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: template.colors.primary + '20',
                  }}
                >
                  <p className="text-lg mb-4 italic opacity-80">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatarUrl && (
                      <img 
                        src={testimonial.avatarUrl} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm opacity-60">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.secondary}20)`,
            border: `1px solid ${template.colors.primary}30`,
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${template.colors.primary}, transparent)`,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative z-10">
            <Heart className="w-12 h-12 mx-auto mb-6" style={{ color: template.colors.primary }} />
            <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
            <p className="opacity-70 mb-8">
              For brand partnerships, collaborations, and inquiries
            </p>
            {personalInfo.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                  color: 'white',
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${template.colors.primary}40` }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" /> Get in Touch
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>

      <ExtrasSections template={template} content={content} />

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-sm opacity-50 relative z-10"
        style={{ borderTop: `1px solid ${template.colors.primary}20` }}
      >
        Built with ✨ Pagefolio
      </footer>
    </div>
  );
}
