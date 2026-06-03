import type { CollectionConfig } from 'payload'
import { orderField, publicRead } from '../fields/slug'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: '合作伙伴', plural: '合作伙伴' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'tier', 'order'] },
  access: publicRead,
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'url', type: 'text' },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: '战略', value: 'strategic' },
        { label: '生态', value: 'ecosystem' },
      ],
      defaultValue: 'ecosystem',
    },
    orderField(),
  ],
}
