<script setup lang="ts">
import Header from './header.vue';
import SettingsForm from './form/settings-form.vue';
import type { Settings, SettingsContext } from '../SettingsContext.ts';
import { settingsKey } from '../SettingsContext.ts';
import { provide, reactive } from 'vue';
import FretboardDrawing from '../fretboard/fretboard-drawing.vue';
import Section from './section/index.vue';

const initialSettings: Settings = {
  scaleLength: {
    value: 647.7,
    displayUnit: 'inch',
  },
  nutWidth: {
    value: 35.5,
    displayUnit: 'mm',
  },
  nutThickness: {
    value: 3.175,
    displayUnit: 'mm',
  },
  fretboardExtensionBeforeNut: {
    value: 1.524,
    displayUnit: 'mm',
  },
  bridgeWidth: {
    value: 52.4,
    displayUnit: 'mm',
  },
  numberOfStrings: 6,
  numberOfFrets: 22,
  fretboardOverhang: {
    atNut: {
      value: 3.0,
      displayUnit: 'mm',
    },
    atHeel: {
      value: 4.0,
      displayUnit: 'mm',
    },
  },
};
const settings = reactive(initialSettings);

const updateSettings: SettingsContext['updateSettings'] = (key, value) => {
  settings[key] = value;
};

const settingsContext: SettingsContext = {
  settings,
  updateSettings,
};

provide(settingsKey, settingsContext);
</script>

<template>
  <Header />
  <main class="main">
    <Section title="Fretboard Settings">
      <SettingsForm />
    </Section>
    <Section title="Fretboard Diagram">
      <FretboardDrawing />
    </Section>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  gap: 2rem;
}
</style>
