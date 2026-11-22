<script setup lang="ts">
import { computed, inject } from 'vue';
import { settingsKey } from '../SettingsContext.ts';
import { calculateStringLines } from './string-lines.ts';

const settingsContext = inject(settingsKey);
if (!settingsContext) {
  throw new Error('Settings context was not provided.');
}

const margin = 5;

const stringLines = computed(() => {
  const { scaleLength, nutWidth, bridgeWidth, numberOfStrings } = settingsContext.settings;
  return calculateStringLines(
    scaleLength.value,
    numberOfStrings,
    nutWidth.value,
    bridgeWidth.value,
  );
});

const viewBox = computed(() => {
  if (!stringLines.value.ok) {
    return undefined;
  }

  const lines = stringLines.value.value;
  const minY = Math.min(
    ...lines.map((line) => line.yAtNut),
    ...lines.map((line) => line.yAtBridge),
  );
  const maxY = Math.max(
    ...lines.map((line) => line.yAtNut),
    ...lines.map((line) => line.yAtBridge),
  );

  return `${-margin} ${minY - margin} ${settingsContext.settings.scaleLength.value + margin * 2} ${maxY - minY + margin * 2}`;
});
</script>

<template>
  <div class="fretboard-wrapper">
    <p v-if="!stringLines.ok" class="drawing-error">{{ stringLines.error.message }}</p>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
      class="fretboard-drawing"
    >
      <line
        v-for="(line, index) in stringLines.value"
        :key="`string-${index}`"
        class="string"
        :x1="line.xAtNut"
        :y1="line.yAtNut"
        :x2="line.xAtBridge"
        :y2="line.yAtBridge"
      />
      <line
        class="center-line"
        x1="0"
        y1="0"
        :x2="settingsContext.settings.scaleLength.value"
        y2="0"
      />
    </svg>
  </div>
</template>

<style scoped>
.fretboard-wrapper {
  width: 100%;
  padding: 2rem;
}

.fretboard-drawing {
  display: block;
  width: 100%;
  height: auto;
}

.fret {
  stroke: red;
}

.string {
  stroke: blue;
  stroke-width: 0.6;
}

.center-line {
  stroke: grey;
  stroke-width: 0.6;
  stroke-dasharray: 4 4;
}

.edge-line {
  stroke: black;
}

.drawing-error {
  color: var(--text);
}
</style>
