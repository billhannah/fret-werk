<script setup lang="ts">
import Help from '../help/index.vue';

const props = defineProps<{
  label: string;
  for: string;
  helpText?: string;
}>();
</script>

<template>
  <div class="form-field">
    <div class="label-row">
      <label class="label" :for="props.for">{{ props.label }}</label>
      <Help :id="props.for" :label="props.label" :help-text="props.helpText" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.form-field {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}
.label-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}
.label {
  font-weight: 600;
}
</style>
