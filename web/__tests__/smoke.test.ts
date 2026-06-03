import { describe, it, expect } from 'vitest'
import { routing } from '../src/i18n/routing'

describe('i18n routing', () => {
  it('supports zh and en with zh as default', () => {
    expect(routing.locales).toEqual(['zh', 'en'])
    expect(routing.defaultLocale).toBe('zh')
  })
})
