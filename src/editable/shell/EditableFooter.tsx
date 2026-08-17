'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-black/10 bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            <span className="text-lg font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-5 text-center text-xs font-bold text-[var(--slot4-soft-muted-text)]">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
