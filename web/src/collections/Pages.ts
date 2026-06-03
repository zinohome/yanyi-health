import type { CollectionConfig } from 'payload'
import { layoutBlocks } from '../blocks/blocks'
import { slugField, statusField, publicRead } from '../fields/slug'
import { seoField } from '../fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: '页面', plural: '页面' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status'] },
  access: publicRead,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
    statusField(),
    {
      name: 'layout',
      type: 'blocks',
      label: '页面区块',
      blocks: layoutBlocks,
    },
    seoField(),
  ],
}
