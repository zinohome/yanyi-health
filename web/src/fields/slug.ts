import type { Field } from 'payload'

export const slugField = (): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: '用于 URL，建议英文小写短横线，如 self-ceo' },
})

export const statusField = (): Field => ({
  name: 'status',
  type: 'select',
  options: [
    { label: '草稿', value: 'draft' },
    { label: '已发布', value: 'published' },
  ],
  defaultValue: 'published',
  required: true,
  admin: { position: 'sidebar' },
})

export const orderField = (): Field => ({
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: '数字越小越靠前' },
})

/** 公开内容：所有人可读 */
export const publicRead = { read: () => true }
