import type { CollectionConfig } from 'payload'
import { slugField, statusField, orderField, publicRead } from '../fields/slug'
import { seoField } from '../fields/seo'
import { iconField } from '../fields/link'

// 内部 slug 沿用 'products'，对外呈现为「解决方案 Solutions」（生命全周期健康）
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: '解决方案', plural: '解决方案 Solutions' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'scenario', 'order', 'status'] },
  access: publicRead,
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField(),
    { name: 'tagline', type: 'text', localized: true, admin: { description: '一句话标题' } },
    iconField(),
    {
      name: 'scenario',
      type: 'select',
      label: '生命全周期分类',
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
    { name: 'summary', type: 'textarea', localized: true, admin: { description: '简介（卡片/列表用，一句话）' } },
    { name: 'overview', type: 'textarea', localized: true, admin: { description: '概述（详情页开篇，2-3 句）' } },
    {
      name: 'problem',
      type: 'textarea',
      localized: true,
      admin: { description: '挑战背景（详情页痛点段落）' },
    },
    {
      name: 'painPoints',
      type: 'array',
      label: '痛点',
      fields: [{ name: 'value', type: 'text', localized: true }],
    },
    {
      name: 'workflow',
      type: 'array',
      label: '方案闭环（按顺序）',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    {
      name: 'audience',
      type: 'array',
      label: '适用对象',
      fields: [{ name: 'value', type: 'text', localized: true }],
    },
    {
      name: 'features',
      type: 'array',
      label: '核心功能',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: '价值 / 成效',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    orderField(),
    statusField(),
    seoField(),
  ],
}
