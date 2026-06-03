import type { CollectionConfig } from 'payload'
import { slugField, publicRead } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: '分类', plural: '文章分类' },
  admin: { useAsTitle: 'title' },
  access: publicRead,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
  ],
}
