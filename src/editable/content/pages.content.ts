import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Stories, visuals, and discoverable content',
      description: 'Explore articles, images, listings, and curated posts through a cleaner reading-first experience.',
      openGraphTitle: 'Stories, visuals, and discoverable content',
      openGraphDescription: 'Discover articles, visual posts, and connected content through a calmer reading-first experience.',
      keywords: ['story platform', 'article site', 'visual content', 'content discovery'],
    },
    hero: {
      badge: 'Latest stories and visuals',
      title: ['A thoughtful home for', 'stories, visuals, and discovery.'],
      description: 'Explore fresh articles, image-led posts, and discoverable content across the platform through a calmer and clearer browsing experience.',
      primaryCta: { label: 'Read latest stories', href: '/article' },
      secondaryCta: { label: 'Explore visuals', href: '/image' },
      searchPlaceholder: 'Search stories, visuals, listings, and more',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles, visuals, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, listings, and resources through one clearer and more connected visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About The Platform',
    title: 'A premium visual discovery experience for modern categories.',
    description: `${slot4BrandConfig.siteName} brings image-led collections, category pages, profiles, and stories into one polished browsing flow.`,
    paragraphs: [
      'We designed the experience to feel clean, rich, and easy to navigate across every section of the site.',
      'From image galleries and profiles to business categories and editorial pages, each surface is connected for smooth discovery.',
    ],
    values: [
      {
        title: 'Visual-first design',
        description: 'Layouts are structured around strong imagery with elegant spacing and consistent rhythm.',
      },
      {
        title: 'Connected sections',
        description: 'Categories, collections, profiles, and posts are linked so browsing always feels continuous.',
      },
      {
        title: 'Clear and usable',
        description: 'We keep navigation straightforward and content blocks readable on both desktop and mobile.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Let us help with your next visual or category project.',
    description: 'Share your request and we will guide you to the right path for publishing, collections, profiles, or business category expansion.',
    formTitle: 'Send a message',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
