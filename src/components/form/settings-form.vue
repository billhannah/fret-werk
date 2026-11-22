<script setup lang="ts">
import FormField from './form-field.vue';
import DistanceInput from './distance-input.vue';
import { inject } from 'vue';
import { settingsKey } from '../../SettingsContext.ts';

const settingsContext = inject(settingsKey);
if (!settingsContext) {
  throw new Error('Settings context was not provided.');
}
</script>

<template>
  <form class="settings-form">
    <FormField for="scale-length" label="Scale Length">
      <DistanceInput
        id="scale-length"
        :value="settingsContext.settings.scaleLength"
        label="Scale Length"
        @update:value="settingsContext.updateSettings('scaleLength', $event)"
      />
    </FormField>
  </form>
</template>

<style scoped>
.settings-form {
  padding: 0 1.5rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
