<script setup>
import {computed, ref, watch} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {generateNGram} from "@/utils/GenerateNGram.js";
import {MaTextInput, MaBadge, MaSelect, MaButton} from "@mobileaction/action-kit";
import KeywordDensity from "@/components/KeywordDensity.vue";

const ngramLimit = 10
const userInput = ref('');
const selectedNGrams = ref([]);
const cleanedInput = computed(() => cleanInput(userInput.value))

//to select multiple n-gram options
const nGramSelectOptions = computed(() => {
  const options = [];
  let nGram;
  for (let i = 0; i < ngramLimit; i++) {
    nGram = `${i + 1}-Gram`;
    options.push({label: nGram, value: nGram})
  }
  return options;
})

//generate keywords when button is clicked
const getKeywords = () => {
  const ngrams = {};
  let nGram;
  for (let i = 0; i < ngramLimit; i++) {
    nGram = `${i + 1}-Gram`;
    ngrams[nGram] = generateNGram(cleanedInput.value, i + 1)
  }
  return ngrams;
}

//to generate n-gram keywords
const results = ref({});

const generateKeywords = () => {
  results.value = getKeywords();
}

//to keep selected n-gram options sorted
watch(selectedNGrams, (newVal) => {
  selectedNGrams.value = newVal.sort();
})



</script>

<template>
  <div
      class="max-w-2xl mx-auto mt-8 p-6
      bg-white rounded-xl shadow-sm border
      border-gray-100 flex flex-col gap-5"
  >

    <div class="pb-3 border-b border-gray-200">
      <span class="text-xl font-bold text-gray-800">Keyword Generator</span>
    </div>

    <div class="flex flex-col gap-2">
      <MaTextInput
          v-model="userInput"
          placeholder="Enter text..."
          class="w-full"
      />
      <MaButton
          @click="generateKeywords"
          class="self-start"
          icon="tag-2"
      >
        Generate
      </MaButton>
      <p class="text-sm text-gray-500 italic px-1">
        <span class="font-medium text-gray-600">Cleaned User Input:</span> {{ cleanedInput }}
      </p>
    </div>

    <hr class="border-gray-200">

    <ma-select
        v-model:value="selectedNGrams"
        allowClear
        :options="nGramSelectOptions"
        dropdownMatchSelectWidth
        mode="multiselect"
        placeholder="Select option..."
        class="w-full"
    />

    <div class="mt-2 flex flex-col gap-3">
      <ul
          v-for="nGram in selectedNGrams"
          :key="nGram"
          class="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
      >
        <span class="font-semibold text-gray-700 min-w-[40px]">{{ nGram }}:</span>

        <MaBadge
            variant="blue"
            v-for="(keyword, keywordIndex) in results[nGram]"
            :key="keywordIndex"
        >
          {{ keyword }}
        </MaBadge>
      </ul>
    </div>
    <KeywordDensity :text="cleanedInput"/>
  </div>

</template>
