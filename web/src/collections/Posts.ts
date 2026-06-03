import type { CollectionConfig } from 'payload'
import { slugField, statusField, publicRead } from '../fields/slug'
import { seoField } from '../fields/seo'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: '文章', plural: '资讯 / Blog' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', 'status'] },
  access: publicRead,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'content', type: 'richText', localized: true },
    { name: 'author', type: 'text', localized: true, admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    statusField(),
    seoField(),
  ],
}
