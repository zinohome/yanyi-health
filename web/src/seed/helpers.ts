/** 富文本：把段落数组转成 Payload Lexical 结构 */
export function rt(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
      })),
    },
  }
}

/**
 * 把 created 文档里各层 array 的 id 注入到 en 数据中（按位置匹配），
 * 以便用 locale=en 更新本地化字段时保持行结构一致。
 */
export function attachIds<T>(enVal: T, createdVal: unknown): T {
  if (Array.isArray(enVal) && Array.isArray(createdVal)) {
    return enVal.map((item, i) => {
      const created = createdVal[i]
      if (item && typeof item === 'object' && created && typeof created === 'object') {
        const merged = attachIds(item as Record<string, unknown>, created)
        if ((created as Record<string, unknown>).id != null) {
          ;(merged as Record<string, unknown>).id = (created as Record<string, unknown>).id
        }
        return merged
      }
      return item
    }) as unknown as T
  }
  if (enVal && typeof enVal === 'object' && createdVal && typeof createdVal === 'object') {
    const out: Record<string, unknown> = { ...(enVal as Record<string, unknown>) }
    for (const k of Object.keys(out)) {
      const c = (createdVal as Record<string, unknown>)[k]
      if (c !== undefined) out[k] = attachIds(out[k], c)
    }
    return out as unknown as T
  }
  return enVal
}

export type Lang = 'zh' | 'en'
export const L =
  (lang: Lang) =>
  (zh: string, en: string): string =>
    lang === 'en' ? en : zh
