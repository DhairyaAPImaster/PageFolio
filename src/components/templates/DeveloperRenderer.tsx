import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, MapPin, Twitter, Linkedin, Github, Instagram, Globe, ExternalLink, Terminal, Code2, GitBranch, Star } from 'lucide-react';

interface DeveloperRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

function MatrixRain({ color }: { color: string }) {
  const columns = 30;
  const chars = useMemo(() => {
    const result = [];
    for (let i = 0; i < columns; i++) {
      const char_array = [];
      for (let j = 0; j < 15; j++) {
        char_array.push(String.fromCharCode(0x30A0 + Math.random() * 96));
      }
      result.push({
        id: i,
        x: (i / columns) * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 5,
        chars: char_array.join(''),
      });
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {chars.map((col) => (
        <motion.div
          key={col.id}
          className="absolute text-xs font-mono"
          style={{
            left: `${col.x}%`,
            color,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}
          initial={{ y: '-100%' }}
          animate={{ y: '100vh' }}
          transition={{
            duration: col.duration,
            delay: col.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {col.chars}
        </motion.div>
      ))}
    </div>
  );
}

function TerminalPrompt({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono">
      <span className="opacity-60">$ </span>
      {displayedText}
      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>▋</span>
    </span>
  );
}

function GlitchText({ children, color }: { children: string; color: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span className={isGlitching ? 'animate-pulse' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 opacity-70"
            style={{ 
              color,
              transform: 'translate(-2px, -1px)',
              clipPath: 'inset(20% 0 40% 0)',
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 opacity-70"
            style={{ 
              color: color + '80',
              transform: 'translate(2px, 1px)',
              clipPath: 'inset(60% 0 10% 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

function CodeBlock({ code, language, color }: { code: string; language: string; color: string }) {
  return (
    <div 
      className="overflow-hidden border font-mono text-sm"
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: color + '30',
        borderRadius: '6px'
      }}
    >
      <div 
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ borderColor: color + '20' }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-red-500/70" style={{ borderRadius: '50%' }} />
          <div className="w-3 h-3 bg-yellow-500/70" style={{ borderRadius: '50%' }} />
          <div className="w-3 h-3 bg-green-500/70" style={{ borderRadius: '50%' }} />
        </div>
        <span className="text-xs opacity-50">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code style={{ color }}>{code}</code>
      </pre>
    </div>
  );
}

function StatCounter({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="p-4 border font-mono"
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderColor: color + '30',
        borderRadius: '4px'
      }}
    >
      <div className="text-3xl font-bold mb-1" style={{ color }}>{value}</div>
      <div className="text-xs opacity-60">// {label}</div>
    </motion.div>
  );
}

function ProjectCard({ project, template, index }: { project: WebsiteContent['projects'][0]; template: Template; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const initial_x = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initial_x }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="overflow-hidden border group"
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '8px',
        borderColor: template.colors.primary + '30',
      }}
    >
      {project.imageUrl && (
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div 
            className="absolute inset-0 opacity-50"
            style={{ background: `linear-gradient(to top, ${template.colors.background}, transparent)` }}
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-4 h-4" style={{ color: template.colors.primary }} />
          <h3 className="font-bold text-lg">{project.title}</h3>
        </div>
        <p className="text-sm opacity-70 mb-4 font-mono">{project.description}</p>
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ 
                  backgroundColor: template.colors.primary + '20',
                  color: template.colors.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.link && (
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono hover:opacity-80 transition-opacity"
            style={{ color: template.colors.primary }}
          >
            <Code2 className="w-4 h-4" /> view source <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function DeveloperRenderer({ template, content, isPreviewMode }: DeveloperRendererProps) {
  const { personalInfo, socialLinks, skills, projects, education, experience, stats } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const socialIcons = [
    { key: 'github', icon: Github, url: socialLinks.github },
    { key: 'twitter', icon: Twitter, url: socialLinks.twitter },
    { key: 'linkedin', icon: Linkedin, url: socialLinks.linkedin },
    { key: 'website', icon: Globe, url: socialLinks.website },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.font,
      }}
    >
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none">
        <MatrixRain color={template.colors.primary} />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
        style={{ 
          scaleX: smoothProgress,
          backgroundColor: template.colors.primary,
          boxShadow: `0 0 10px ${template.colors.primary}`,
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto overflow-hidden border-2 relative"
              style={{ borderColor: template.colors.primary }}
            >
              {personalInfo.avatarUrl ? (
                <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-4xl font-mono"
                  style={{ backgroundColor: template.colors.primary + '20' }}
                >
                  {'</>'}
                </div>
              )}
              <div 
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 30px ${template.colors.primary}50 inset` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GlitchText color={template.colors.primary}>
                {personalInfo.name || 'Developer'}
              </GlitchText>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl mb-6 font-mono"
            style={{ color: template.colors.secondary }}
          >
            <TerminalPrompt text={personalInfo.tagline || 'Full-Stack Developer'} delay={0.8} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg opacity-70 mb-8"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {socialIcons.map(({ key, icon: Icon, url }) => 
              url && (
                <motion.a 
                  key={key}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border"
                  style={{ 
                    borderColor: template.colors.primary + '40',
                    backgroundColor: template.colors.primary + '10',
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: `0 0 20px ${template.colors.primary}50`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: template.colors.primary }} />
                </motion.a>
              )
            )}
          </motion.div>
        </div>

        {/* Terminal Window Decoration */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-sm opacity-50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Terminal className="w-5 h-5 mx-auto mb-2" />
          scroll to explore
        </motion.div>
      </section>

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 font-mono text-center"
            >
              <span style={{ color: template.colors.primary }}>const</span> metrics = {'{'}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCounter 
                  key={stat.id} 
                  value={stat.value} 
                  label={stat.label} 
                  color={template.colors.primary}
                  delay={index * 0.1}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mt-8 font-mono text-center"
            >
              {'}'};
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 font-mono text-center"
              style={{ color: template.colors.primary }}
            >
              {'<TechStack />'}
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: `0 0 15px ${template.colors.primary}40`,
                  }}
                  className="px-4 py-2 rounded border font-mono text-sm cursor-default"
                  style={{ 
                    borderColor: template.colors.primary + '40',
                    backgroundColor: template.colors.primary + '10',
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
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-12 font-mono text-center"
              style={{ color: template.colors.primary }}
            >
              git log --oneline
            </motion.h2>
            <div className="space-y-6 relative">
              <div 
                className="absolute left-8 top-0 bottom-0 w-px"
                style={{ backgroundColor: template.colors.primary + '30' }}
              />
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="pl-16 relative"
                >
                  <div 
                    className="absolute left-6 w-4 h-4 rounded-full border-2"
                    style={{ 
                      borderColor: template.colors.primary,
                      backgroundColor: template.colors.background,
                    }}
                  />
                  <div 
                    className="p-5 rounded-lg border"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderColor: template.colors.primary + '20',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-sm opacity-60">
                      <GitBranch className="w-4 h-4" />
                      {exp.startDate} — {exp.endDate || 'HEAD'}
                    </div>
                    <h3 className="font-bold text-xl mb-1">{exp.position}</h3>
                    <p className="font-mono" style={{ color: template.colors.secondary }}>{exp.company}</p>
                    <p className="mt-3 text-sm opacity-70">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 font-mono text-center"
              style={{ color: template.colors.primary }}
            >
              {'/* Featured Projects */'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center opacity-60 mb-12 font-mono text-sm"
            >
              // Open source contributions & side projects
            </motion.p>
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
        <div className="max-w-2xl mx-auto text-center">
          <CodeBlock 
            code={`const contact = {
  email: "${personalInfo.email || 'hello@dev.io'}",
  location: "${personalInfo.location || 'Remote'}",
  status: "Open to opportunities"
};

// Let's build something amazing together
console.log(contact);`}
            language="javascript"
            color={template.colors.primary}
          />
          {personalInfo.email && (
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg font-mono font-bold"
              style={{ 
                backgroundColor: template.colors.primary,
                color: template.colors.background,
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px ${template.colors.primary}60`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" /> Send Message
            </motion.a>
          )}
        </div>
      </section>

      <ExtrasSections template={template} content={content} />

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-sm opacity-50 font-mono relative z-10"
        style={{ borderTop: `1px solid ${template.colors.primary}20` }}
      >
        {'// '} Built with Pagefolio {'</>'} 
      </footer>
    </div>
  );
}
