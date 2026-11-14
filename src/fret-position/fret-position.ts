/**
 * Calculates the distance from the nut to a fret using 12-tone equal temperament.
 * The returned distance uses the same units as `scaleLength`.
 */
export type FretPositionResult =
  | { ok: true; value: number }
  | {
      ok: false
      error: {
        code: 'INVALID-FRET-NUMBER' | 'INVALID-SCALE-LENGTH'
        message: string
      }
    }

export function calculateFretPosition(
  fretNumber: number,
  scaleLength: number,
): FretPositionResult {
  if (!Number.isInteger(fretNumber) || fretNumber < 0) {
    return {
      ok: false,
      error: {
        code: 'INVALID-FRET-NUMBER',
        message: 'Fret number must be a non-negative integer.',
      },
    }
  }
  if (!Number.isFinite(scaleLength) || scaleLength <= 0) {
    return {
      ok: false,
      error: {
        code: 'INVALID-SCALE-LENGTH',
        message: 'Scale length must be a positive, finite number.',
      },
    }
  }

  return { ok: true, value: scaleLength * (1 - 2 ** (-fretNumber / 12)) }
}
