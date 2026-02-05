import { Template, WebsiteContent } from '@/lib/templates';
import { ExtrasSections } from './ExtrasSections';
import { Mail, MapPin, Twitter, Linkedin, Github, Instagram, Globe, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BaseRendererProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
}

export function BaseRenderer({ template, content, isPreviewMode }: BaseRendererProps) {
  const { personalInfo, socialLinks, skills, projects, education, experience } = content;

  const socialIcons = [
    { key: 'twitter', icon: Twitter, url: socialLinks.twitter },
    { key: 'linkedin', icon: Linkedin, url: socialLinks.linkedin },
    { key: 'github', icon: Github, url: socialLinks.github },
    { key: 'instagram', icon: Instagram, url: socialLinks.instagram },
    { key: 'website', icon: Globe, url: socialLinks.website },
  ];

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.font,
      }}
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold overflow-hidden"
            style={{ backgroundColor: template.colors.primary, color: template.colors.background }}
          >
            {personalInfo.avatarUrl ? (
              <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
            ) : (
              personalInfo.name?.charAt(0) || 'A'
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: template.colors.text }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl mb-5" style={{ color: template.colors.secondary }}>
            {personalInfo.tagline || 'Your Tagline'}
          </p>
          <p className="max-w-2xl mx-auto text-lg opacity-80 mb-8">
            {personalInfo.bio || 'Write a brief bio about yourself...'}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-4 h-4" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {personalInfo.location}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialIcons.map(({ key, icon: Icon, url }) => 
              url && (
                <a 
                  key={key}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ backgroundColor: template.colors.primary + '15' }}
                >
                  <Icon className="w-5 h-5" style={{ color: template.colors.primary }} />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section 
          className="py-12 px-6 md:px-12" 
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: template.colors.primary }}>Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: template.colors.primary + '15', color: template.colors.primary }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section 
          className="py-12 px-6 md:px-12" 
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div 
                  key={exp.id} 
                  className="flex gap-5 p-5 rounded-xl"
                  style={{ backgroundColor: template.colors.primary + '08' }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center font-bold"
                    style={{ backgroundColor: template.colors.primary, color: template.colors.background }}
                  >
                    {exp.company?.charAt(0) || 'C'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="font-medium" style={{ color: template.colors.secondary }}>{exp.company}</p>
                    <p className="text-sm opacity-60 mt-1">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    <p className="mt-2 text-sm opacity-80">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section 
          className="py-12 px-6 md:px-12" 
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div 
                  key={edu.id} 
                  className="flex gap-5 p-5 rounded-xl"
                  style={{ backgroundColor: template.colors.primary + '08' }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div>
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <p style={{ color: template.colors.secondary }}>{edu.institution}</p>
                    <p className="text-sm opacity-60">{edu.startYear} - {edu.endYear || 'Present'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section 
          className="py-12 px-6 md:px-12" 
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="rounded-xl overflow-hidden border group hover:shadow-lg transition-shadow"
                  style={{ borderColor: template.colors.primary + '20' }}
                >
                  {project.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm opacity-80 mb-3">{project.description}</p>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80"
                        style={{ color: template.colors.primary }}
                      >
                        View Project <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ExtrasSections template={template} content={content} />

      {/* Footer */}
      <footer 
        className="py-8 px-6 text-center text-sm opacity-60" 
        style={{ borderTop: `1px solid ${template.colors.primary}15` }}
      >
        Built with Pagefolio
      </footer>
    </div>
  );
}
