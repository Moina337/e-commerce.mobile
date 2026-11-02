export const BrandColors = {
  white: '#FFFFFF',
  charcoal: '#111827',
  stone: '#F7F2EB',
  sand: '#D6C7B4',
  copper: '#B7783E',
  slate: '#64748B',
  line: '#E5E7EB',
  softShadow: '#E7E2D8',
  black: '#000000',
  cream: '#F4E6D0',
} as const;

export const BrandFonts = {
  display: 'Manrope-Bold',
  body: 'Manrope-Regular',
} as const;

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#475569',
    background: '#FFFFFF',
    backgroundElement: '#F3F4F6',
    backgroundSelected: '#E5E7EB',
    border: '#D1D5DB',
    tint: '#2F95DC',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#111827',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#CBD5E1',
    background: '#151718',
    backgroundElement: '#1F2937',
    backgroundSelected: '#374151',
    border: '#374151',
    tint: '#FFFFFF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = {
  sans: 'System',
  mono: 'Courier New',
} as const;

export const Spacing = {
  half: 6,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
} as const;

export const BottomTabInset = 0;
export const MaxContentWidth = 960;
