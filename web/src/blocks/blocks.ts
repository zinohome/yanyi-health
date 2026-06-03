import type { Block } from 'payload'
import { linkField, iconField } from '../fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero 首屏', plural: 'Hero 首屏' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'textarea', localized: true, required: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    linkField('primaryCta', '主按钮'),
    linkField('secondaryCta', '次按钮'),
  ],
}

export const ValuePropsBlock: Block = {
  slug: 'valueProps',
  interfaceName: 'ValuePropsBlock',
  labels: { singular: '价值主张', plural: '价值主张' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const TechArchitectureBlock: Block = {
  slug: 'techArchitecture',
  interfaceName: 'TechArchitectureBlock',
  labels: { singular: '技术架构图', plural: '技术架构图' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'domains',
      type: 'array',
      maxRows: 6,
      fields: [
        iconField(),
        { name: 'name', type: 'text', localized: true },
        { name: 'role', type: 'text', localized: true, admin: { description: '如 大脑 / 小脑' } },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    { name: 'note', type: 'text', localized: true },
  ],
}

export const CapabilityGridBlock: Block = {
  slug: 'capabilityGrid',
  interfaceName: 'CapabilityGridBlock',
  labels: { singular: '能力卡片网格', plural: '能力卡片网格' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'capabilities',
      type: 'array',
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const ScenarioShowcaseBlock: Block = {
  slug: 'scenarioShowcase',
  interfaceName: 'ScenarioShowcaseBlock',
  labels: { singular: 'AI 场景展示', plural: 'AI 场景展示' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'scenarios',
      type: 'array',
      fields: [
        iconField(),
        { name: 'name', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        linkField('link', '了解更多'),
      ],
    },
  ],
}

export const ProductMatrixBlock: Block = {
  slug: 'productMatrix',
  interfaceName: 'ProductMatrixBlock',
  labels: { singular: '产品矩阵', plural: '产品矩阵' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: '留空则自动展示全部产品（按排序）' },
    },
  ],
}

export const StatsMetricsBlock: Block = {
  slug: 'statsMetrics',
  interfaceName: 'StatsMetricsBlock',
  labels: { singular: '数据指标', plural: '数据指标' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'stats',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', admin: { description: '如 <300ms、1000+' } },
        { name: 'label', type: 'text', localized: true },
      ],
    },
  ],
}

export const CaseHighlightsBlock: Block = {
  slug: 'caseHighlights',
  interfaceName: 'CaseHighlightsBlock',
  labels: { singular: '精选案例', plural: '精选案例' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'cases',
      type: 'relationship',
      relationTo: 'cases',
      hasMany: true,
      admin: { description: '留空则自动展示最新案例' },
    },
  ],
}

export const LogoWallBlock: Block = {
  slug: 'logoWall',
  interfaceName: 'LogoWallBlock',
  labels: { singular: '合作伙伴墙', plural: '合作伙伴墙' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      admin: { description: '留空则自动展示全部合作伙伴' },
    },
  ],
}

export const ContentMediaBlock: Block = {
  slug: 'contentMedia',
  interfaceName: 'ContentMediaBlock',
  labels: { singular: '图文块', plural: '图文块' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'media', type: 'upload', relationTo: 'media' },
    {
      name: 'mediaPosition',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'right',
    },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: { singular: '发展历程', plural: '发展历程' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'milestones',
      type: 'array',
      fields: [
        { name: 'period', type: 'text', admin: { description: '如 2025、2026Q1' } },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const TeamPreviewBlock: Block = {
  slug: 'teamPreview',
  interfaceName: 'TeamPreviewBlock',
  labels: { singular: '团队预览', plural: '团队预览' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      admin: { description: '留空则自动展示全部成员' },
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'CTA 转化条', plural: 'CTA 转化条' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'subtitle', type: 'textarea', localized: true },
    linkField('primaryCta', '主按钮'),
    linkField('secondaryCta', '次按钮'),
  ],
}

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  labels: { singular: '富文本', plural: '富文本' },
  fields: [{ name: 'content', type: 'richText', localized: true }],
}

export const layoutBlocks: Block[] = [
  HeroBlock,
  ValuePropsBlock,
  TechArchitectureBlock,
  CapabilityGridBlock,
  ScenarioShowcaseBlock,
  ProductMatrixBlock,
  StatsMetricsBlock,
  CaseHighlightsBlock,
  LogoWallBlock,
  ContentMediaBlock,
  TimelineBlock,
  TeamPreviewBlock,
  FaqBlock,
  CtaBannerBlock,
  RichTextBlock,
]
