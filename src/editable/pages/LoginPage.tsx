import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Sign in to continue browsing profiles, collections, and business categories.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#efefef] text-[#1f1f1f]">
        <section className="border-b border-black/10 bg-[#ececec]">
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E3B3B]">Account Access</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">Welcome back to your dashboard</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/70">Sign in to continue exploring profile pages, category collections, and visual content with a seamless experience.</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <article className="rounded-md border border-black/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-3xl font-semibold tracking-[-0.02em]">Login</h2>
              <p className="mt-2 text-sm leading-7 text-black/65">Use your registered email and password to access your account.</p>
              <EditableLocalLoginForm />
              <p className="mt-6 text-sm text-black/65">New here? <Link href="/signup" className="font-semibold text-[#9E3B3B] underline underline-offset-4">Create an account</Link></p>
            </article>

            <article className="rounded-md border border-black/15 bg-[#21242b] p-6 text-[#f4ece3] shadow-sm sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EA7B7B]">Why sign in</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.02em]">Keep your workflow connected</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-white/80">
                <li>Manage your profile and publishing presence</li>
                <li>Access category-based content faster</li>
                <li>Continue browsing from one unified dashboard</li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
