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
        { label: '母婴安全', value: 'maternal' },
        { label: '围产期心理', value: 'perinatal' },
        { label: '儿童青少年心理', value: 'youth' },
        { label: '成人身心健康', value: 'adult' },
        { label: '运动健康与营养代谢', value: 'sports' },
        { label: '老年照护与慢病', value: 'elderly' },
        { label: '产业/行业拓展', value: 'industry' },
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
