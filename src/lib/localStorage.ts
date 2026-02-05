import { WebsiteContent } from './templates';

const STORAGE_KEY = 'pagefolio_draft';
const TEMPLATE_KEY = 'pagefolio_selected_template';

export const saveContentDraft = (content: WebsiteContent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
};

export const loadContentDraft = (): WebsiteContent | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load draft:', error);
  }
  return null;
};

export const clearContentDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
};

export const saveSelectedTemplate = (templateId: string) => {
  try {
    localStorage.setItem(TEMPLATE_KEY, templateId);
  } catch (error) {
    console.error('Failed to save template selection:', error);
  }
};

export const loadSelectedTemplate = (): string | null => {
  try {
    return localStorage.getItem(TEMPLATE_KEY);
  } catch (error) {
    console.error('Failed to load template selection:', error);
    return null;
  }
};

export const clearSelectedTemplate = () => {
  try {
    localStorage.removeItem(TEMPLATE_KEY);
  } catch (error) {
    console.error('Failed to clear template selection:', error);
  }
};
