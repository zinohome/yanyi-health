import type { CollectionConfig } from 'payload'
import { slugField, statusField, orderField, publicRead } from '../fields/slug'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: '招聘岗位', plural: '招聘岗位' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'department', 'location', 'status'] },
  access: publicRead,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
    {
      name: 'department',
      type: 'select',
      options: [
        { label: '研发', value: 'engineering' },
        { label: '算法', value: 'ai' },
        { label: '产品', value: 'product' },
        { label: '设计', value: 'design' },
        { label: '商务', value: 'business' },
        { label: '运营', value: 'operations' },
      ],
    },
    { name: 'location', type: 'text', localized: true, admin: { description: '如 北京 / 远程' } },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: '全职', value: 'fulltime' },
        { label: '实习', value: 'intern' },
        { label: '兼职', value: 'parttime' },
      ],
      defaultValue: 'fulltime',
    },
    { name: 'description', type: 'richText', localized: true },
    orderField(),
    statusField(),
  ],
}
