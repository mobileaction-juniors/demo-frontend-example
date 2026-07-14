<script setup>
import {computed} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {MaTextInput, MaBadge, MaSelect, MaButton} from "@mobileaction/action-kit";
import KeywordDensity from "@/components/KeywordDensity.vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {useSelectedNGramsStore} from "@/stores/SelectedNGrams.js";
import {useGeneratedKeywordsStore} from "@/stores/GeneratedKeywords.js";

const userInputStore = useUserInputStore()
const selectedNGramsStore = useSelectedNGramsStore()
const generatedKeywordsStore = useGeneratedKeywordsStore()
const cleanedInput = computed(() => cleanInput(userInputStore.userInput))
const selectedNGramsModel = computed(
    {
      get: () => selectedNGramsStore.selectedNGrams,
      set: (value) => selectedNGramsStore.setSelectedNGrams(value),
    }
)
const sampleInput = 'Quick brown fox jump over fox';

//generate keywords when button is clicked
const handleGenerate = () => {
  generatedKeywordsStore.generate();
}

const handleFillSampleInput = () => {
  userInputStore.userInput = sampleInput;
}

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
      <div class="flex flex-wrap gap-2">
        <MaButton
            @click="handleFillSampleInput"
            class="self-start"
            icon="download"
        >
          Fill Example
        </MaButton>
        <MaButton
            @click="handleGenerate"
            class="self-start"
            icon="tag-2"
        >
          Generate
        </MaButton>
      </div>
      <p class="text-sm text-gray-500 italic px-1">
        <span class="font-medium text-gray-600">Cleaned User Input:</span> {{ cleanedInput }}
      </p>
    </div>

    <hr class="border-gray-200">

    <ma-select
        v-model:value="selectedNGramsModel"
        allowClear
        :options="selectedNGramsStore.nGramSelectOptions"
        dropdownMatchSelectWidth
        mode="multiselect"
        placeholder="Select option..."
        class="w-full"
    />

    <div class="mt-2 flex flex-col gap-3">
      <ul
          v-for="nGram in selectedNGramsStore.formattedSelectedNGrams"
          :key="nGram"
          class="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
      >
        <span class="font-semibold text-gray-700 min-w-10">{{ nGram }}:</span>

        <MaBadge
            variant="blue"
            v-for="(keyword, keywordIndex) in generatedKeywordsStore.generatedKeywords[nGram]"
            :key="keywordIndex"
        >
          {{ keyword }}
        </MaBadge>
      </ul>
    </div>
    <KeywordDensity/>
  </div>

</template>
