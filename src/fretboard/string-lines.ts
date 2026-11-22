export interface StringLine {
  xAtNut: number;
  yAtNut: number;
  xAtBridge: number;
  yAtBridge: number;
}

export type StringLinesResult =
  | { ok: true; value: StringLine[] }
  | {
      ok: false;
      error: {
        code: 'INVALID-SCALE-LENGTH' | 'INVALID-STRING-COUNT' | 'INVALID-STRING-SPACING';
        message: string;
      };
    };

/**
 * Calculates string line endpoints, with spacing measured between the centers
 * of the outer strings. Distances use the same units as `scaleLength`.
 */
export const calculateStringLines = (
  scaleLength: number,
  numberOfStrings: number,
  stringSpacingAtNut: number,
  stringSpacingAtBridge: number,
): StringLinesResult => {
  if (!Number.isFinite(scaleLength) || scaleLength <= 0) {
    return {
      ok: false,
      error: {
        code: 'INVALID-SCALE-LENGTH',
        message: 'Scale length must be a positive, finite number.',
      },
    };
  }
  if (!Number.isInteger(numberOfStrings) || numberOfStrings < 2) {
    return {
      ok: false,
      error: {
        code: 'INVALID-STRING-COUNT',
        message: 'Number of strings must be an integer of at least 2.',
      },
    };
  }
  if (
    !Number.isFinite(stringSpacingAtNut) ||
    stringSpacingAtNut <= 0 ||
    !Number.isFinite(stringSpacingAtBridge) ||
    stringSpacingAtBridge <= 0
  ) {
    return {
      ok: false,
      error: {
        code: 'INVALID-STRING-SPACING',
        message: 'String spacing at the nut and bridge must be positive, finite numbers.',
      },
    };
  }

  const intervals = numberOfStrings - 1;
  const nutSpacingPerInterval = stringSpacingAtNut / intervals;
  const bridgeSpacingPerInterval = stringSpacingAtBridge / intervals;
  const nutTopStringY = -stringSpacingAtNut / 2;
  const bridgeTopStringY = -stringSpacingAtBridge / 2;

  return {
    ok: true,
    value: Array.from({ length: numberOfStrings }, (_, index) => ({
      xAtNut: 0,
      yAtNut: nutTopStringY + index * nutSpacingPerInterval,
      xAtBridge: scaleLength,
      yAtBridge: bridgeTopStringY + index * bridgeSpacingPerInterval,
    })),
  };
};
