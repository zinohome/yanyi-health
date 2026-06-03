import type { CollectionConfig } from 'payload'
import { orderField, publicRead } from '../fields/slug'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: '团队成员', plural: '团队成员' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  access: publicRead,
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'role', type: 'text', localized: true, admin: { description: '头衔 / 能力画像' } },
    { name: 'bio', type: 'textarea', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    orderField(),
  ],
}
