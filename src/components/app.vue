<script setup lang="ts">
import Header from './header.vue';

import type { Settings, SettingsContext } from '../SettingsContext.ts';
import { settingsKey } from '../SettingsContext.ts';
import { provide, reactive } from 'vue';

const initialSettings: Settings = {
  scaleLength: {
    value: 25.5,
    unit: 'inch',
  },
  nutWidth: {
    value: 35.5,
    unit: 'mm',
  },
  bridgeWidth: {
    value: 52.4,
    unit: 'mm',
  },
  numberOfStrings: 6,
  numberOfFrets: 22,
  fretboardOverhang: {
    atNut: {
      value: 3.0,
      unit: 'mm',
    },
    atHeel: {
      value: 4.0,
      unit: 'mm',
    },
  },
};
const settings = reactive(initialSettings);
const updateSetting = (key, value) => {
  settings[key] = value;
};
const settingsContext: SettingsContext = {
  settings,
  updateSetting,
};

provide(settingsKey, settingsContext);
</script>

<template>
  <Header />
</template>

<style scoped></style>
