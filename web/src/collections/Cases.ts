import type { CollectionConfig } from 'payload'
import { slugField, statusField, orderField, publicRead } from '../fields/slug'
import { seoField } from '../fields/seo'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: '案例', plural: '案例' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'industry', 'order', 'status'] },
  access: publicRead,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
    { name: 'client', type: 'text', localized: true, admin: { description: '客户（可匿名，如「某头部港险机构」）' } },
    {
      name: 'industry',
      type: 'select',
      options: [
        { label: '健康康养', value: 'health' },
        { label: '保险', value: 'insurance' },
        { label: '校园心理', value: 'education' },
        { label: '工业', value: 'industry' },
      ],
    },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'metrics',
      type: 'array',
      label: '成效指标',
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    { name: 'relatedProduct', type: 'relationship', relationTo: 'products' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    orderField(),
    statusField(),
    seoField(),
  ],
}
