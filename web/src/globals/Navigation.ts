import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: '导航栏',
  access: { read: () => true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: '导航菜单',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA 按钮',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: '页脚',
  access: { read: () => true },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: '链接分栏',
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    { name: 'copyright', type: 'text', localized: true },
  ],
}
