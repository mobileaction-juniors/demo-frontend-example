<script setup>
import {computed, ref} from "vue"

import {MaBadge, MaButton, MaCheckbox, MaInput} from "@mobileaction/action-kit";

import {cleanDescription} from "@/utils/CleanDescription.js";
import {filterArr} from "@/cleanupResources.js";

const MAX_VALUE_OF_NGRAM_SIZE = 10;

const filterSet = new Set(filterArr);

const keywordText = ref('')
const selectedNgramSizes = ref(Array(MAX_VALUE_OF_NGRAM_SIZE));
const ngramsList = ref([]);

const uncheckInvisibleCheckboxes = () => {
  for (let i = cleanKeywords.value.length; i < MAX_VALUE_OF_NGRAM_SIZE; i++) {
    selectedNgramSizes.value[i] = false;
  }
}

const toggleNgramCheckbox = (ngramSize) => {
  selectedNgramSizes.value[ngramSize - 1] = !selectedNgramSizes.value[ngramSize - 1];
}

const createNGrams = (words, n) => {
  const ngrams = new Set()
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = []
    for (let j = 0; j < n; j++) {
      ngram.push(words[i + j])
    }
    ngrams.add(ngram)
  }
  return ngrams
}

const generateNGrams = () => {
  ngramsList.value = ngramSizes.value.map(size => {
    return {
      size,
      grams: createNGrams(cleanKeywords.value, size)
    };
  });
}

const cleanKeywords = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word));
})

const ngramSizes = computed(() => {
  const sizes = [];
  for (let i = 0; i < MAX_VALUE_OF_NGRAM_SIZE; i++) {
    if (selectedNgramSizes.value[i] && i + 1 <= cleanKeywords.value.length) {
      sizes.push(i + 1)
    }
  }
  return sizes;
})

</script>

<template>
  <div class="kg-root">
    <div class="kg-top">
      <h3 class="kg-header">Keyword Generator</h3>
      <div class="kg-input-wrapper">
        <ma-input
            type="textarea"
            placeholder="Enter the text to generate keywords from"
            rows=5
            size="large"
            class="kg-input-text-area"
            v-model:value="keywordText"
            @change="uncheckInvisibleCheckboxes()"
        >
        </ma-input>
        <div class="kg-input-checkboxes-wrapper">
          <ma-checkbox v-for="ngramSize in Math.min(MAX_VALUE_OF_NGRAM_SIZE, cleanKeywords.length)"
                       v-bind:key="ngramSize" @click="toggleNgramCheckbox(ngramSize)"> {{ ngramSize }}-gram
          </ma-checkbox>
        </div>
      </div>
      <ma-button type="primary" variant="dark" class="kg-input-button" icon="add" @click="generateNGrams()">Generate Ngrams
      </ma-button>
    </div>
    <div class="kg-ngrams-wrapper">
      <div class="kg-ngrams-columns-wrapper">
        <div v-for="ngramData in ngramsList" v-bind:key="ngramData" class="kg-ngrams-column">
          <ma-badge variant="dark" size="large" type="primary" class="kg-ngrams-column-title-wrapper">
            <h1 class="kg-ngrams-column-title">
              {{ ngramData.size }}-grams
            </h1>
          </ma-badge>
          <div v-for="ngram in ngramData.grams" v-bind:key="ngram"
               class="group kg-ngrams-ngram">
            <ma-badge v-for="ngramWord in ngram" v-bind:key="ngramWord" variant="dark" size="large"
                      type="primary"
                      class="kg-ngrams-ngram-word">
              {{ ngramWord }}
            </ma-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.kg-root {
  @apply w-5/6 mx-auto
}

.kg-top {
  @apply md:w-2/3 mx-auto
}

.kg-header {
  @apply font-sans font-bold text-center my-10 text-3xl
}

.kg-input-wrapper {
  @apply flex max-sm:flex-col md:flex-row
}

.kg-input-text-area {
  @apply basis-1/2
}

.kg-input-checkboxes-wrapper {
  @apply grid grid-cols-4 gap-2 px-3
}

.kg-input-button {
  @apply my-3
}

.kg-ngrams-wrapper {
  @apply mx-auto mt-5
}

.kg-ngrams-columns-wrapper {
  @apply flex flex-row flex-wrap justify-center my-3
}

.kg-ngrams-column {
  @apply shrink mx-2
}

.kg-ngrams-column-title-wrapper {
  @apply py-1
}

.kg-ngrams-column-title {
  @apply font-bold text-lg mx-auto
}

.kg-ngrams-ngram {
  @apply my-1 p-1 rounded-full flex flex-row flex-wrap justify-center hover:bg-gray-800
}

.kg-ngrams-ngram-word {
  @apply transition text-center mr-0.5 group-hover:bg-gray-100 group-hover:text-gray-800
}

</style>