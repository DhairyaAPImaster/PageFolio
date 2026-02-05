import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, GripVertical, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { Template } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const fontOptions = [
  'Inter', 'Space Grotesk', 'Playfair Display', 'Poppins', 'Roboto', 
  'Lora', 'Montserrat', 'Open Sans', 'Nunito', 'JetBrains Mono', 
  'Fira Code', 'Merriweather', 'Source Sans Pro', 'DM Sans', 'Quicksand'
];

const colorPresets = [
  { name: 'Ocean', primary: '#2563eb', secondary: '#3b82f6', background: '#ffffff', text: '#1e293b' },
  { name: 'Forest', primary: '#059669', secondary: '#10b981', background: '#ffffff', text: '#1f2937' },
  { name: 'Sunset', primary: '#ea580c', secondary: '#f97316', background: '#fff7ed', text: '#1f2937' },
  { name: 'Purple', primary: '#7c3aed', secondary: '#8b5cf6', background: '#ffffff', text: '#1f2937' },
  { name: 'Rose', primary: '#e11d48', secondary: '#f43f5e', background: '#fff1f2', text: '#1f2937' },
  { name: 'Dark', primary: '#f8fafc', secondary: '#94a3b8', background: '#0f172a', text: '#f8fafc' },
  { name: 'Noir', primary: '#ffffff', secondary: '#a1a1aa', background: '#09090b', text: '#fafafa' },
  { name: 'Mint', primary: '#14b8a6', secondary: '#2dd4bf', background: '#f0fdfa', text: '#134e4a' },
];

interface Section {
  id: string;
  name: string;
  visible: boolean;
}

interface VisualEditorProps {
  template: Template;
  onTemplateChange: (template: Template) => void;
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

export function VisualEditor({ template, onTemplateChange, sections, onSectionsChange }: VisualEditorProps) {
  const updateColors = (colors: Partial<Template['colors']>) => {
    onTemplateChange({
      ...template,
      colors: { ...template.colors, ...colors },
    });
  };

  const updateFont = (font: string) => {
    onTemplateChange({ ...template, font });
  };

  const toggleSection = (id: string) => {
    const updated_sections = sections.map((s) => {
      if (s.id === id) {
        return { ...s, visible: !s.visible };
      }
      return s;
    });
    onSectionsChange(updated_sections);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    let newIndex;
    if (direction === 'up') {
      newIndex = index - 1;
    } else {
      newIndex = index + 1;
    }
    
    if (newIndex < 0 || newIndex >= sections.length) {
      return;
    }
    
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[newIndex];
    newSections[newIndex] = temp;
    onSectionsChange(newSections);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="flex items-center gap-2 font-semibold">
          <Palette className="w-4 h-4" /> Color Palette
        </Label>
        
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateColors(preset)}
              className="p-2 border hover:border-primary transition-colors text-left"
              style={{ backgroundColor: preset.background, borderRadius: '4px' }}
            >
              <div className="flex gap-1 mb-1">
                <div className="w-4 h-4" style={{ backgroundColor: preset.primary, borderRadius: '50%' }} />
                <div className="w-4 h-4" style={{ backgroundColor: preset.secondary, borderRadius: '50%' }} />
              </div>
              <span className="text-xs" style={{ color: preset.text }}>{preset.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Primary</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={template.colors.primary}
                onChange={(e) => updateColors({ primary: e.target.value })}
                className="w-8 h-8 cursor-pointer"
                style={{ borderRadius: '4px' }}
              />
              <span className="text-xs font-mono">{template.colors.primary}</span>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Secondary</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={template.colors.secondary}
                onChange={(e) => updateColors({ secondary: e.target.value })}
                className="w-8 h-8 cursor-pointer"
                style={{ borderRadius: '4px' }}
              />
              <span className="text-xs font-mono">{template.colors.secondary}</span>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Background</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={template.colors.background}
                onChange={(e) => updateColors({ background: e.target.value })}
                className="w-8 h-8 cursor-pointer"
                style={{ borderRadius: '4px' }}
              />
              <span className="text-xs font-mono">{template.colors.background}</span>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Text</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={template.colors.text}
                onChange={(e) => updateColors({ text: e.target.value })}
                className="w-8 h-8 cursor-pointer"
                style={{ borderRadius: '4px' }}
              />
              <span className="text-xs font-mono">{template.colors.text}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2 font-semibold">
          <Type className="w-4 h-4" /> Font Family
        </Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {fontOptions.map((font) => {
            const isSelected = template.font === font;
            let btnClass = 'p-2 border text-left text-sm transition-colors';
            if (isSelected) {
              btnClass += ' border-primary bg-primary/5';
            } else {
              btnClass += ' hover:border-muted-foreground/50';
            }
            return (
              <button
                key={font}
                onClick={() => updateFont(font)}
                className={btnClass}
                style={{ fontFamily: font, borderRadius: '4px' }}
              >
                {font}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2 font-semibold">
          <GripVertical className="w-4 h-4" /> Section Order
        </Label>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              layout
              className="flex items-center gap-2 p-2 bg-muted/50 border"
              style={{ borderRadius: '4px' }}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
              <span className="flex-1 text-sm font-medium">{section.name}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="h-7 w-7 p-0"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                  className="h-7 w-7 p-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection(section.id)}
                  className="h-7 w-7 p-0"
                >
                  {section.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
