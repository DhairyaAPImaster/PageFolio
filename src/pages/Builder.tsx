import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Sparkles, Lock, Loader2, Download } from 'lucide-react';
import JSZip from 'jszip';
import { templates, Template, WebsiteContent, defaultContent } from '@/lib/templates';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ContentForm } from '@/components/builder/ContentForm';
import { VisualEditor } from '@/components/builder/VisualEditor';
import { TemplatePreview } from '@/components/builder/TemplatePreview';
import { Watermark } from '@/components/Watermark';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { saveContentDraft, loadContentDraft } from '@/lib/localStorage';

const defaultSections = [
  { id: 'hero', name: 'Hero / Profile', visible: true },
  { id: 'skills', name: 'Skills', visible: true },
  { id: 'experience', name: 'Experience', visible: true },
  { id: 'education', name: 'Education', visible: true },
  { id: 'projects', name: 'Projects', visible: true },
];

export default function Builder() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();

  const [template, setTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState<WebsiteContent>(defaultContent);
  const [sections, setSections] = useState(defaultSections);
  const [websiteName, setWebsiteName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDownloadHelp, setShowDownloadHelp] = useState(false);

  useEffect(() => {
    const foundTemplate = templates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      
      const savedDraft = loadContentDraft();
      if (savedDraft) {
        setContent(savedDraft);
      }
    } else {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  useEffect(() => {
    if (content !== defaultContent) {
      saveContentDraft(content);
    }
  }, [content]);

  const canUseVisualEditor = true;
  const showWatermark = false;

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const getFileBase = () => {
    const base = (websiteName || content.personalInfo.name || template?.name || 'pagefolio-site').trim();
    const sanitized = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return sanitized || 'pagefolio-site';
  };

  const buildStyles = () => {
    if (!template) return '';

    return `:root {
  --primary: ${template.colors.primary};
  --secondary: ${template.colors.secondary};
  --background: ${template.colors.background};
  --text: ${template.colors.text};
  --accent: ${template.colors.accent ?? template.colors.primary};
  --primary-soft: color-mix(in srgb, var(--primary) 18%, transparent);
  --secondary-soft: color-mix(in srgb, var(--secondary) 20%, transparent);
  --accent-soft: color-mix(in srgb, var(--accent) 18%, transparent);
  --primary-strong: color-mix(in srgb, var(--primary) 85%, var(--text));
  --accent-strong: color-mix(in srgb, var(--accent) 80%, var(--primary));
  --hero-gradient: linear-gradient(135deg, color-mix(in srgb, var(--primary) 30%, transparent), color-mix(in srgb, var(--accent) 26%, transparent));
  font-family: "${template.font}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  background:
    radial-gradient(1200px 600px at -10% -20%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 60%),
    radial-gradient(900px 500px at 110% -10%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%),
    radial-gradient(700px 420px at 50% 110%, color-mix(in srgb, var(--secondary) 25%, transparent), transparent 60%),
    var(--background);
  background-attachment: fixed;
  color: var(--text);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 48px 24px;
}

.hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  text-align: center;
  padding: 64px 24px 48px;
  background: var(--hero-gradient);
  border-bottom: 1px solid color-mix(in srgb, var(--primary) 18%, transparent);
}

.hero::before,
.hero::after {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.hero::before {
  top: -180px;
  left: -140px;
  background: radial-gradient(circle, color-mix(in srgb, var(--primary) 40%, transparent), transparent 70%);
  animation: float-slow 14s ease-in-out infinite;
}

.hero::after {
  bottom: -200px;
  right: -140px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%);
  animation: float-slow 16s ease-in-out infinite reverse;
}

.hero > * {
  position: relative;
  z-index: 1;
}

.hero--animate {
  animation: fade-up 0.8s ease both;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 999px;
  margin: 0 auto 20px;
  background: var(--primary);
  color: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--primary) 25%, transparent);
  animation: float 6s ease-in-out infinite;
}

.hero h1 {
  font-size: clamp(32px, 4vw, 48px);
  margin: 0 0 12px;
}

.hero p.tagline {
  color: var(--secondary);
  font-size: clamp(18px, 2vw, 22px);
  margin: 0 0 16px;
}

.hero p.bio {
  max-width: 720px;
  margin: 0 auto 24px;
  opacity: 0.9;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 24px;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.socials a {
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--primary-soft), var(--accent-soft));
  font-weight: 600;
  font-size: 13px;
  box-shadow: 0 8px 20px color-mix(in srgb, var(--primary) 20%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.socials a:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--primary) 30%, transparent);
}

section {
  border-top: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
  padding: 48px 0;
}

section h2 {
  text-align: center;
  color: var(--primary);
  font-size: 24px;
  margin-bottom: 32px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.skill {
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--primary-soft), var(--secondary-soft));
  color: var(--primary);
  font-weight: 600;
  font-size: 13px;
}

.cards {
  display: grid;
  gap: 16px;
}

.card {
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 10%, transparent), color-mix(in srgb, var(--accent) 6%, transparent));
  border-radius: 16px;
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--primary) 18%, transparent);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--primary) 12%, transparent);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px color-mix(in srgb, var(--primary) 20%, transparent);
}

.card h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.projects {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.project img {
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--primary) 15%, transparent);
}

.gallery {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.gallery figure {
  margin: 0;
}

.gallery img {
  border-radius: 14px;
  margin-bottom: 8px;
}

.stats {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.stat {
  text-align: center;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 14%, transparent), color-mix(in srgb, var(--secondary) 10%, transparent));
  box-shadow: 0 10px 24px color-mix(in srgb, var(--primary) 12%, transparent);
}

.stat strong {
  display: block;
  font-size: 24px;
  color: var(--primary);
}

.testimonials {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.testimonial {
  padding: 18px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 8%, transparent), color-mix(in srgb, var(--accent) 6%, transparent));
  box-shadow: 0 14px 30px color-mix(in srgb, var(--primary) 10%, transparent);
}

.more-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 20px;
  font-size: 14px;
}

.more-links a,
.more-links span {
  padding: 8px 14px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--primary-soft), var(--accent-soft));
  font-weight: 600;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--primary) 15%, transparent);
}

.more-links a:hover {
  transform: translateY(-2px);
}

.ambient-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.ambient-layer::before,
.ambient-layer::after {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
}

.ambient-layer::before {
  top: 10%;
  left: -10%;
  background: radial-gradient(circle, color-mix(in srgb, var(--primary) 40%, transparent), transparent 70%);
}

.ambient-layer::after {
  bottom: -10%;
  right: -10%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%);
}

main {
  position: relative;
  z-index: 1;
}

body.layout-grid .container {
  max-width: 1120px;
}

body.layout-magazine section {
  padding: 56px 0;
}

body.layout-immersive .hero {
  padding: 96px 24px 72px;
}

body.layout-immersive .container {
  max-width: 1200px;
}

body.feature-gradient-text .hero h1 {
  background: linear-gradient(120deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  color: transparent;
}

body.feature-hover-glow .card,
body.feature-glow-effects .card,
body.feature-hover-glow .testimonial,
body.feature-glow-effects .testimonial {
  box-shadow: 0 18px 42px color-mix(in srgb, var(--accent) 20%, transparent);
}

body.feature-animated-cards .card {
  animation: float-slow 10s ease-in-out infinite;
}

body.feature-animated-cards .card:nth-child(even) {
  animation-delay: -2s;
}

body.feature-gold-shimmer .hero::after {
  background: linear-gradient(120deg, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%);
  animation: shimmer 8s ease-in-out infinite;
}

body.feature-aurora-bg .ambient-layer {
  opacity: 1;
  animation: aurora 18s ease-in-out infinite;
}

body.feature-particle-bg .ambient-layer {
  opacity: 0.55;
  background-image:
    radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 18%),
    radial-gradient(circle at 80% 30%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 20%),
    radial-gradient(circle at 50% 70%, color-mix(in srgb, var(--secondary) 25%, transparent), transparent 22%);
}

body.feature-floating-elements .ambient-layer::before,
body.feature-floating-elements .ambient-layer::after {
  animation: float-slow 16s ease-in-out infinite;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-18px) scale(1.05);
  }
}

@keyframes aurora {
  0%, 100% {
    filter: blur(60px);
    opacity: 0.35;
  }
  50% {
    filter: blur(70px);
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero--animate,
  .avatar,
  .card,
  .socials a,
  .hero::before,
  .hero::after,
  .ambient-layer,
  .ambient-layer::before,
  .ambient-layer::after {
    animation: none;
    transition: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}

footer {
  text-align: center;
  padding: 32px 0 12px;
  opacity: 0.6;
  font-size: 13px;
}
`;
  };

  const buildHtml = () => {
    if (!template) return '';

    const title = escapeHtml(websiteName.trim() || content.personalInfo.name || 'My Website');
    const bio = escapeHtml(content.personalInfo.bio || 'Welcome to my personal website.');
    const avatar = content.personalInfo.avatarUrl
      ? `<img src="${content.personalInfo.avatarUrl}" alt="${escapeHtml(content.personalInfo.name || 'Profile')}" />`
      : `${escapeHtml(content.personalInfo.name?.charAt(0) || 'A')}`;

    const contactItems = [
      content.personalInfo.email ? `<span>${escapeHtml(content.personalInfo.email)}</span>` : '',
      content.personalInfo.phone ? `<span>${escapeHtml(content.personalInfo.phone)}</span>` : '',
      content.personalInfo.location ? `<span>${escapeHtml(content.personalInfo.location)}</span>` : '',
    ].filter(Boolean).join('');

    const socials = [
      { label: 'Twitter', url: content.socialLinks.twitter },
      { label: 'LinkedIn', url: content.socialLinks.linkedin },
      { label: 'GitHub', url: content.socialLinks.github },
      { label: 'Instagram', url: content.socialLinks.instagram },
      { label: 'Website', url: content.socialLinks.website },
      { label: 'YouTube', url: content.socialLinks.youtube },
      { label: 'TikTok', url: content.socialLinks.tiktok },
      { label: 'Dribbble', url: content.socialLinks.dribbble },
      { label: 'Behance', url: content.socialLinks.behance },
    ]
      .filter((link) => link.url)
      .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${escapeHtml(link.label)}</a>`)
      .join('');

    const extraLinks = [
      { label: 'YouTube', url: content.socialLinks.youtube },
      { label: 'TikTok', url: content.socialLinks.tiktok },
      { label: 'Dribbble', url: content.socialLinks.dribbble },
      { label: 'Behance', url: content.socialLinks.behance },
    ]
      .filter((link) => link.url)
      .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${escapeHtml(link.label)}</a>`)
      .join('');

    const moreLinks = extraLinks || content.personalInfo.phone
      ? `<section class="reveal">
  <h2>More Links</h2>
  <div class="more-links">
    ${content.personalInfo.phone ? `<span>${escapeHtml(content.personalInfo.phone)}</span>` : ''}
    ${extraLinks}
  </div>
</section>`
      : '';

    const bodyClassName = [
      `layout-${template.layout}`,
      `template-${template.id}`,
      ...(template.features ?? []).map((feature) => `feature-${feature}`),
    ].join(' ');

    const skills = content.skills.length
      ? `<section class="reveal"><h2>Skills</h2><div class="skills">${content.skills
          .map((skill) => `<span class="skill">${escapeHtml(skill)}</span>`)
          .join('')}</div></section>`
      : '';

    const experience = content.experience.length
      ? `<section class="reveal"><h2>Experience</h2><div class="cards">${content.experience
          .map(
            (exp) => `<div class="card reveal">
  <h3>${escapeHtml(exp.position || 'Role')}</h3>
  <p><strong>${escapeHtml(exp.company || 'Company')}</strong></p>
  <p>${escapeHtml(exp.startDate || '')}${exp.endDate ? ` - ${escapeHtml(exp.endDate)}` : ''}</p>
  <p>${escapeHtml(exp.description || '')}</p>
</div>`,
          )
          .join('')}</div></section>`
      : '';

    const education = content.education.length
      ? `<section class="reveal"><h2>Education</h2><div class="cards">${content.education
          .map(
            (edu) => `<div class="card reveal">
  <h3>${escapeHtml(edu.degree || 'Degree')} ${edu.field ? `in ${escapeHtml(edu.field)}` : ''}</h3>
  <p><strong>${escapeHtml(edu.institution || 'Institution')}</strong></p>
  <p>${escapeHtml(edu.startYear || '')}${edu.endYear ? ` - ${escapeHtml(edu.endYear)}` : ''}</p>
  <p>${escapeHtml(edu.description || '')}</p>
</div>`,
          )
          .join('')}</div></section>`
      : '';

    const projects = content.projects.length
      ? `<section class="reveal"><h2>Projects</h2><div class="projects">${content.projects
          .map(
            (project) => `<div class="card project reveal">
  ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${escapeHtml(project.title || 'Project')}" />` : ''}
  <h3>${escapeHtml(project.title || 'Project')}</h3>
  <p>${escapeHtml(project.description || '')}</p>
  ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener">View project</a>` : ''}
</div>`,
          )
          .join('')}</div></section>`
      : '';

    const gallery = (content.gallery?.length ?? 0) > 0
      ? `<section class="reveal"><h2>Gallery</h2><div class="gallery">${content.gallery
          ?.map(
            (item) => `<figure class="reveal">
  <img src="${item.imageUrl}" alt="${escapeHtml(item.title || 'Gallery item')}" />
  <figcaption>${escapeHtml(item.title || '')}</figcaption>
</figure>`,
          )
          .join('')}</div></section>`
      : '';

    const stats = (content.stats?.length ?? 0) > 0
      ? `<section class="reveal"><h2>Stats</h2><div class="stats">${content.stats
          ?.map(
            (stat) => `<div class="stat reveal">
  <strong>${escapeHtml(stat.value || '')}</strong>
  <span>${escapeHtml(stat.label || '')}</span>
</div>`,
          )
          .join('')}</div></section>`
      : '';

    const testimonials = (content.testimonials?.length ?? 0) > 0
      ? `<section class="reveal"><h2>Testimonials</h2><div class="testimonials">${content.testimonials
          ?.map(
            (item) => `<div class="testimonial reveal">
  <p>"${escapeHtml(item.content || '')}"</p>
  <p><strong>${escapeHtml(item.name || '')}</strong>${item.role ? `, ${escapeHtml(item.role)}` : ''}</p>
</div>`,
          )
          .join('')}</div></section>`
      : '';

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="${bodyClassName}">
    <div class="ambient-layer" aria-hidden="true"></div>
    <main>
      <section class="hero hero--animate">
        <div class="avatar">${avatar}</div>
        <h1>${title}</h1>
        <p class="tagline">${escapeHtml(content.personalInfo.tagline || '')}</p>
        <p class="bio">${bio}</p>
        ${contactItems ? `<div class="contact">${contactItems}</div>` : ''}
        ${socials ? `<div class="socials">${socials}</div>` : ''}
      </section>
      <div class="container">
        ${skills}
        ${experience}
        ${education}
        ${projects}
        ${gallery}
        ${stats}
        ${testimonials}
        ${moreLinks}
      </div>
    </main>
    <footer>Built with Pagefolio</footer>
    <script>
      const revealItems = document.querySelectorAll('.reveal');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        );

        revealItems.forEach((item) => observer.observe(item));
      }
    </script>
  </body>
</html>`;
  };

  const handleDownload = async () => {
    if (!template) return;

    setShowDownloadHelp(true);
    setDownloading(true);

    try {
      const zip = new JSZip();
      zip.file('index.html', buildHtml());
      zip.file('styles.css', buildStyles());

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${getFileBase()}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({ title: 'Download failed', description: error.message, variant: 'destructive' });
    } finally {
      setDownloading(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/templates')} className="btn-ghost">
              <ArrowLeft className="w-4 h-4 mr-2" /> Templates
            </Button>
            <div className="h-6 w-px bg-border" />
            <Input
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="My Personal Website"
              className="w-48 md:w-64 input-primary text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {profile?.credits ?? 0} credits
            </span>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={handleDownload} disabled={downloading} className="btn-primary">
              {downloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Download Code
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {showPreview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <TemplatePreview template={template} content={content} showWatermark={showWatermark} />
            {showWatermark && <Watermark />}
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Tabs defaultValue="content">
                <TabsList className="grid grid-cols-2 w-full bg-muted">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="design" className="relative">
                    Design
                    {!canUseVisualEditor && (
                      <Lock className="w-3 h-3 ml-1 text-muted-foreground" />
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <div className="card-elevated p-6">
                    <ContentForm content={content} onChange={setContent} />
                  </div>
                </TabsContent>

                <TabsContent value="design" className="mt-6">
                  <div className="card-elevated p-6">
                    {canUseVisualEditor ? (
                      <VisualEditor
                        template={template}
                        onTemplateChange={setTemplate}
                        sections={sections}
                        onSectionsChange={setSections}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-2xl gradient-premium mx-auto mb-4 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-display font-bold text-xl mb-2">Pro Feature</h3>
                        <p className="text-muted-foreground mb-4">
                          Upgrade to Pro to access the visual editor with custom colors, fonts, and section reordering.
                        </p>
                        <Button onClick={() => navigate('/pricing')} className="btn-primary">
                          Upgrade to Pro
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Live Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <h3 className="font-semibold mb-3 text-muted-foreground text-sm uppercase tracking-wider">Live Preview</h3>
                <ScrollArea className="h-[calc(100vh-180px)] rounded-xl border shadow-medium">
                  <TemplatePreview template={template} content={content} isPreviewMode />
                </ScrollArea>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Dialog open={showDownloadHelp} onOpenChange={setShowDownloadHelp}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Run Your Website Locally</DialogTitle>
            <DialogDescription>
              {downloading ? 'Your zip is downloading now. Use the steps below once it finishes.' : 'Use the steps below to open and customize your site.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Quick start</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Unzip the downloaded file.</li>
                <li>Open the folder and double-click <strong>index.html</strong>.</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-foreground">Run with a local server (recommended)</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open a terminal in the unzipped folder.</li>
                <li>Run <strong>npx serve</strong> to start a local server.</li>
                <li>Open the URL shown in the terminal.</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-foreground">Customize</p>
              <p>Edit <strong>index.html</strong> and <strong>styles.css</strong> in your code editor to update text, colors, and layout.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
