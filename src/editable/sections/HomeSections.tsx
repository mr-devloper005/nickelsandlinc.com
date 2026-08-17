import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { getEditablePostImage, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function StaticImageCard({ post, label }: { post: SitePost; label: string }) {
  return (
    <article className="border border-black/10 bg-[var(--slot4-surface-bg)] p-2 shadow-sm">
      <div className="aspect-[3/4] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
      </div>
      <p className="px-2 py-3 text-center text-sm font-medium">{label}</p>
    </article>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const hero = posts[0]
  return (
    <section className="border-b border-black/10 bg-[var(--slot4-gray)]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Upload & create</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">Discover wall-worthy visuals</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-soft-muted-text)]">Browse image-rich collections, modern profiles, and editorial selections designed for continuous visual scrolling.</p>
          <div className="mt-7 flex gap-3">
            <Link href={primaryRoute} className="inline-flex items-center gap-2 border border-black/10 bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-white">Explore {taskLabel(primaryTask)} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="border border-black/10 bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold">Contact</Link>
          </div>
        </div>
        <div className="relative aspect-[16/8] overflow-hidden border border-black/10">
          <img src={hero ? getEditablePostImage(hero) : '/placeholder.svg?height=900&width=1600'} alt={hero?.title || 'Featured visual'} className="h-full w-full object-cover" />
          <div className="absolute right-[10%] top-[14%] hidden h-[55%] w-[42%] overflow-hidden bg-[var(--slot4-surface-bg)] p-3 md:block">
            <img src={posts[1] ? getEditablePostImage(posts[1]) : '/placeholder.svg?height=500&width=600'} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ posts }: HomeSectionProps) {
  const items = posts.slice(0, 10)
  if (!items.length) return null
  return (
    <section className="border-b border-black/10 bg-[var(--slot4-page-bg)]">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold">Shop By Style</h2>
        <p className="mt-3 text-center text-sm text-[var(--slot4-soft-muted-text)]">Select a style to explore image collections from across the site.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.slice(0, 5).map((post, index) => <StaticImageCard key={post.id || post.slug || index} post={post} label={post.title} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const picks = posts.slice(5, 17)
  return (
    <section className="border-b border-black/10 bg-[var(--slot4-page-bg)]">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold">Featured Collections</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {picks.slice(0, 6).map((post, index) => (
            <article key={post.id || index} className="grid overflow-hidden border border-black/10 bg-[var(--slot4-surface-bg)] shadow-sm md:grid-cols-[0.95fr_1.05fr]">
              <div className="aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]"><img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" /></div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">Collection {String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{getEditableExcerpt(post, 130)}</p>
                <Link href={postHref(primaryTask, post, primaryRoute)} className="mt-4 inline-flex text-sm font-semibold text-[var(--slot4-accent-fill)]">View details</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ posts, timeSections }: HomeSectionProps) {
  const all = timeSections.flatMap((section) => section.posts)
  const source = all.length ? all : posts
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold">Browse More Rooms</h2>
        <p className="mt-3 text-center text-sm text-[var(--slot4-soft-muted-text)]">Image cards are presented as static previews for visual browsing.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {source.slice(0, 9).map((post, index) => (
            <article key={post.id || index} className="overflow-hidden border border-black/10 bg-[var(--slot4-surface-bg)] shadow-sm">
              <div className="aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]"><img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" /></div>
              <div className="p-4">
                <h3 className="line-clamp-1 text-xl font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--slot4-soft-muted-text)]">{getEditableExcerpt(post, 90)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const imageFromPost = (post: SitePost) => {
    const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
    const fromMedia = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((value): value is string => typeof value === 'string') : []
    const fromList = Array.isArray(content.images) ? content.images.filter((value): value is string => typeof value === 'string') : []
    const singles = [content.image, content.featuredImage, content.thumbnail, content.logo, content.avatar].filter((value): value is string => typeof value === 'string')
    const all = [...fromMedia, ...fromList, ...singles].map((value) => value.trim()).filter(Boolean)
    const valid = all.find((value) => {
      const low = value.toLowerCase()
      const isUrl = value.startsWith('/') || /^https?:\/\//i.test(value)
      const looksBad = low.includes('placeholder') || low.includes('no-image') || low === '/' || low.endsWith('/placeholder.svg')
      return isUrl && !looksBad
    })
    return valid || null
  }

  const categoryOfPost = (post: SitePost) => {
    const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
    const raw =
      (typeof content.category === 'string' && content.category) ||
      (Array.isArray(post.tags) && typeof post.tags[0] === 'string' ? post.tags[0] : '') ||
      ''
    return raw ? normalizeCategory(raw) : ''
  }

  const selectedCategories = CATEGORY_OPTIONS
  const showcase = selectedCategories.map((category, index) => ({
    title: `${category.name} Collections`,
    description: `Image-led picks for ${category.name.toLowerCase()} with polished visuals and category-focused browsing.`,
    cta: `View ${category.name}`,
    slug: category.slug,
    items: posts.filter((post) => categoryOfPost(post) === category.slug && imageFromPost(post)).slice(0, 3),
  })).filter((group) => group.items.length > 0).slice(0, 6)

  return (
    <>
      <section className="bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-14 text-center sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <p className="text-5xl font-semibold">5M+</p>
            <p className="mt-2 text-sm text-white/75">Visual products viewed across diverse categories.</p>
          </div>
          <div>
            <p className="text-5xl font-semibold">100K+</p>
            <p className="mt-2 text-sm text-white/75">Creators and profiles featured in rolling collections.</p>
          </div>
          <div>
            <p className="text-5xl font-semibold">24/7</p>
            <p className="mt-2 text-sm text-white/75">Continuous discovery with image-first browsing.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--slot4-page-bg)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-0 border-y border-black/10">
            {showcase.map((group, index) => (
              <div key={group.title} className={`grid items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr] ${index > 0 ? 'border-t border-black/10' : ''}`}>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">Business Category</p>
                  <h3 className="mt-2 text-3xl font-semibold leading-tight">{group.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{group.description}</p>
                  <Link href={`${primaryRoute}?category=${group.slug}`} className="mt-5 inline-block border border-black/10 bg-[var(--slot4-surface-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[var(--slot4-dark-bg)] hover:text-[var(--slot4-dark-text)]">
                    {group.cta}
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {group.items.map((post, postIndex) => (
                    <Link key={post.id || post.slug || postIndex} href={postHref(primaryTask, post, primaryRoute)} className="group block overflow-hidden border border-black/10 bg-[var(--slot4-surface-bg)] shadow-sm">
                      <div className="aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
                        <img src={imageFromPost(post) || getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
