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
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0;
  width: 100%;
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
  width: 100%;
  min-width: 0;
}

.measurement-unit {
  border-left: none;
  border-radius: 0 var(--input-border-radius) var(--input-border-radius) 0;
  padding: var(--input-padding);
  width: 6rem;
  appearance: none;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m1 1 5 5 5-5' fill='none' stroke='%231f1e20' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.625rem center;
}
</style>
