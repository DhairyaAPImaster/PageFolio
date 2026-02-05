import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen, Link, Image } from 'lucide-react';
import { WebsiteContent } from '@/lib/templates';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentFormProps {
  content: WebsiteContent;
  onChange: (content: WebsiteContent) => void;
}

export function ContentForm({ content, onChange }: ContentFormProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleImageUpload = (file: File | null, onLoad: (value: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoad(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...content,
      personalInfo: { ...content.personalInfo, [field]: value },
    });
  };

  const updateSocialLinks = (field: string, value: string) => {
    onChange({
      ...content,
      socialLinks: { ...content.socialLinks, [field]: value },
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange({ ...content, skills: [...content.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const updated_skills = content.skills.filter((_, i) => i !== index);
    onChange({ ...content, skills: updated_skills });
  };

  const addEducation = () => {
    const new_edu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: ''
    };
    onChange({
      ...content,
      education: [...content.education, new_edu],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated_education = content.education.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange({
      ...content,
      education: updated_education,
    });
  };

  const removeEducation = (id: string) => {
    const filtered = content.education.filter((edu) => edu.id !== id);
    onChange({ ...content, education: filtered });
  };

  const addExperience = () => {
    const new_exp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: ''
    };
    onChange({
      ...content,
      experience: [...content.experience, new_exp],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const updated_experience = content.experience.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange({
      ...content,
      experience: updated_experience,
    });
  };

  const removeExperience = (id: string) => {
    const filtered = content.experience.filter((exp) => exp.id !== id);
    onChange({ ...content, experience: filtered });
  };

  const addProject = () => {
    const new_project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      imageUrl: '',
      link: ''
    };
    onChange({
      ...content,
      projects: [...content.projects, new_project],
    });
  };

  const updateProject = (id: string, field: string, value: string | string[] | boolean) => {
    const updated_projects = content.projects.map((proj) => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    onChange({
      ...content,
      projects: updated_projects,
    });
  };

  const removeProject = (id: string) => {
    const filtered = content.projects.filter((proj) => proj.id !== id);
    onChange({ ...content, projects: filtered });
  };

  const addGalleryItem = () => {
    const new_item = {
      id: Date.now().toString(),
      imageUrl: '',
      title: '',
      category: '',
    };
    onChange({ ...content, gallery: [...(content.gallery || []), new_item] });
  };

  const updateGalleryItem = (id: string, field: string, value: string) => {
    const updated_gallery = (content.gallery || []).map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...content, gallery: updated_gallery });
  };

  const removeGalleryItem = (id: string) => {
    const updated_gallery = (content.gallery || []).filter((item) => item.id !== id);
    onChange({ ...content, gallery: updated_gallery });
  };

  const addTestimonial = () => {
    const new_testimonial = {
      id: Date.now().toString(),
      name: '',
      role: '',
      content: '',
      avatarUrl: '',
    };
    onChange({ ...content, testimonials: [...(content.testimonials || []), new_testimonial] });
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    const updated_testimonials = (content.testimonials || []).map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...content, testimonials: updated_testimonials });
  };

  const removeTestimonial = (id: string) => {
    const updated_testimonials = (content.testimonials || []).filter((item) => item.id !== id);
    onChange({ ...content, testimonials: updated_testimonials });
  };

  const addStat = () => {
    const new_stat = {
      id: Date.now().toString(),
      value: '',
      label: '',
    };
    onChange({ ...content, stats: [...(content.stats || []), new_stat] });
  };

  const updateStat = (id: string, field: string, value: string) => {
    const updated_stats = (content.stats || []).map((stat) => {
      if (stat.id === id) {
        return { ...stat, [field]: value };
      }
      return stat;
    });
    onChange({ ...content, stats: updated_stats });
  };

  const removeStat = (id: string) => {
    const updated_stats = (content.stats || []).filter((stat) => stat.id !== id);
    onChange({ ...content, stats: updated_stats });
  };

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-6 w-full mb-6 bg-muted">
        <TabsTrigger value="personal" className="text-xs sm:text-sm flex items-center gap-1">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Personal</span>
        </TabsTrigger>
        <TabsTrigger value="experience" className="text-xs sm:text-sm flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span className="hidden sm:inline">Work</span>
        </TabsTrigger>
        <TabsTrigger value="education" className="text-xs sm:text-sm flex items-center gap-1">
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">Education</span>
        </TabsTrigger>
        <TabsTrigger value="skills" className="text-xs sm:text-sm flex items-center gap-1">
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">Skills</span>
        </TabsTrigger>
        <TabsTrigger value="projects" className="text-xs sm:text-sm flex items-center gap-1">
          <FolderOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Projects</span>
        </TabsTrigger>
        <TabsTrigger value="extras" className="text-xs sm:text-sm flex items-center gap-1">
          <Image className="w-4 h-4" />
          <span className="hidden sm:inline">Extras</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <Input
              value={content.personalInfo.name}
              onChange={(e) => updatePersonalInfo('name', e.target.value)}
              placeholder="John Doe"
              className="input-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Tagline</label>
            <Input
              value={content.personalInfo.tagline}
              onChange={(e) => updatePersonalInfo('tagline', e.target.value)}
              placeholder="Full-Stack Developer"
              className="input-primary"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Bio</label>
          <Textarea
            value={content.personalInfo.bio}
            onChange={(e) => updatePersonalInfo('bio', e.target.value)}
            placeholder="Write a short bio about yourself..."
            className="input-primary min-h-[100px]"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              value={content.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john@example.com"
              className="input-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Phone</label>
            <Input
              value={content.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 555 123 4567"
              className="input-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Input
              value={content.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="input-primary"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Avatar Image URL</label>
            <Input
              value={content.personalInfo.avatarUrl}
              onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
              placeholder="https://..."
              className="input-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Upload Avatar</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (value) => updatePersonalInfo('avatarUrl', value))}
              className="input-primary"
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Link className="w-4 h-4" /> Social Links
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              value={content.socialLinks.twitter}
              onChange={(e) => updateSocialLinks('twitter', e.target.value)}
              placeholder="Twitter URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.linkedin}
              onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
              placeholder="LinkedIn URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.github}
              onChange={(e) => updateSocialLinks('github', e.target.value)}
              placeholder="GitHub URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.instagram}
              onChange={(e) => updateSocialLinks('instagram', e.target.value)}
              placeholder="Instagram URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.website}
              onChange={(e) => updateSocialLinks('website', e.target.value)}
              placeholder="Personal Website URL"
              className="input-primary sm:col-span-2"
            />
            <Input
              value={content.socialLinks.youtube || ''}
              onChange={(e) => updateSocialLinks('youtube', e.target.value)}
              placeholder="YouTube URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.tiktok || ''}
              onChange={(e) => updateSocialLinks('tiktok', e.target.value)}
              placeholder="TikTok URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.dribbble || ''}
              onChange={(e) => updateSocialLinks('dribbble', e.target.value)}
              placeholder="Dribbble URL"
              className="input-primary"
            />
            <Input
              value={content.socialLinks.behance || ''}
              onChange={(e) => updateSocialLinks('behance', e.target.value)}
              placeholder="Behance URL"
              className="input-primary"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        {content.experience.map((exp, index) => {
          const exp_number = index + 1;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Experience #{exp_number}</span>
                <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company" className="input-primary" />
              <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Position" className="input-primary" />
              <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Start Date (e.g., Jan 2020)" className="input-primary" />
              <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="End Date (or 'Present')" className="input-primary" />
              <Input value={exp.logo || ''} onChange={(e) => updateExperience(exp.id, 'logo', e.target.value)} placeholder="Company Logo URL" className="input-primary" />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (value) => updateExperience(exp.id, 'logo', value))}
                className="input-primary"
              />
            </div>
            <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Describe your role..." className="input-primary" />
          </motion.div>
          );
        })}
        <Button variant="outline" onClick={addExperience} className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </Button>
      </TabsContent>

      <TabsContent value="education" className="space-y-4">
        {content.education.map((edu, index) => {
          const edu_num = index + 1;
          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Education #{edu_num}</span>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Institution" className="input-primary" />
              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Degree (e.g., Bachelor's)" className="input-primary" />
              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Field of Study" className="input-primary" />
              <div className="flex gap-2">
                <Input value={edu.startYear} onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)} placeholder="Start Year" className="input-primary" />
                <Input value={edu.endYear} onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)} placeholder="End Year" className="input-primary" />
              </div>
            </div>
          </motion.div>
          );
        })}
        <Button variant="outline" onClick={addEducation} className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </Button>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            className="input-primary"
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill} className="btn-primary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill, index) => {
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-sm group"
                style={{ borderRadius: '4px' }}
              >
                {skill}
                <button onClick={() => removeSkill(index)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.span>
            );
          })}
        </div>
        {content.skills.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-4">No skills added yet. Start typing above!</p>
        )}
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        {content.projects.map((project, index) => {
          const proj_num = index + 1;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Project #{proj_num}</span>
                <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} placeholder="Project Title" className="input-primary" />
                <Input value={project.link} onChange={(e) => updateProject(project.id, 'link', e.target.value)} placeholder="Project URL" className="input-primary" />
                <Input value={project.imageUrl} onChange={(e) => updateProject(project.id, 'imageUrl', e.target.value)} placeholder="Project Image URL" className="input-primary" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (value) => updateProject(project.id, 'imageUrl', value))}
                  className="input-primary"
                />
              </div>
              <Textarea value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} placeholder="Describe your project..." className="input-primary" />
              <Input
                value={(project.tags || []).join(', ')}
                onChange={(e) => {
                  const list = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                  updateProject(project.id, 'tags', list);
                }}
                placeholder="Tags (comma separated)"
                className="input-primary"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!project.featured}
                  onChange={(e) => updateProject(project.id, 'featured', e.target.checked)}
                />
                Featured project
              </label>
            </motion.div>
          );
        })}
        <Button variant="outline" onClick={addProject} className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </TabsContent>

      <TabsContent value="extras" className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Gallery</h3>
          {(content.gallery || []).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3 mb-4"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Gallery Item #{index + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeGalleryItem(item.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input value={item.title} onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)} placeholder="Title" className="input-primary" />
                <Input value={item.category || ''} onChange={(e) => updateGalleryItem(item.id, 'category', e.target.value)} placeholder="Category" className="input-primary" />
                <Input value={item.imageUrl} onChange={(e) => updateGalleryItem(item.id, 'imageUrl', e.target.value)} placeholder="Image URL" className="input-primary" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (value) => updateGalleryItem(item.id, 'imageUrl', value))}
                  className="input-primary"
                />
              </div>
            </motion.div>
          ))}
          <Button variant="outline" onClick={addGalleryItem} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> Add Gallery Item
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Testimonials</h3>
          {(content.testimonials || []).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3 mb-4"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Testimonial #{index + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeTestimonial(item.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input value={item.name} onChange={(e) => updateTestimonial(item.id, 'name', e.target.value)} placeholder="Name" className="input-primary" />
                <Input value={item.role} onChange={(e) => updateTestimonial(item.id, 'role', e.target.value)} placeholder="Role" className="input-primary" />
                <Input value={item.avatarUrl || ''} onChange={(e) => updateTestimonial(item.id, 'avatarUrl', e.target.value)} placeholder="Avatar URL" className="input-primary" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null, (value) => updateTestimonial(item.id, 'avatarUrl', value))}
                  className="input-primary"
                />
              </div>
              <Textarea value={item.content} onChange={(e) => updateTestimonial(item.id, 'content', e.target.value)} placeholder="Testimonial text" className="input-primary" />
            </motion.div>
          ))}
          <Button variant="outline" onClick={addTestimonial} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Stats</h3>
          {(content.stats || []).map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border bg-muted/30 space-y-3 mb-4"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">Stat #{index + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeStat(stat.id)} className="text-destructive h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input value={stat.value} onChange={(e) => updateStat(stat.id, 'value', e.target.value)} placeholder="Value (e.g., 120+)" className="input-primary" />
                <Input value={stat.label} onChange={(e) => updateStat(stat.id, 'label', e.target.value)} placeholder="Label (e.g., Projects)" className="input-primary" />
              </div>
            </motion.div>
          ))}
          <Button variant="outline" onClick={addStat} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> Add Stat
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
