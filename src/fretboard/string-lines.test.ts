import { describe, expect, it } from 'vitest'
import { calculateStringLines } from './string-lines.ts'

describe('calculateStringLines', () => {
  it('evenly spaces strings between the outer-string centers at the nut and bridge', () => {
    expect(calculateStringLines(25.5, 4, 1.5, 2.25)).toEqual({
      ok: true,
      value: [
        { xAtNut: 0, yAtNut: -0.75, xAtBridge: 25.5, yAtBridge: -1.125 },
        { xAtNut: 0, yAtNut: -0.25, xAtBridge: 25.5, yAtBridge: -0.375 },
        { xAtNut: 0, yAtNut: 0.25, xAtBridge: 25.5, yAtBridge: 0.375 },
        { xAtNut: 0, yAtNut: 0.75, xAtBridge: 25.5, yAtBridge: 1.125 },
      ],
    })
  })

  it('returns a validation error for an invalid scale length', () => {
    expect(calculateStringLines(0, 6, 1.5, 2.25)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-SCALE-LENGTH' },
    })
  })

  it('requires at least two strings', () => {
    expect(calculateStringLines(25.5, 1, 1.5, 2.25)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-STRING-COUNT' },
    })
  })

  it('returns a validation error for invalid outer-string spacing', () => {
    expect(calculateStringLines(25.5, 6, 0, 2.25)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-STRING-SPACING' },
    })
    expect(calculateStringLines(25.5, 6, 1.5, Number.POSITIVE_INFINITY)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-STRING-SPACING' },
    })
  })
})
