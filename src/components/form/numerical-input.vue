<script setup lang="ts">
const { id, value, min, step } = defineProps<{
  id: string;
  value: number;
  min?: number;
  step?: number | 'any';
}>();
</script>

<template>
  <input
    :id="id"
    :name="id"
    :value="value"
    type="number"
    :min="min ?? 0"
    :step="step ?? 'any'"
    inputmode="numeric"
    class="input"
  />
</template>

<style scoped>
.input {
  border-radius: var(--input-border-radius);
  border: 1px solid var(--input-border-color);
  background: white;
  color: var(--text);
  font: inherit;
  height: var(--input-height);
  padding: var(--input-padding);
  width: 100%;
  min-width: 0;
}
</style>
