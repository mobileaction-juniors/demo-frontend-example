<script setup>
import {computed, ref, watch} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {MaTextInput, MaBadge, MaSelect, MaButton} from "@mobileaction/action-kit";
import KeywordDensity from "@/components/KeywordDensity.vue";
import {generateKeywords} from "@/utils/GenerateKeywords.js";
import {useUserInputStore} from "@/stores/UserInput.js";

const ngramLimit = 10
const userInputStore = useUserInputStore()
const selectedNGrams = ref([]);
const cleanedInput = computed(() => cleanInput(userInputStore.userInput))
const generatedKeywords = ref({});

//to select multiple n-gram options
const nGramSelectOptions = computed(() => {
  const options = [];
  for (let i = 0; i < ngramLimit; i++) {
    const nGram = `${i + 1}-Gram`;
    options.push({label: nGram, value: nGram})
  }
  return options;
})

//generate keywords when button is clicked
const handleGenerate = () => {
  generatedKeywords.value = generateKeywords(cleanedInput.value, ngramLimit)
}

//to keep selected n-gram options sorted
watch(selectedNGrams, (newVal) => {
  selectedNGrams.value = newVal.sort();
})

</script>

<template>
  <div
      class="mx-auto mt-8 flex w-full max-w-368 flex-col gap-5 rounded-xl border
      border-gray-100 bg-white p-6 shadow-sm"
  >

    <div class="border-b border-gray-200 pb-3">
      <span class="text-xl font-bold text-gray-800">Keyword Generator</span>
    </div>

    <div class="flex flex-col gap-2">
      <MaTextInput
          v-model="userInputStore.userInput"
          placeholder="Enter text..."
          class="w-full"
      />
      <MaButton
          @click="handleGenerate"
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
        <span class="font-semibold text-gray-700 min-w-10">{{ nGram }}:</span>

        <MaBadge
            variant="blue"
            v-for="(keyword, keywordIndex) in generatedKeywords[nGram]"
            :key="keywordIndex"
        >
          {{ keyword }}
        </MaBadge>
      </ul>
    </div>
    <KeywordDensity :text="userInputStore.userInput"/>
  </div>

</template>
