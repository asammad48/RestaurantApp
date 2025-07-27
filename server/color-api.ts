// Mock color API endpoint for restaurant theme configuration
// This simulates what would be fetched from a real API

export interface ColorConfig {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  food: {
    deal: string;
    recommended: string;
    category: string;
  };
}

// Mock themes for different restaurant brands
const themes: { [key: string]: ColorConfig } = {
  default: {
    primary: '#16a34a', // green-600
    primaryHover: '#15803d', // green-700
    secondary: '#f3f4f6', // gray-100
    accent: '#fbbf24', // amber-400
    background: '#f9fafb', // gray-50
    surface: '#ffffff', // white
    text: {
      primary: '#111827', // gray-900
      secondary: '#374151', // gray-700
      muted: '#6b7280', // gray-500
    },
    border: '#e5e7eb', // gray-200
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444', // red-500
    food: {
      deal: '#dc2626', // red-600
      recommended: '#16a34a', // green-600
      category: '#8b5cf6', // violet-500
    },
  },
  blue: {
    primary: '#2563eb', // blue-600
    primaryHover: '#1d4ed8', // blue-700
    secondary: '#f1f5f9', // slate-100
    accent: '#f59e0b', // amber-500
    background: '#f8fafc', // slate-50
    surface: '#ffffff', // white
    text: {
      primary: '#0f172a', // slate-900
      secondary: '#334155', // slate-700
      muted: '#64748b', // slate-500
    },
    border: '#e2e8f0', // slate-200
    success: '#059669', // emerald-600
    warning: '#d97706', // amber-600
    error: '#dc2626', // red-600
    food: {
      deal: '#dc2626', // red-600
      recommended: '#2563eb', // blue-600
      category: '#7c3aed', // violet-600
    },
  },
  purple: {
    primary: '#7c3aed', // violet-600
    primaryHover: '#6d28d9', // violet-700
    secondary: '#f5f3ff', // violet-50
    accent: '#f59e0b', // amber-500
    background: '#faf5ff', // violet-25
    surface: '#ffffff', // white
    text: {
      primary: '#1e1b4b', // indigo-900
      secondary: '#4338ca', // indigo-700
      muted: '#6366f1', // indigo-500
    },
    border: '#e0e7ff', // indigo-200
    success: '#059669', // emerald-600
    warning: '#d97706', // amber-600
    error: '#dc2626', // red-600
    food: {
      deal: '#dc2626', // red-600
      recommended: '#7c3aed', // violet-600
      category: '#ec4899', // pink-500
    },
  },
};

export const getThemeColors = (themeName: string = 'default'): ColorConfig => {
  return themes[themeName] || themes.default;
};

export const getAllThemes = (): string[] => {
  return Object.keys(themes);
};