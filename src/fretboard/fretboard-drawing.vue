<script setup lang="ts">
import { computed, inject } from 'vue';
import { settingsKey } from '../SettingsContext.ts';
import { calculateFretPosition } from '../fret-position/fret-position.ts';
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

const heelPosition = computed(() =>
  calculateFretPosition(
    settingsContext.settings.numberOfFrets,
    settingsContext.settings.scaleLength.value,
  ),
);

const drawingError = computed(() => {
  if (!stringLines.value.ok) {
    return stringLines.value.error.message;
  }
  if (!heelPosition.value.ok) {
    return heelPosition.value.error.message;
  }
  if (!fretLines.value.ok) {
    return fretLines.value.error.message;
  }

  return undefined;
});

const edgeLines = computed(() => {
  if (!stringLines.value.ok || !heelPosition.value.ok) {
    return [];
  }

  const lines = stringLines.value.value;
  const { atNut, atHeel } = settingsContext.settings.fretboardOverhang;
  const topString = lines[0];
  const bottomString = lines[lines.length - 1];
  const xAtHeel = heelPosition.value.value;
  const heelRatio = xAtHeel / settingsContext.settings.scaleLength.value;
  const topStringYAtHeel = topString.yAtNut + (topString.yAtBridge - topString.yAtNut) * heelRatio;
  const bottomStringYAtHeel =
    bottomString.yAtNut + (bottomString.yAtBridge - bottomString.yAtNut) * heelRatio;

  return [
    {
      xAtNut: topString.xAtNut,
      yAtNut: topString.yAtNut - atNut.value,
      xAtHeel,
      yAtHeel: topStringYAtHeel - atHeel.value,
    },
    {
      xAtNut: bottomString.xAtNut,
      yAtNut: bottomString.yAtNut + atNut.value,
      xAtHeel,
      yAtHeel: bottomStringYAtHeel + atHeel.value,
    },
  ];
});

const fretLines = computed(() => {
  if (!heelPosition.value.ok) {
    return heelPosition.value;
  }

  const [topEdge, bottomEdge] = edgeLines.value;
  const scaleLength = settingsContext.settings.scaleLength.value;
  const frets = [];

  for (let fretNumber = 1; fretNumber <= settingsContext.settings.numberOfFrets; fretNumber++) {
    const fretPosition = calculateFretPosition(fretNumber, scaleLength);
    if (!fretPosition.ok) {
      return fretPosition;
    }

    const edgeRatio = fretPosition.value / heelPosition.value.value;
    frets.push({
      fretNumber,
      x: fretPosition.value,
      yAtTop: topEdge.yAtNut + (topEdge.yAtHeel - topEdge.yAtNut) * edgeRatio,
      yAtBottom: bottomEdge.yAtNut + (bottomEdge.yAtHeel - bottomEdge.yAtNut) * edgeRatio,
    });
  }

  return { ok: true as const, value: frets };
});

const viewBox = computed(() => {
  if (!stringLines.value.ok || !heelPosition.value.ok || !fretLines.value.ok) {
    return undefined;
  }

  const yValues = [
    ...stringLines.value.value.flatMap((line) => [line.yAtNut, line.yAtBridge]),
    ...edgeLines.value.flatMap((line) => [line.yAtNut, line.yAtHeel]),
  ];
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return `${-margin} ${minY - margin} ${settingsContext.settings.scaleLength.value + margin * 2} ${maxY - minY + margin * 2}`;
});
</script>

<template>
  <div class="fretboard-wrapper">
    <p v-if="drawingError" class="drawing-error">{{ drawingError }}</p>
    <svg
      v-else-if="stringLines.ok && heelPosition.ok && fretLines.ok"
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
      <line
        v-for="line in fretLines.value"
        :key="`fret-${line.fretNumber}`"
        class="fret"
        :x1="line.x"
        :y1="line.yAtTop"
        :x2="line.x"
        :y2="line.yAtBottom"
      />
      <line
        v-for="(line, index) in edgeLines"
        :key="`edge-${index}`"
        class="edge-line"
        :x1="line.xAtNut"
        :y1="line.yAtNut"
        :x2="line.xAtHeel"
        :y2="line.yAtHeel"
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
  stroke-width: 1;
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
