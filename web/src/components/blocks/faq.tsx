import type { FaqBlock as T } from '@/payload-types'
import { Plus } from 'lucide-react'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'

export function Faq({ block }: { block: T }) {
  const items = block.items ?? []
  return (
    <Section className="border-t border-border/50">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title={block.title} align="center" />
        <div className="mt-12 flex flex-col gap-3">
          {items.map((it, i) => (
            <Reveal key={it.id ?? i} delay={i * 60}>
              <details className="group rounded-xl border border-border bg-card px-6 py-1 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium">
                  {it.question}
                  <Plus className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{it.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
