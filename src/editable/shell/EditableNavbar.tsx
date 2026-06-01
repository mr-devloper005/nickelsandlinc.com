'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { session, logout } = useEditableLocalAuthSession()

  const handleLogout = () => {
    logout()
    setOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f4f4]/95 text-[#222] backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[78px] items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/favico.png" alt={SITE_CONFIG.name} className="h-10 w-10 rounded-sm object-contain" />
            <span className="text-3xl font-light tracking-tight text-[#6f8fb6]">{SITE_CONFIG.name}</span>
          </Link>
          <form action="/search" className="mx-auto hidden w-full max-w-3xl md:block">
            <label className="flex items-center border border-black/20 bg-white px-3 py-2">
              <input name="q" placeholder="Search" className="w-full bg-transparent text-sm outline-none" />
              <Search className="h-4 w-4 text-black/50" />
            </label>
          </form>
          <div className="hidden items-center gap-4 lg:flex">
            {session ? (
              <>
                <span className="text-sm font-medium text-black/70">{session.name}</span>
                <button type="button" onClick={handleLogout} className="rounded border border-black/20 bg-white px-3 py-1.5 text-sm font-medium">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/signup" className="text-sm font-medium">Join</Link>
                <Link href="/login" className="text-sm font-medium">Sign In</Link>
              </>
            )}
          </div>
          <button type="button" onClick={() => setOpen((v) => !v)} className="ml-auto rounded border border-black/20 bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {open ? (
        <div className="border-t border-black/10 bg-[#f4f4f4] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-3 border border-black/20 bg-white px-3 py-2">
            <input name="q" placeholder="Search" className="w-full bg-transparent text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {session ? (
              <>
                <Link href="/" onClick={() => setOpen(false)} className="border border-black/10 bg-white px-4 py-2.5 text-sm font-medium">Home</Link>
                <button type="button" onClick={handleLogout} className="border border-black/10 bg-white px-4 py-2.5 text-left text-sm font-medium">Sign out</button>
              </>
            ) : (
              [{ label: 'Home', href: '/' }, { label: 'Join', href: '/signup' }, { label: 'Sign In', href: '/login' }].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border border-black/10 bg-white px-4 py-2.5 text-sm font-medium">{item.label}</Link>
              ))
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
