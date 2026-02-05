import { Template, WebsiteContent } from '@/lib/templates';
import { ExternalLink, Phone } from 'lucide-react';

interface ExtrasSectionsProps {
  template: Template;
  content: WebsiteContent;
}

export function ExtrasSections({ template, content }: ExtrasSectionsProps) {
  const { personalInfo, socialLinks, education, experience, projects, gallery, testimonials, stats } = content;

  const extraLinks = [
    { label: 'YouTube', url: socialLinks.youtube },
    { label: 'TikTok', url: socialLinks.tiktok },
    { label: 'Dribbble', url: socialLinks.dribbble },
    { label: 'Behance', url: socialLinks.behance },
  ].filter((item) => item.url);

  const hasExtras = extraLinks.length > 0 || !!personalInfo.phone;

  return (
    <>
      {(stats && stats.length > 0) && (
        <section
          className="py-12 px-6 md:px-12"
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Stats</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-6 border text-center"
                  style={{ borderColor: template.colors.primary + '25', backgroundColor: template.colors.primary + '08', borderRadius: '8px' }}
                >
                  <div className="text-3xl font-bold" style={{ color: template.colors.primary }}>{stat.value}</div>
                  <div className="text-sm opacity-70 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(testimonials && testimonials.length > 0) && (
        <section
          className="py-12 px-6 md:px-12"
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-6 border"
                  style={{ borderColor: template.colors.primary + '25', backgroundColor: template.colors.primary + '08', borderRadius: '8px' }}
                >
                  <p className="text-sm opacity-80 mb-4">“{testimonial.content}”</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-10 h-10 object-cover" style={{ borderRadius: '50%' }} />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center font-bold"
                        style={{ backgroundColor: template.colors.primary, color: template.colors.background, borderRadius: '50%' }}
                      >
                        {testimonial.name?.charAt(0) || 'T'}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-xs opacity-60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(gallery && gallery.length > 0) && (
        <section
          className="py-12 px-6 md:px-12"
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>Gallery</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {gallery.map((item) => (
                <div key={item.id} className="overflow-hidden border" style={{ borderColor: template.colors.primary + '25', borderRadius: '8px' }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 text-sm font-medium">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasExtras && (
        <section
          className="py-12 px-6 md:px-12"
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: template.colors.primary }}>More Links</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {personalInfo.phone}
                </span>
              )}
              {extraLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:opacity-80"
                >
                  <ExternalLink className="w-4 h-4" /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {(education.length > 0 || experience.length > 0 || projects.length > 0) && (
        <section
          className="py-12 px-6 md:px-12"
          style={{ borderTop: `1px solid ${template.colors.primary}15` }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: template.colors.primary }}>All Details</h2>

            {education.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Education Details</h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="p-4 border" style={{ borderColor: template.colors.primary + '25', borderRadius: '8px' }}>
                      <div className="font-semibold">{edu.degree} in {edu.field}</div>
                      <div className="text-sm opacity-70">{edu.institution}</div>
                      <div className="text-xs opacity-60">{edu.startYear} - {edu.endYear || 'Present'}</div>
                      {edu.description && <p className="text-sm opacity-80 mt-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experience.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Experience Details</h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="p-4 border" style={{ borderColor: template.colors.primary + '25', borderRadius: '8px' }}>
                      <div className="flex items-center gap-3">
                        {exp.logo && (
                          <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-cover" style={{ borderRadius: '6px' }} />
                        )}
                        <div>
                          <div className="font-semibold">{exp.position}</div>
                          <div className="text-sm opacity-70">{exp.company}</div>
                        </div>
                      </div>
                      <div className="text-xs opacity-60 mt-2">{exp.startDate} - {exp.endDate || 'Present'}</div>
                      <p className="text-sm opacity-80 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 border" style={{ borderColor: template.colors.primary + '25', borderRadius: '8px' }}>
                      {project.imageUrl && (
                        <div className="aspect-video overflow-hidden mb-3" style={{ borderRadius: '6px' }}>
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="font-semibold">{project.title}</div>
                      <p className="text-sm opacity-80 mt-1">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 border" style={{ borderColor: template.colors.primary + '40', borderRadius: '4px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.featured && (
                        <div className="text-xs font-semibold mt-2" style={{ color: template.colors.primary }}>Featured</div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 mt-2"
                          style={{ color: template.colors.primary }}
                        >
                          Visit <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}