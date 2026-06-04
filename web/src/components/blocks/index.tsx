import type { Page } from '@/payload-types'

import { Hero } from './hero'
import { ValueProps } from './value-props'
import { TechArchitecture } from './tech-architecture'
import { CapabilityGrid } from './capability-grid'
import { ScenarioShowcase } from './scenario-showcase'
import { ProductMatrix } from './product-matrix'
import { StatsMetrics } from './stats-metrics'
import { CaseHighlights } from './case-highlights'
import { LogoWall } from './logo-wall'
import { ContentMedia } from './content-media'
import { Timeline } from './timeline'
import { TeamPreview } from './team-preview'
import { Faq } from './faq'
import { CtaBanner } from './cta-banner'
import { RichTextBlockView } from './rich-text'

type LayoutBlock = NonNullable<Page['layout']>[number]

export function RenderBlocks({
  blocks,
  locale,
}: {
  blocks?: Page['layout']
  locale: string
}) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block: LayoutBlock) => {
        const key = block.id ?? `${block.blockType}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} locale={locale} />
          case 'valueProps':
            return <ValueProps key={key} block={block} />
          case 'techArchitecture':
            return <TechArchitecture key={key} block={block} locale={locale} />
          case 'capabilityGrid':
            return <CapabilityGrid key={key} block={block} />
          case 'scenarioShowcase':
            return <ScenarioShowcase key={key} block={block} locale={locale} />
          case 'productMatrix':
            return <ProductMatrix key={key} block={block} locale={locale} />
          case 'statsMetrics':
            return <StatsMetrics key={key} block={block} />
          case 'caseHighlights':
            return <CaseHighlights key={key} block={block} locale={locale} />
          case 'logoWall':
            return <LogoWall key={key} block={block} locale={locale} />
          case 'contentMedia':
            return <ContentMedia key={key} block={block} />
          case 'timeline':
            return <Timeline key={key} block={block} />
          case 'teamPreview':
            return <TeamPreview key={key} block={block} locale={locale} />
          case 'faq':
            return <Faq key={key} block={block} />
          case 'ctaBanner':
            return <CtaBanner key={key} block={block} locale={locale} />
          case 'richTextBlock':
            return <RichTextBlockView key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
