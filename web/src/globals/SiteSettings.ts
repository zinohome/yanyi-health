import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '站点设置',
  access: { read: () => true },
  fields: [
    { name: 'companyName', type: 'text', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'slogan', type: 'text', localized: true },
    {
      type: 'collapsible',
      label: '联系方式',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'wechatId', type: 'text', label: '微信号' },
        { name: 'phone', type: 'text', admin: { description: '仅后台留存，默认不在页面展示' } },
        { name: 'address', type: 'text', localized: true },
        { name: 'wechatQR', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: '社交链接',
      fields: [
        { name: 'platform', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'icp', type: 'text', label: 'ICP 备案号' },
    {
      name: 'defaultMeta',
      type: 'group',
      label: '默认 SEO',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
