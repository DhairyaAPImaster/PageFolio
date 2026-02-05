import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, ArrowDown, ExternalLink, ChevronRight } from 'lucide-react';

interface ImmersiveRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

function ParticleField({ color }: { color: string }) {
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MorphingBlob({ color, size, position }: { color: string; size: number; position: { x: string; y: string } }) {
  return (
    <motion.div
      className="absolute blur-3xl"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.3, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(' ');
  
  return (
    <span className="inline-flex flex-wrap gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + i * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ImmersiveGallery({ projects, template }: { projects: WebsiteContent['projects']; template: Template }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="relative aspect-square overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {project.imageUrl && (
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hoveredId === project.id ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            animate={{ backgroundColor: hoveredId === project.id ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)' }}
          >
            <motion.div
              className="text-center p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hoveredId === project.id ? 1 : 0, y: hoveredId === project.id ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-white/70 mb-4">{project.description}</p>
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
                  style={{ backgroundColor: template.colors.primary, color: template.colors.background }}
                  whileHover={{ scale: 1.05 }}
                >
                  View <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function ImmersiveRenderer({ template, content, isPreviewMode }: ImmersiveRendererProps) {
  const { personalInfo, skills, projects, experience } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.font,
      }}
    >
      <div className="fixed inset-0 pointer-events-none">
        <ParticleField color={template.colors.primary} />
        <MorphingBlob color={template.colors.primary} size={500} position={{ x: '70%', y: '20%' }} />
        <MorphingBlob color={template.colors.secondary} size={400} position={{ x: '10%', y: '60%' }} />
      </div>

      {/* Hero */}
      <motion.section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {personalInfo.avatarUrl && (
            <motion.div
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 rounded-full overflow-hidden border-4"
              style={{ borderColor: template.colors.primary }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
            </motion.div>
          )}
          
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            <RevealText delay={0.5}>{personalInfo.name || 'Your Name'}</RevealText>
          </h1>
          
          <motion.p
            className="text-xl md:text-3xl mb-8"
            style={{ color: template.colors.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {personalInfo.tagline}
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 opacity-50" />
        </motion.div>
      </motion.section>

      {/* Experience */}
      {experience.map((exp, index) => (
        <section key={exp.id} className="min-h-screen flex items-center px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm opacity-50 mb-2">{exp.startDate} — {exp.endDate || 'Present'}</p>
            <h3 className="text-4xl md:text-6xl font-bold mb-4">{exp.position}</h3>
            <p className="text-2xl mb-6" style={{ color: template.colors.secondary }}>{exp.company}</p>
            <p className="opacity-70 max-w-2xl">{exp.description}</p>
          </motion.div>
        </section>
      ))}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-20 relative z-10">
          <motion.h2 className="text-4xl md:text-6xl font-bold text-center mb-16 px-6">
            Selected Work
          </motion.h2>
          <ImmersiveGallery projects={projects} template={template} />
        </section>
      )}

      {/* Skills Marquee */}
      {skills.length > 0 && (
        <section className="py-20 overflow-hidden relative z-10">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={index}
                className="text-4xl md:text-6xl font-bold mx-8 opacity-20"
                style={{ color: template.colors.primary }}
              >
                {skill} •
              </span>
            ))}
          </motion.div>
        </section>
      )}

      {/* Contact */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <motion.div className="text-center px-6">
          <h2 className="text-5xl md:text-8xl font-bold mb-8">
            <RevealText>Let's Create Together</RevealText>
          </h2>
          {personalInfo.email && (
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-xl font-medium group"
              style={{ color: template.colors.primary }}
              whileHover={{ x: 10 }}
            >
              <Mail className="w-6 h-6" />
              {personalInfo.email}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          )}
        </motion.div>
      </section>

      <ExtrasSections template={template} content={content} />

      <footer className="py-8 text-center text-sm opacity-40 relative z-10">
        Built with Pagefolio
      </footer>
    </div>
  );
}
