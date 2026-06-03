import type { Field } from 'payload'

export const seoField = (): Field => ({
  name: 'meta',
  type: 'group',
  label: 'SEO',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
})
