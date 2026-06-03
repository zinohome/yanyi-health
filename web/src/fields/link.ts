import type { Field } from 'payload'

/** 可复用链接字段：label 本地化 + href */
export const linkField = (name = 'link', label = '链接'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'label', type: 'text', localized: true },
    { name: 'href', type: 'text', admin: { description: '相对路径如 /products 或完整 URL' } },
  ],
})

/** 图标选择（基于 lucide 图标名，前端按名渲染） */
export const iconField = (name = 'icon'): Field => ({
  name,
  type: 'select',
  options: [
    'brain', 'cpu', 'database', 'mic', 'wrench', 'network', 'shield', 'sparkles',
    'heart', 'activity', 'graduation-cap', 'factory', 'building-2', 'rocket',
    'zap', 'lock', 'users', 'layers', 'bot', 'message-circle', 'gauge', 'workflow',
  ],
  defaultValue: 'sparkles',
})
