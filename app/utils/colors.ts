// Modern Color Palette for Payment Dashboard App
export const colors = {
    // Primary Colors - Modern Purple/Blue Gradient Theme
    primary: '#6366F1',        // Indigo-500
    primaryDark: '#4F46E5',    // Indigo-600
    primaryLight: '#A5B4FC',   // Indigo-300

    // Secondary Colors
    secondary: '#10B981',      // Emerald-500
    secondaryDark: '#059669',  // Emerald-600
    secondaryLight: '#6EE7B7', // Emerald-300

    // Accent Colors
    accent: '#F59E0B',         // Amber-500
    accentDark: '#D97706',     // Amber-600
    accentLight: '#FCD34D',    // Amber-300

    // Status Colors
    success: '#10B981',        // Emerald-500
    warning: '#F59E0B',        // Amber-500
    error: '#EF4444',          // Red-500
    info: '#3B82F6',           // Blue-500

    // Neutral Colors
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',

    // Background Colors
    background: '#F8FAFC',     // Slate-50
    cardBackground: '#FFFFFF',
    headerBackground: '#6366F1',

    // Text Colors
    textPrimary: '#111827',    // Gray-900
    textSecondary: '#6B7280',  // Gray-500
    textLight: '#9CA3AF',      // Gray-400
    textOnPrimary: '#FFFFFF',

    // Border Colors
    border: '#E5E7EB',         // Gray-200
    borderFocus: '#6366F1',    // Primary

    // Shadow Colors
    shadowLight: 'rgba(99, 102, 241, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.1)',
} as const;

// Gradient definitions
export const gradients = {
    primary: ['#6366F1', '#8B5CF6'],     // Indigo to Violet
    secondary: ['#10B981', '#059669'],    // Emerald gradient
    warm: ['#F59E0B', '#EF4444'],        // Amber to Red
    cool: ['#3B82F6', '#6366F1'],        // Blue to Indigo
} as const;

export default colors;
