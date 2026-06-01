import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#efefef] text-[#1f1f1f]">
        <section className="border-b border-black/10 bg-[#ececec]">
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E3B3B]">{pagesContent.about.badge}</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-black/70">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-md border border-black/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-3xl font-semibold tracking-[-0.02em]">What We Build</h2>
              <div className="mt-5 space-y-4 text-sm leading-8 text-black/75">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="grid gap-4">
              {pagesContent.about.values.map((value) => (
                <article key={value.title} className="rounded-md border border-black/15 bg-white p-6 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9E3B3B]">Core Principle</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/70">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-md border border-black/15 bg-[#21242b] p-8 text-[#f4ece3]">
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Built for visual-first discovery</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">Our platform keeps stories, profiles, visuals, and categories connected so users can browse smoothly without context switching.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
