/**
 * SOLVIXBIT — Visual Identity System Configuration
 * Premium Creative Technology & Software Engineering Agency
 */

export const brandColors = {
  primaryBlue: {
    hex: '#598BFF',
    rgb: '89, 139, 255',
    description: 'Primary action color, links, key visual highlights',
  },
  secondaryGreen: {
    hex: '#02C415',
    rgb: '2, 196, 21',
    description: 'Secondary accents, success states, selected highlights',
  },
  lightGrey: {
    hex: '#EFEFEF',
    rgb: '239, 239, 239',
    description: 'Main background tint, editorial contrast bands, subtle cards',
  },
  black: {
    hex: '#000000',
    rgb: '0, 0, 0',
    description: 'Strong headings, typography, high-contrast dark sections',
  },
  white: {
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    description: 'Crisp bright canvas, light mode base',
  },
} as const;

export const visualIdentity = {
  brandColors,
  typography: {
    heading: 'Plus Jakarta Sans',
    body: 'Inter',
  },
  personality: [
    'Creative',
    'Intelligent',
    'Confident',
    'Modern',
    'Reliable',
    'Human',
    'Business-focused',
  ] as const,
} as const;

export default visualIdentity;
