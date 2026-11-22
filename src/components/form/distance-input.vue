<script setup lang="ts">
import type { length } from '../../SettingsContext.ts';
import { lengthUnits } from '../../SettingsContext.ts';
import { computed } from 'vue';
import { convertDistanceFromMM, convertDistanceToMM } from '../../lib/distance-helpers.ts';
import '../../style.css';

const { id, value, label } = defineProps<{
  id: string;
  value: length;
  label: string;
}>();

const emit = defineEmits<{
  'update:value': [value: length];
}>();

const displayLength = computed(() => convertDistanceFromMM(value.value, value.displayUnit));

const updateLength = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }

  const displayValue = event.target.valueAsNumber;
  if (!Number.isFinite(displayValue)) {
    return;
  }

  emit('update:value', {
    ...value,
    value: convertDistanceToMM(displayValue, value.displayUnit),
  });
};

const updateDisplayUnit = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) {
    return;
  }

  const selectedValue = event.target.value;
  const displayUnit = lengthUnits.find((unit) => unit === selectedValue);
  if (!displayUnit) {
    return;
  }

  emit('update:value', { ...value, displayUnit });
};
</script>

<template>
  <div class="measurement-input">
    <input
      :id="id"
      :name="id"
      type="number"
      min="0"
      step="any"
      inputmode="decimal"
      :value="displayLength"
      @input="updateLength"
      class="measurement-value"
    />
    <select
      :id="`${id}-unit`"
      :name="`${id}-unit`"
      :value="value.displayUnit"
      :aria-label="`${label} unit`"
      @change="updateDisplayUnit"
      class="measurement-unit"
    >
      <option v-for="unit in lengthUnits" :key="unit" :value="unit">
        {{ unit === 'inch' ? 'inches' : unit }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.measurement-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0;
  min-width: 0;
}

.measurement-unit,
.measurement-value {
  border: 1px solid var(--shadow-grey);
  background: white;
  color: var(--text);
  font: inherit;
  height: var(--input-height);
  padding: var(--input-padding);
}

.measurement-value {
  border-radius: var(--input-border-radius) 0 0 var(--input-border-radius);
}

.measurement-unit {
  border-left: none;
  border-radius: 0 var(--input-border-radius) var(--input-border-radius) 0;
  padding: var(--input-padding);
  background-color: transparent;
}
</style>
