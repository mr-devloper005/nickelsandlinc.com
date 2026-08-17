import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="border-b border-black/10 bg-[var(--slot4-gray)]">
          <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-soft-muted-text)]">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:p-8">
              <h2 className="text-3xl font-semibold tracking-[-0.02em]">What We Build</h2>
              <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--slot4-soft-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="grid gap-4">
              {pagesContent.about.values.map((value) => (
                <article key={value.title} className="rounded-md border border-black/10 bg-[var(--slot4-surface-bg)] p-6 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">Core Principle</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-md border border-black/10 bg-[var(--slot4-dark-bg)] p-8 text-[var(--slot4-dark-text)]">
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Built for visual-first discovery</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">Our platform keeps stories, profiles, visuals, and categories connected so users can browse smoothly without context switching.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
