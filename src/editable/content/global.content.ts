import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Curated visual marketplace',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated visual marketplace',
    primaryLinks: [
      { label: 'Wall Art', href: '/image' },
      { label: 'Collections', href: '/article' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Join', href: '/signup' },
      secondary: { label: 'Sign In', href: '/login' },
    },
  },
  footer: {
    tagline: 'Discover art-forward stories and image collections',
    description: 'Browse image-rich collections, profiles, and editorial picks in one elegant experience.',
    columns: [
      { title: 'Explore', links: [{ label: 'Images', href: '/image' }, { label: 'Articles', href: '/article' }, { label: 'Profiles', href: '/profile' }, { label: 'Listings', href: '/listing' }] },
      { title: 'Site', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
    ],
    bottomNote: 'Built for modern visual discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
