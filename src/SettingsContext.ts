import type { InjectionKey } from 'vue';

export type lengthUnit = 'mm' | 'inch';
export type length = {
    value: number;
    unit: lengthUnit;
};

export interface Settings {
    scaleLength: length
    nutWidth: length
    bridgeWidth: length
    numberOfStrings: number
    numberOfFrets: number
    fretboardOverhang: {
        atNut: length
        atHeel: length
    }
}

export interface SettingsContext {
    settings: Settings
    updateSettings: <K extends keyof Settings>(
        key: K,
        value: Settings[K]
    ) => void
}

const settingsKey: InjectionKey<SettingsContext> = Symbol('settings');

export { settingsKey };
