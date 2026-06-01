import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Register', description: 'Create your account and start building your profile and category presence.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#efefef] text-[#1f1f1f]">
        <section className="border-b border-black/10 bg-[#ececec]">
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E3B3B]">Create Account</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">Join and launch your profile presence</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/70">Register in seconds to unlock profile visibility, category-focused discovery, and a cleaner publishing workflow.</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1fr]">
            <article className="rounded-md border border-black/15 bg-[#FFEAD3] p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E3B3B]">What you get</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#1f1f1f]">A modern profile-ready account</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-black/75">
                <li>Create and access your profile dashboard</li>
                <li>Improve discoverability in key categories</li>
                <li>Manage your details with a clean interface</li>
              </ul>
            </article>

            <article className="rounded-md border border-black/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-3xl font-semibold tracking-[-0.02em]">Register</h2>
              <p className="mt-2 text-sm leading-7 text-black/65">Set your details and submit to create your account.</p>
              <EditableLocalSignupForm />
              <p className="mt-6 text-sm text-black/65">Already have an account? <Link href="/login" className="font-semibold text-[#9E3B3B] underline underline-offset-4">Sign in</Link></p>
            </article>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
