import Link from 'next/link'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => {
  const raw = post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
  const decoded = raw.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
  return decoded.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="border-b border-black/10 bg-[var(--slot4-gray)]">
          <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]"><Icon className="mr-1.5 inline h-3.5 w-3.5" />{label}</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{voice?.description || SITE_CONFIG.description}</p>
            <form action={basePath} className="mt-6 grid gap-3 rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <select name="category" defaultValue={category} className="h-11 rounded-sm border border-black/15 bg-white px-3 text-sm font-medium outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="h-11 rounded-sm bg-[var(--slot4-accent-fill)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)]">Apply filter</button>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slot4-muted-text)]"><Filter className="mr-1 inline h-3 w-3" />Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-black/20 bg-[var(--slot4-surface-bg)] p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
              <h2 className="mt-4 text-3xl font-semibold">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--slot4-soft-muted-text)]">Try another category or refresh after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-sm border border-black/15 bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-semibold transition hover:bg-black/[0.03]">Previous</Link> : null}
            <span className="rounded-sm bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-semibold text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-sm border border-black/15 bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-semibold transition hover:bg-black/[0.03]">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-sm bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-md bg-[var(--slot4-panel-bg)] ring-1 ring-black/10">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-[var(--slot4-muted-text)]" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-sm bg-[var(--slot4-dark-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-dark-text)]">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-sm border border-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-semibold text-[var(--slot4-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--slot4-dark-bg)] p-5 text-[var(--slot4-dark-text)]">
          <span className="rounded-sm bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-semibold leading-[1] tracking-[-0.03em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-semibold opacity-75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-md object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-sm bg-[var(--slot4-cream)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-dark-bg)] hover:text-[var(--slot4-dark-text)] hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-sm border border-current/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-bold uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-md bg-[var(--slot4-dark-bg)] p-5 text-[var(--slot4-dark-text)]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-sm bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group overflow-hidden rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(0,0,0,0.18)]">
      <div className="relative h-24 overflow-hidden bg-[var(--slot4-accent-fill)]">
        <img src={getImages(post)[1] || avatar || '/placeholder.svg?height=240&width=800'} alt="" className="h-full w-full object-cover opacity-30" />
      </div>
      <div className="-mt-10 px-6 pb-2 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[var(--slot4-gray)]">
          {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[var(--slot4-muted-text)]" />}
        </div>
      </div>
      <div className="px-6 pb-6 text-center">
        <h2 className="text-xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
        {role ? <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{getSummary(post)}</p>
      </div>
      <div className="border-t border-black/10 bg-[var(--slot4-panel-bg)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slot4-accent-fill)]">Open profile</div>
    </Link>
  )
}
