<script setup lang="ts">
import { ref } from 'vue';

const helpDialog = ref<HTMLDialogElement | null>(null);

const props = defineProps<{
  label: string;
  for: string;
  helpText?: string;
}>();

const openHelp = () => {
  helpDialog.value?.showModal();
};
</script>

<template>
  <div class="form-field">
    <div class="label-row">
      <label class="label" :for="props.for">{{ props.label }}</label>
      <button
        v-if="props.helpText?.trim()"
        class="help-trigger"
        type="button"
        aria-haspopup="dialog"
        :aria-controls="`${props.for}-help`"
        :aria-label="`More information about ${props.label}`"
        @click="openHelp"
      >
        <span aria-hidden="true">?</span>
      </button>
    </div>
    <slot />
    <dialog
      v-if="props.helpText?.trim()"
      :id="`${props.for}-help`"
      ref="helpDialog"
      class="help-dialog"
      :aria-labelledby="`${props.for}-help-title`"
    >
      <div class="dialog-content">
        <h2 :id="`${props.for}-help-title`" class="dialog-title">
          {{ props.label }}
        </h2>
        <p class="dialog-description">{{ props.helpText }}</p>
        <form method="dialog" class="dialog-actions">
          <button class="close-button" type="submit">Close</button>
        </form>
      </div>
    </dialog>
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
.help-trigger {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 1.125rem;
  height: 1.125rem;
  padding: 0;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
}
.help-trigger:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
.help-dialog {
  width: min(32rem, calc(100vw - 2rem));
  max-height: min(80vh, 40rem);
  padding: 0;
  border: 1px solid var(--shadow-grey);
  border-radius: 0.5rem;
  color: var(--text);
  box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 20%);
}
.help-dialog::backdrop {
  background: rgb(0 0 0 / 45%);
}
.dialog-content {
  padding: 1.25rem;
}
.dialog-title {
  margin: 0;
  font-size: 1.125rem;
}
.dialog-description {
  margin: 0.75rem 0 1.25rem;
  line-height: 1.5;
  white-space: pre-wrap;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
}
.close-button {
  min-height: var(--input-height);
  padding: var(--input-padding);
  border: 1px solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  background: white;
  color: var(--text);
  font: inherit;
  cursor: pointer;
}
</style>
