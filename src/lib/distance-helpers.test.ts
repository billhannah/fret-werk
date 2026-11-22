import { describe, expect, it } from 'vitest';
import { convertDistanceFromMM, convertDistanceToMM } from './distance-helpers.ts';

describe('convertDistanceFromMM', () => {
  it('converts millimeters to millimeters', () => {
    expect(convertDistanceFromMM(25.4, 'mm')).toBe(25.4);
  });

  it('converts millimeters to centimeters and rounds to two decimal places', () => {
    expect(convertDistanceFromMM(35.56, 'cm')).toBe(3.56);
  });

  it('converts millimeters to inches and rounds to three decimal places', () => {
    expect(convertDistanceFromMM(25.4, 'inch')).toBe(1);
    expect(convertDistanceFromMM(1, 'inch')).toBe(0.039);
  });
});

describe('convertDistanceToMM', () => {
  it('converts millimeters to millimeters', () => {
    expect(convertDistanceToMM(25.4, 'mm')).toBe(25.4);
  });

  it('converts centimeters to millimeters and rounds to two decimal places', () => {
    expect(convertDistanceToMM(1.234, 'cm')).toBe(12.34);
  });

  it('converts inches to millimeters and rounds to three decimal places', () => {
    expect(convertDistanceToMM(1, 'inch')).toBe(25.4);
    expect(convertDistanceToMM(1.234, 'inch')).toBe(31.344);
  });
});
