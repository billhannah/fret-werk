import { describe, expect, it } from 'vitest';
import { calculateFretPosition } from './fret-position.ts';

describe('calculateFretPosition', () => {
  it('returns zero for the nut (fret 0)', () => {
    expect(calculateFretPosition(0, 25.5)).toEqual({ ok: true, value: 0 });
  });

  it('returns half the scale length at the 12th fret', () => {
    expect(calculateFretPosition(12, 25.5)).toEqual({ ok: true, value: 12.75 });
  });

  it('calculates an intermediate fret using equal temperament', () => {
    const result = calculateFretPosition(5, 25.5);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(6.3965847698, 10);
    }
  });

  it('returns the distance using the scale length unit', () => {
    const result = calculateFretPosition(1, 25.5);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(1.431, 3);
    }
  });

  it('returns a validation error for invalid fret numbers', () => {
    expect(calculateFretPosition(-1, 25.5)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-FRET-NUMBER' },
    });
    expect(calculateFretPosition(1.5, 25.5)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-FRET-NUMBER' },
    });
  });

  it('returns a validation error for invalid scale lengths', () => {
    expect(calculateFretPosition(1, 0)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-SCALE-LENGTH' },
    });
    expect(calculateFretPosition(1, Number.POSITIVE_INFINITY)).toMatchObject({
      ok: false,
      error: { code: 'INVALID-SCALE-LENGTH' },
    });
  });
});
