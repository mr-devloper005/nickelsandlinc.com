import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-black/10 bg-[#1f2128] text-[#f3ede6]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src="/favico.png" alt={SITE_CONFIG.name} className="h-10 w-10 rounded-sm object-contain" />
            <p className="text-3xl font-light tracking-tight text-[#EA7B7B]">{SITE_CONFIG.name}</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#d7d3cd]">Curated visuals, editorial picks, and profile showcases in one continuous browsing experience.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Site</p>
          <div className="mt-4 grid gap-2">
            <Link href="/about" className="text-sm text-[#efe7dc] hover:text-white">About</Link>
            <Link href="/contact" className="text-sm text-[#efe7dc] hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">(c) {year} {SITE_CONFIG.name}</div>
    </footer>
  )
}
