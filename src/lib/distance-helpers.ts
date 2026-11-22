import type { lengthUnit } from '../SettingsContext.ts';

const unitConversionFactors: Record<lengthUnit, number> = {
  mm: 1,
  cm: 10,
  inch: 25.4,
};
const unitPrecision: Record<lengthUnit, number> = {
  mm: 1,
  cm: 2,
  inch: 3,
};

export const convertDistanceFromMM = (value: number, toUnit: lengthUnit) => {
  return precisionRound(value / unitConversionFactors[toUnit], unitPrecision[toUnit]);
};

export const convertDistanceToMM = (value: number, toUnit: lengthUnit) => {
  return precisionRound(value * unitConversionFactors[toUnit], unitPrecision[toUnit]);
};

const precisionRound = (value: number, precision: number): number => {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};
