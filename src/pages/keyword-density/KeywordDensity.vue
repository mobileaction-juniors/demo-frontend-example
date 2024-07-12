<script setup>
import {computed, ref} from "vue"

import {MaButton, MaEmpty, MaInput} from "@mobileaction/action-kit";

import {cleanDescription} from "@/utils/CleanDescription.js";
import {filterArr} from "@/cleanupResources.js";

const filterSet = new Set(filterArr);

const densityText = ref('')
const wordFrequency = ref({});
const totalWordCount = ref(0);

const cleanDensityWords = computed(() => {
  return cleanDescription(densityText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word)).map((word) => word.trim());
})

const totalCharacters = computed(() => {
  return densityText.value.length;
});

const frequencyToWordMap = computed(() => {
  let wordMap = {};
  for (const word in wordFrequency.value) {
    const occurence = wordFrequency.value[word];
    if (occurence === 1) continue;
    if (!wordMap[occurence]) {
      wordMap[occurence] = [];
    }
    wordMap[occurence].push(word);
  }
  return wordMap;
})

const calculateFrequency = () => {
  let frequency = {};
  cleanDensityWords.value.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  wordFrequency.value = frequency;
  totalWordCount.value = cleanDensityWords.value.length;
}

const calculateDensity = (count) => {
  return (count / totalWordCount.value * 100).toFixed(1);
}

const generateRowTextData = (count) => `${frequencyToWordMap.value[count].join(', ')} - ${count} - ${calculateDensity(count)}%`;

const reduceRowTextData = (table, newRow) => table + '\n' + newRow;

const copyTableToClipboard = () => {
  copyToClipboard(Object.keys(frequencyToWordMap.value).reverse().map(generateRowTextData).reduce(reduceRowTextData));
}

const copyToClipboard = (textData) => {
  navigator.clipboard.writeText(textData);
}
</script>

<template>
  <div class="kd-root">
    <div class="kd-input-wrapper">
      <ma-input
          type="textarea"
          placeholder="Enter the text to calculate densities from"
          rows=10
          size="large"
          class="kd-input-text-area"
          v-model:value="densityText"
      />
      <div class="kd-input-bottom-wrapper">
        <ma-button class="kd-input-button" size="large" @click="calculateFrequency">Count</ma-button>
        <div class="kd-input-total-characters-wrapper">
          <p class="kd-input-total-characters-text">
            Total characters:
          </p>
          <p class="kd-input-total-characters-number">
            {{ totalCharacters }}
          </p>
        </div>
      </div>
    </div>
    <div class="kd-output-wrapper">
      <table class="kd-output-table">
        <thead>
        <tr class="kd-output-table-header">
          <th class="kd-output-table-header-first-col">Keyword</th>
          <th class="kd-outputTable-header-col">Count</th>
          <th class="kd-outputTable-header-col">Density</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="count in Object.keys(frequencyToWordMap).reverse()" :key="count" class="kd-output-table-body-row">
          <td class="kd-output-table-body-first-col p-2 pl-4"> {{ frequencyToWordMap[count].join(', ') }}</td>
          <td class="kd-output-table-body-col"> {{ count }}</td>
          <td class="kd-output-table-body-col"> {{ calculateDensity(count) }}%</td>
        </tr>
        <tr v-if="Object.keys(frequencyToWordMap).length === 0">
          <td colspan="3">
            <ma-empty size="medium" animation="no-data-found" variant="table">
              <template #title> No data to show! </template>
              <template #description> You need at least one word with 2 occurences. </template>
            </ma-empty>
          </td>
        </tr>
        </tbody>
      </table>
      <ma-button
          size="large"
          type="secondary"
          class="kd-output-copy-button"
          @click="copyTableToClipboard()"
      >
        Copy to clipboard
      </ma-button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.kd-root {
  @apply flex max-sm:flex-col md:flex-row flex-nowrap justify-between p-3;
}

.kd-input-wrapper {
  @apply p-3 flex flex-col grow;
}

.kd-input-bottom-wrapper {
  @apply flex flex-row justify-between pt-6;
}

.kd-input-text-area {
  @apply col-span-2 row-span-3;
}

.kd-input-button {
  @apply justify-self-start my-auto;
  @apply bg-red-700 !important;
}

.kd-input-total-characters-wrapper {
  @apply my-auto;
}

.kd-input-total-characters-text {
  @apply inline;
}

.kd-input-total-characters-number {
  @apply inline font-bold text-2xl;
}

.kd-output-wrapper {
  @apply p-3 flex flex-col grow;
}

.kd-output-copy-button {
  @apply w-fit text-blue-500 border-blue-500 hover:bg-blue-100 my-6 !important;
}

.kd-output-table-header {
  @apply bg-blue-600;
}

.kd-output-table-header-first-col {
  @apply text-white w-3/5 text-left p-2 pl-4;
}

.kd-outputTable-header-col {
  @apply text-white w-1/5;
}

.kd-output-table-body-row {
  @apply even:bg-gray-200;
}

.kd-output-table-body-first-col {
  @appyl text-left p-2 pl-4
}

.kd-output-table-body-col {
  @apply text-center;
}
</style>