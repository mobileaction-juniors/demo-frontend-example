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
  <div class="w-5/6 mx-auto">
    <div class="md:w-2/3 mx-auto">
      <h3 class="font-sans font-bold text-center my-10 text-3xl">Keyword Generator</h3>
      <div class="flex max-sm:flex-col md:flex-row">
        <ma-input
            type="textarea"
            placeholder="Enter the text to generate keywords from"
            rows=5
            size="large"
            class="basis-1/2"
            v-model:value="keywordText"
            @change="uncheckInvisibleCheckboxes()"
        >
        </ma-input>
        <div class="grid grid-cols-4 gap-2 px-3">
          <ma-checkbox v-for="ngramSize in Math.min(MAX_VALUE_OF_NGRAM_SIZE, cleanKeywords.length)"
                       v-bind:key="ngramSize" @click="toggleNgramCheckbox(ngramSize)"> {{ ngramSize }}-gram
          </ma-checkbox>
        </div>
      </div>
    </div>
    <div class="md:w-2/3 mx-auto my-3">
      <ma-button type="primary" variant="dark" class="" icon="add" @click="generateNGrams()">Generate Ngrams</ma-button>
    </div>
    <div class="mx-auto mt-5">
      <div class="flex flex-row flex-wrap justify-center my-3">
        <div v-for="ngramData in ngramsList" v-bind:key="ngramData" class="shrink mx-2">
          <ma-badge variant="dark" size="large" type="primary" class="py-1">
            <h1 class="font-bold text-lg mx-auto">
              {{ ngramData.size }}-grams
            </h1>
          </ma-badge>
          <div v-for="ngram in ngramData.grams" v-bind:key="ngram"
               class="group my-1 p-1 rounded-full flex flex-row flex-wrap justify-center hover:bg-gray-800">
            <ma-badge v-for="ngramWord in ngram" v-bind:key="ngramWord" variant="dark" size="large"
                      type="primary" class="transition text-center mr-0.5 group-hover:bg-gray-100 group-hover:text-gray-800">
              {{ ngramWord }}
            </ma-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>