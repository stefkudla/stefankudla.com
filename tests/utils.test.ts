import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges conflicting tailwind classes, last one winning', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('drops falsy values and flattens conditional inputs', () => {
    expect(cn('text-sm', false && 'hidden', ['font-bold', undefined])).toBe(
      'text-sm font-bold'
    )
  })
})
