import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#efefef',
  '--slot4-page-text': '#1f1f1f',
  '--slot4-panel-bg': '#f6f6f6',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5f5f5f',
  '--slot4-soft-muted-text': '#7a7a7a',
  '--slot4-accent': '#D25353',
  '--slot4-accent-fill': '#9E3B3B',
  '--slot4-accent-soft': '#FFEAD3',
  '--slot4-dark-bg': '#21242b',
  '--slot4-dark-text': '#fffaf4',
  '--slot4-media-bg': '#dedede',
  '--slot4-cream': '#FFEAD3',
  '--slot4-warm': '#f1f1f1',
  '--slot4-lavender': '#f5e8e8',
  '--slot4-gray': '#ececec',
  '--slot4-body-gradient': 'linear-gradient(180deg,#f4f4f4 0%,#efefef 40%,#e6e6e6 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/10',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_28px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_20px_64px_rgba(0,0,0,0.2)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.6))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-14 lg:py-16',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[180px] shrink-0 snap-start sm:w-[200px]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.24em]',
    heroTitle: 'text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-md ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm bg-[var(--slot4-accent-fill)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)]`,
    secondary: `inline-flex items-center justify-center rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3 text-sm font-semibold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-sm ${editablePalette.accentBg} px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-sm ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]',
    fade: 'transition duration-300 hover:opacity-90',
  },
} as const

export const aiLayoutRules = [
  'Use clean gallery-forward blocks with dense but readable spacing.',
  'Keep all links/data behavior intact while changing visual language deeply.',
  'For image posts in editable views, render as non-clickable visual cards.',
] as const
