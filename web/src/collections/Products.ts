import type { CollectionConfig } from 'payload'
import { slugField, statusField, orderField, publicRead } from '../fields/slug'
import { seoField } from '../fields/seo'
import { iconField } from '../fields/link'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: '产品', plural: '产品 / 解决方案' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'scenario', 'order', 'status'] },
  access: publicRead,
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField(),
    { name: 'tagline', type: 'text', localized: true, admin: { description: '一句话定位' } },
    iconField(),
    {
      name: 'scenario',
      type: 'select',
      options: [
        { label: '健康康养', value: 'health' },
        { label: '保险', value: 'insurance' },
        { label: '校园心理', value: 'education' },
        { label: '工业', value: 'industry' },
        { label: '技术底座', value: 'platform' },
      ],
    },
    { name: 'summary', type: 'textarea', localized: true, admin: { description: '简介（卡片/列表用）' } },
    {
      name: 'problem',
      type: 'textarea',
      localized: true,
      admin: { description: '解决什么问题 / 面向场景' },
    },
    {
      name: 'features',
      type: 'array',
      label: '核心能力',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    { name: 'audience', type: 'text', localized: true, admin: { description: '目标用户' } },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    orderField(),
    statusField(),
    seoField(),
  ],
}
