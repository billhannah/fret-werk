<script setup lang="ts">
import FormField from './form-field.vue';
import DistanceInput from './distance-input.vue';
import { inject } from 'vue';
import { settingsKey } from '../../SettingsContext.ts';
import NumericalInput from './numerical-input.vue';
import scaleLengthHelp from '../help/scale-length-help.fragment.html?raw';
import nutWidthHelp from '../help/nut-width-help.fragment.html?raw';
import bridgeWidthHelp from '../help/bridge-width-help.fragment.html?raw';

const settingsContext = inject(settingsKey);
if (!settingsContext) {
  throw new Error('Settings context was not provided.');
}

const updateNumberSetting = (key: 'numberOfFrets' | 'numberOfStrings', event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }

  const value = event.target.valueAsNumber;
  if (Number.isFinite(value)) {
    settingsContext.updateSettings(key, value);
  }
};
</script>

<template>
  <form class="settings-form" @submit.prevent>
    <FormField for="scale-length" label="Scale Length" :help-text="scaleLengthHelp">
      <DistanceInput
        id="scale-length"
        :value="settingsContext.settings.scaleLength"
        label="Scale Length"
        @update:value="settingsContext.updateSettings('scaleLength', $event)"
      />
    </FormField>
    <FormField for="nut-width" label="Nut Width" :help-text="nutWidthHelp">
      <DistanceInput
        id="nut-width"
        :value="settingsContext.settings.nutWidth"
        label="Nut Width"
        @update:value="settingsContext.updateSettings('nutWidth', $event)"
      />
    </FormField>
    <FormField for="bridge-width" label="Bridge width" :help-text="bridgeWidthHelp">
      <DistanceInput
        id="bridge-width"
        :value="settingsContext.settings.bridgeWidth"
        label="Bridge Width"
        @update:value="settingsContext.updateSettings('bridgeWidth', $event)"
      />
    </FormField>
    <FormField label="Number of Frets" for="number-of-frets">
      <NumericalInput
        id="number-of-frets"
        :min="1"
        :value="settingsContext.settings.numberOfFrets"
        @input="updateNumberSetting('numberOfFrets', $event)"
      />
    </FormField>
    <FormField label="Number of Strings" for="number-of-strings">
      <NumericalInput
        id="number-of-strings"
        :min="2"
        :step="1"
        :value="settingsContext.settings.numberOfStrings"
        @input="updateNumberSetting('numberOfStrings', $event)"
      />
    </FormField>
    <FormField
      label="Fretboard Overhang at Nut"
      for="fretboard-overhang-at-nut"
      help-text="TODO: Add description."
    >
      <DistanceInput
        id="fretboard-overhang-at-nut"
        :value="settingsContext.settings.fretboardOverhang.atNut"
        label="Fretboard Overhang at Nut"
        @update:value="
          settingsContext.updateSettings('fretboardOverhang', {
            ...settingsContext.settings.fretboardOverhang,
            atNut: $event,
          })
        "
      />
    </FormField>
    <FormField
      label="Fretboard Overhang at Heel"
      for="fretboard-overhang-at-heel"
      help-text="TODO: Add description."
    >
      <DistanceInput
        id="fretboard-overhang-at-heel"
        :value="settingsContext.settings.fretboardOverhang.atHeel"
        label="Fretboard Overhang at Heel"
        @update:value="
          settingsContext.updateSettings('fretboardOverhang', {
            ...settingsContext.settings.fretboardOverhang,
            atHeel: $event,
          })
        "
      />
    </FormField>
  </form>
</template>

<style scoped>
.settings-form {
  padding: 0 1.5rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
}
</style>
