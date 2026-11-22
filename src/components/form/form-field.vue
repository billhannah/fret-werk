<script setup lang="ts">
const props = defineProps<{
  label: string;
  for: string;
}>();
</script>

<template>
  <div class="form-field">
    <label class="label" :for="props.for">{{ props.label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.form-field {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}
.label {
  font-weight: 600;
}
</style>
