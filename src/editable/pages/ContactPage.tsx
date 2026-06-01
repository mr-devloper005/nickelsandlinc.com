'use client'

import { Building2, Image as ImageIcon, Mail, MapPin, Phone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: Building2, title: 'Business Projects', body: 'Tell us about your category, goals, and audience. We will suggest the best publishing direction.' },
    { icon: ImageIcon, title: 'Visual Collections', body: 'Share your image collection idea and we will help structure it for cleaner discovery.' },
    { icon: Mail, title: 'General Support', body: 'Need help with profile pages, listings, or content updates? Send us a message here.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#efefef] text-[#1f1f1f]">
        <section className="border-b border-black/10 bg-[#ececec]">
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E3B3B]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-black/70">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {lanes.map((lane) => (
                <article key={lane.title} className="rounded-md border border-black/15 bg-white p-5 shadow-sm">
                  <lane.icon className="h-5 w-5 text-[#9E3B3B]" />
                  <h2 className="mt-3 text-2xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-black/70">{lane.body}</p>
                </article>
              ))}

              <article className="rounded-md border border-black/15 bg-[#FFEAD3] p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#9E3B3B]">Quick Contact</h3>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-black/75"><Phone className="h-4 w-4" /> Business support line available on request</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-black/75"><Mail className="h-4 w-4" /> Response window: 1-2 business days</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-black/75"><MapPin className="h-4 w-4" /> Serving global category-based projects</p>
              </article>
            </div>

            <article className="rounded-md border border-black/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm leading-7 text-black/65">Share your request and we will get back with the best next step.</p>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </article>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
