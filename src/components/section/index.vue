<script setup lang="ts">
import '../../style.css';

withDefaults(
  defineProps<{
    title: string;
    initiallyOpen?: boolean;
  }>(),
  {
    initiallyOpen: true,
  },
);
</script>

<template>
  <details class="section" :open="initiallyOpen">
    <summary class="section-title">{{ title }}</summary>
    <div class="section-content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.section {
  min-width: 0;
  border-bottom: 1px solid var(--input-border-color);
}

.section-title {
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
}

.section-content {
  padding: 0 1rem 1rem;
}
</style>
