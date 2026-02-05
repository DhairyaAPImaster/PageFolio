import { Template, WebsiteContent, defaultContent } from '@/lib/templates';
import { getSampleContentByCategory } from '@/lib/templates/sample-content';
import { 
  BaseRenderer, 
  ProRenderer, 
  ImmersiveRenderer,
  DeveloperRenderer,
  CreatorRenderer,
  PhotographerRenderer,
} from '@/components/templates';

interface TemplatePreviewProps {
  template: Template;
  content: WebsiteContent;
  isPreviewMode?: boolean;
  showWatermark?: boolean;
}

export function TemplatePreview({ template, content, isPreviewMode = false, showWatermark = false }: TemplatePreviewProps) {
  // Use category-specific sample content for preview mode if content is mostly empty
  const displayContent = isPreviewMode && !content.personalInfo.name 
    ? getSampleContentByCategory(template.category) 
    : content;

  // Select renderer based on template category and features
  const isProTemplate = template.isPro;
  const isImmersive = template.layout === 'immersive';

  // Category-specific renderers for specialized templates
  if (template.category === 'developer' && isProTemplate) {
    return (
      <div className="rounded-xl overflow-hidden border">
        <DeveloperRenderer 
          template={template} 
          content={displayContent} 
          isPreviewMode={isPreviewMode} 
        />
      </div>
    );
  }

  if (template.category === 'creator' && isProTemplate) {
    return (
      <div className="rounded-xl overflow-hidden border">
        <CreatorRenderer 
          template={template} 
          content={displayContent} 
          isPreviewMode={isPreviewMode} 
        />
      </div>
    );
  }

  if (template.category === 'photographer' && isProTemplate) {
    return (
      <div className="rounded-xl overflow-hidden border">
        <PhotographerRenderer 
          template={template} 
          content={displayContent} 
          isPreviewMode={isPreviewMode} 
        />
      </div>
    );
  }

  // Fallback to layout-based renderers
  if (isImmersive && isProTemplate) {
    return (
      <div className="rounded-xl overflow-hidden border">
        <ImmersiveRenderer 
          template={template} 
          content={displayContent} 
          isPreviewMode={isPreviewMode} 
        />
      </div>
    );
  }

  if (isProTemplate) {
    return (
      <div className="rounded-xl overflow-hidden border">
        <ProRenderer 
          template={template} 
          content={displayContent} 
          isPreviewMode={isPreviewMode} 
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border">
      <BaseRenderer 
        template={template} 
        content={displayContent} 
        isPreviewMode={isPreviewMode} 
      />
    </div>
  );
}

// Mini preview for template cards in gallery
export function TemplatePreviewMini({ template }: { template: Template }) {
  const isProTemplate = template.isPro;
  const isImmersive = template.layout === 'immersive';
  
  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        backgroundColor: template.colors.background,
        fontFamily: template.font,
      }}
    >
      {/* Mini Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background effects for Pro templates */}
        {isProTemplate && (
          <>
            <div 
              className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: template.colors.primary }}
            />
            <div 
              className="absolute bottom-0 left-0 w-16 h-16 rounded-full blur-xl opacity-20"
              style={{ backgroundColor: template.colors.secondary }}
            />
          </>
        )}
        
        {/* Avatar placeholder */}
        <div 
          className="w-10 h-10 rounded-full mb-2 flex items-center justify-center text-xs font-bold relative z-10"
          style={{ 
            backgroundColor: template.colors.primary, 
            color: template.colors.background,
            boxShadow: isProTemplate ? `0 4px 20px ${template.colors.primary}40` : undefined,
          }}
        >
          A
        </div>
        
        {/* Name placeholder */}
        <div 
          className="h-2.5 w-20 rounded mb-1.5 relative z-10"
          style={{ backgroundColor: template.colors.text }}
        />
        
        {/* Tagline placeholder */}
        <div 
          className="h-1.5 w-14 rounded relative z-10"
          style={{ backgroundColor: template.colors.secondary }}
        />

        {/* Social icons for Pro */}
        {isProTemplate && (
          <div className="flex gap-1 mt-2 relative z-10">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: template.colors.primary + '30' }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Skills section preview */}
      <div 
        className="py-2 px-3"
        style={{ borderTop: `1px solid ${template.colors.primary}15` }}
      >
        <div className="flex flex-wrap gap-1 justify-center">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="h-1.5 rounded-full"
              style={{ 
                width: `${20 + i * 8}px`,
                backgroundColor: template.colors.primary + '30',
              }}
            />
          ))}
        </div>
      </div>

      {/* Projects section preview */}
      <div 
        className="py-2 px-3"
        style={{ borderTop: `1px solid ${template.colors.primary}15` }}
      >
        <div className="flex gap-1.5">
          {[1, 2].map((i) => (
            <div 
              key={i}
              className="flex-1 h-8 rounded"
              style={{ backgroundColor: template.colors.primary + '15' }}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlay for immersive templates */}
      {isImmersive && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${template.colors.primary}10 0%, transparent 50%, ${template.colors.secondary}10 100%)`,
          }}
        />
      )}
    </div>
  );
}
