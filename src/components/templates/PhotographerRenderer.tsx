import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, Instagram, ExternalLink, X, ChevronLeft, ChevronRight, Camera, Award, Users, Image } from 'lucide-react';

interface PhotographerRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

// Cinematic Reveal Component
function CinematicReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Parallax Image Component
function ParallaxImage({ src, alt, aspect = 'video' }: { src: string; alt: string; aspect?: 'video' | 'square' | 'portrait' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div ref={ref} className={`${aspectClasses[aspect]} overflow-hidden relative`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-110"
        style={{ y }}
      />
    </div>
  );
}

// Lightbox Component
function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext, 
  template 
}: { 
  images: { url: string; title: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  template: Template;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl max-h-[80vh] px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="max-w-full max-h-[75vh] object-contain mx-auto"
        />
        <p className="text-center text-white/70 mt-4 text-sm">
          {images[currentIndex].title} — {currentIndex + 1} / {images.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Gallery Grid
function GalleryGrid({ 
  items, 
  template, 
  onImageClick 
}: { 
  items: WebsiteContent['gallery'];
  template: Template;
  onImageClick: (index: number) => void;
}) {
  const categories = useMemo(() => {
    if (!items) return [];
    const cats = new Set(items.map(item => item.category || 'All'));
    return ['All', ...Array.from(cats).filter(c => c !== 'All')];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (activeCategory === 'All') return items;
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  if (!items || items.length === 0) return null;
  return (
    <div>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? '' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: activeCategory === cat ? template.colors.primary : 'transparent',
                color: activeCategory === cat ? template.colors.background : template.colors.text,
                border: `1px solid ${template.colors.primary}40`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="aspect-square overflow-hidden cursor-pointer group relative"
              onClick={() => onImageClick(items!.findIndex(i => i.id === item.id))}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: template.colors.primary + '90' }}
              >
                <Camera className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Project/Series Card
function SeriesCard({ project, template, index }: { project: WebsiteContent['projects'][0]; template: Template; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
    >
      {/* Image */}
      <div className="flex-1 w-full">
        {project.imageUrl && (
          <div className="overflow-hidden rounded-lg group cursor-pointer">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.02 }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {project.tags && (
            <div className="flex gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: template.colors.primary }}
                >
                  {tag}
                  {i < project.tags!.length - 1 && <span className="ml-2 opacity-30">|</span>}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h3>
          <p className="opacity-70 mb-6 leading-relaxed">{project.description}</p>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium"
              style={{ color: template.colors.primary }}
              whileHover={{ x: 10 }}
            >
              View Series <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function PhotographerRenderer({ template, content, isPreviewMode }: PhotographerRendererProps) {
  const { personalInfo, socialLinks, skills, projects, experience, stats, gallery } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImages = useMemo(() => {
    if (!gallery) return [];
    return gallery.map(item => ({ url: item.imageUrl, title: item.title }));
  }, [gallery]);

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
      {/* Hero Section - Full Screen Image */}
      <motion.section 
        className="h-screen relative overflow-hidden"
        style={{ scale: heroScale }}
      >
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        >
          {(projects[0]?.imageUrl || gallery?.[0]?.imageUrl) && (
            <img
              src={projects[0]?.imageUrl || gallery?.[0]?.imageUrl}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          )}
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(to bottom, ${template.colors.background}00 0%, ${template.colors.background}90 70%, ${template.colors.background} 100%)`,
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none">
              {personalInfo.name || 'Photographer'}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-6"
              style={{ color: template.colors.secondary }}
            >
              {personalInfo.tagline}
            </p>
            <ExtrasSections template={template} content={content} />
            <div className="flex items-center gap-6">
              {personalInfo.location && (
                <span className="text-sm opacity-60">{personalInfo.location}</span>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: template.colors.primary }}
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-px h-16 mb-2"
            style={{ backgroundColor: template.colors.primary + '40' }}
          />
          <span className="text-xs uppercase tracking-widest opacity-50 transform rotate-90 origin-center">
            Scroll
          </span>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <CinematicReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {personalInfo.avatarUrl && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest mb-6"
                  style={{ color: template.colors.primary }}
                >
                  About
                </h2>
                <p className="text-2xl md:text-3xl leading-relaxed mb-8 font-light">
                  {personalInfo.bio}
                </p>
                {stats && stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-8 mt-12">
                    {stats.slice(0, 4).map((stat) => (
                      <div key={stat.id}>
                        <div className="text-4xl font-bold mb-1" style={{ color: template.colors.primary }}>
                          {stat.value}
                        </div>
                        <div className="text-sm opacity-60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CinematicReveal>
        </div>
      </section>

      {/* Selected Work / Projects */}
      {projects.length > 0 && (
        <section className="py-24 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <CinematicReveal>
              <h2 
                className="text-sm uppercase tracking-widest mb-16 text-center"
                style={{ color: template.colors.primary }}
              >
                Selected Work
              </h2>
            </CinematicReveal>
            <div className="space-y-24">
              {projects.map((project, index) => (
                <SeriesCard key={project.id} project={project} template={template} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="py-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <CinematicReveal>
              <h2 
                className="text-sm uppercase tracking-widest mb-16 text-center"
                style={{ color: template.colors.primary }}
              >
                Gallery
              </h2>
            </CinematicReveal>
            <GalleryGrid 
              items={gallery} 
              template={template}
              onImageClick={(index) => setLightboxIndex(index)}
            />
          </div>
        </section>
      )}

      {/* Experience/Awards Section */}
      {experience.length > 0 && (
        <section className="py-24 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <CinematicReveal>
              <h2 
                className="text-sm uppercase tracking-widest mb-16 text-center"
                style={{ color: template.colors.primary }}
              >
                Experience & Recognition
              </h2>
            </CinematicReveal>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-8 items-start pb-8"
                  style={{ borderBottom: `1px solid ${template.colors.primary}15` }}
                >
                  <div className="shrink-0 w-24 text-sm opacity-50">
                    {exp.startDate} — {exp.endDate || 'Now'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                    <p style={{ color: template.colors.primary }}>{exp.company}</p>
                    <p className="text-sm opacity-60 mt-2">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-16">
        <CinematicReveal>
          <div className="max-w-2xl mx-auto text-center">
            <Camera className="w-10 h-10 mx-auto mb-8" style={{ color: template.colors.primary }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Create Together
            </h2>
            <p className="opacity-70 mb-10">
              Available for editorial, commercial, and fine art projects worldwide
            </p>
            {personalInfo.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-3 px-10 py-4 text-lg font-medium"
                style={{ 
                  backgroundColor: template.colors.primary,
                  color: template.colors.background,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" /> {personalInfo.email}
              </motion.a>
            )}
          </div>
        </CinematicReveal>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-sm opacity-40"
        style={{ borderTop: `1px solid ${template.colors.primary}15` }}
      >
        © {new Date().getFullYear()} {personalInfo.name} — Built with Pagefolio
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : 0)}
            onNext={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % lightboxImages.length : 0)}
            template={template}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
