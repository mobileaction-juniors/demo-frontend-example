<script setup>
import {computed} from "vue";
import {MaBadge, MaSelect, MaButton, MaTextarea} from "@mobileaction/action-kit";
import KeywordDensity from "@/components/KeywordDensity.vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {useSelectedNGramsStore} from "@/stores/SelectedNGrams.js";
import {useGeneratedKeywordsStore} from "@/stores/GeneratedKeywords.js";
import {useInputHistoryStore} from "@/stores/InputHistory.js";
import {useCountDensityRowDataStore} from "@/stores/CountDensityRowData.js";
import {SAMPLE_KEYWORD_INPUT} from "@/constants/KeywordGeneratorSamples.js";
import {computeKeywordCounts, computeKeywordDensities} from "@/utils/KeywordsAnalyzer.js";

const userInputStore = useUserInputStore()
const selectedNGramsStore = useSelectedNGramsStore()
const generatedKeywordsStore = useGeneratedKeywordsStore()
const inputHistoryStore = useInputHistoryStore()
const countDensityRowDataStore = useCountDensityRowDataStore()
const selectedNGramsModel = computed(
    {
      get: () => selectedNGramsStore.selectedNGrams,
      set: (value) => selectedNGramsStore.setSelectedNGrams(value),
    }
)
const sampleInput = SAMPLE_KEYWORD_INPUT;

//generate keywords when button is clicked
const handleGenerate = () => {
  generatedKeywordsStore.generate();
  if (!userInputStore.userInput.trim()) return

  countDensityRowDataStore.updateRowData()

  const keywordCounts = computeKeywordCounts(userInputStore.userInput)
  const keywordDensities = computeKeywordDensities(keywordCounts)

  inputHistoryStore.addEntry({
    input: userInputStore.userInput,
    generatedKeywords: generatedKeywordsStore.generatedKeywords,
    keywordCounts,
    keywordDensities,
  })
}

const handleFillSampleInput = () => {
  userInputStore.userInput = sampleInput;
}

</script>

<template>
  <div
      class="mx-auto mt-8 flex w-full max-w-368 flex-col gap-5 rounded-xl border
      border-gray-100 bg-white p-6 pb-24 shadow-sm"
  >

    <div class="border-b border-gray-200 pb-3">
      <span class="text-xl font-bold text-gray-800">Keyword Generator</span>
    </div>

    <div class="flex flex-col gap-2">
      <div data-cy="keyword-generator-input">
        <MaTextarea
            id="keyword-density-textarea"
            :wrapperProps="{ 'data-cy': 'keyword-density-textarea-wrapper' }"
            v-model="userInputStore.userInput"
            :rows="9"
            class="w-full max-w-full"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        <MaButton
            data-cy="keyword-generator-fill-example"
            @click="handleFillSampleInput"
            class="self-start"
            icon="download"
        >
          Fill Example
        </MaButton>
        <MaButton
            data-cy="keyword-generator-generate"
            @click="handleGenerate"
            class="self-start"
            icon="tag-2"
        >
          SUBMIT
        </MaButton>
      </div>
      <p class="text-sm text-gray-500 italic px-1">
        <span class="font-medium text-gray-600">Cleaned User Input:</span> {{ userInputStore.cleanedUserInput }}
      </p>
    </div>

    <hr class="border-gray-200">

    <div class="flex flex-col gap-4">
      <KeywordDensity/>
      <div class="flex flex-col gap-2">
        <ma-select
            data-cy="keyword-generator-select"
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
      </div>
    </div>


  </div>

</template>
