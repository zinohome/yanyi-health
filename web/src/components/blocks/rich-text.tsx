import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { RichTextBlock as T } from '@/payload-types'
import { Section } from '@/components/section'

export function RichTextBlockView({ block }: { block: T }) {
  if (!block.content) return null
  return (
    <Section>
      <div className="prose-tech mx-auto max-w-3xl">
        <LexicalRichText data={block.content as never} />
      </div>
    </Section>
  )
}
