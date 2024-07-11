<script setup>
import {computed, ref} from "vue"

import {MaBadge, MaButton, MaInput, MaSelect, MaSwitch} from "@mobileaction/action-kit";

import {cleanDescription} from "@/utils/CleanDescription.js";
import {filterArr} from "@/cleanupResources.js";

const filterSet = new Set(filterArr);

const keywordText = ref('')
const selectedNgram = ref(1)
const colorSelectorOption = ref('Dark')
const ngramsList = ref([]);

const ngramSelectorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({'value': i, 'label': `${i}-gram`}))
const colorSelectorOptions = ["Dark", "Pink"].map(op => ({"value": op, "label": op}))

const createNGrams = (words, n) => {
  const ngrams = new Set()
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = []
    for (let j = 0; j < n; j++) {
      ngram.push(words[i + j])
    }
    ngrams.add(ngram)
  }
  return Array.from(ngrams);
}

const generateNGrams = () => {
  ngramsList.value = createNGrams(cleanKeywords.value, selectedNgram.value);
}

const cleanKeywords = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word));
})
</script>

<template>
  <div>
    <ma-switch
        v-model:active="colorSelectorOption"
        type="secondary"
        :options="colorSelectorOptions"
        @update:active="(selectedColor) => {colorSelectorOption=selectedColor}"
        class="kg-color-switch"
    />
    <div class="kg-top">
      <h3 class="kg-header" :class="(colorSelectorOption === 'Pink' ? 'kg-header-pink' : ' ')">Keyword Generator</h3>
      <div class="kg-input-wrapper">
        <ma-input
            type="textarea"
            placeholder="Enter the text to generate keywords from"
            rows=4
            size="large"
            class="kg-input-text-area lg:col-span-4"
            v-model:value="keywordText"
        >
        </ma-input>
        <ma-select
            placeholder="Select ngram"
            :options="ngramSelectorOptions"
            option-filter-prop="label"
            autofocus
            allow-clear
            v-model:value="selectedNgram"
            class="kg-input-select w-full"
        >
        </ma-select>
        <ma-button type="primary" variant="dark" :class="(colorSelectorOption === 'Pink' ? 'kg-input-button' : ' ')"
                   icon="add" @click="generateNGrams()">
          Generate {{ selectedNgram }}-grams
        </ma-button>
      </div>
    </div>
    <div class="kg-ngrams-wrapper">
      <div v-for="ngram in ngramsList" v-bind:key="ngram" class="kg-ngrams-ngram">
        <ma-badge variant="dark" v-for="ngramWord in ngram" v-bind:key="ngramWord" size="large"
                  class="kg-ngrams-ngram-word"
                  :class="(colorSelectorOption === 'Pink' ? 'kg-ngrams-ngram-word-pink' : ' ')">
          {{ ngramWord }}
        </ma-badge>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.kg-color-switch {
  @apply ml-auto m-3
}

.kg-top {
  @apply w-5/6 md:w-2/3 mx-auto
}

.kg-header {
  @apply font-sans font-bold text-center mb-10 py-3 text-3xl transition;
}

.kg-header-pink {
  @apply border-2 rounded-full text-pink-700 bg-pink-200 border-pink-700;
}

.kg-input-wrapper {
  @apply grid max-sm:grid-rows-4 md:grid-rows-2 md:grid-flow-col gap-4
}

.kg-input-text-area {
  @apply row-span-2;
}

.kg-input-select {
  @apply w-full
}

.kg-input-button {
  @apply border-pink-700 border-2 bg-pink-200 text-pink-700 !important
}

.kg-ngrams-wrapper {
  @apply w-5/6 md:w-1/2 mx-auto mt-5
}

.kg-ngrams-ngram {
  @apply my-0.5 p-1 flex flex-row flex-wrap justify-center
}

.kg-ngrams-ngram-word {
  @apply text-center mr-0.5 my-0.5 px-3 mx-2 text-base transition;
}

.kg-ngrams-ngram-word-pink {
  @apply bg-pink-200 text-pink-700 border-pink-700;
}
</style>