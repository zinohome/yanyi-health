import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: '表单留资', plural: '表单留资' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'intent', 'email', 'createdAt'],
  },
  access: {
    // 任何人可提交；仅登录管理员可查看/删除
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    {
      name: 'intent',
      type: 'select',
      options: [
        { label: '商务咨询', value: 'business' },
        { label: '产品试用', value: 'trial' },
        { label: '投资合作', value: 'investment' },
        { label: '加入我们', value: 'careers' },
        { label: '其他', value: 'other' },
      ],
      defaultValue: 'business',
    },
    { name: 'message', type: 'textarea' },
  ],
}
