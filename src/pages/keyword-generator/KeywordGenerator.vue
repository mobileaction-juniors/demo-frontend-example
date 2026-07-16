<script setup>
import {computed} from "vue";
import {cleanInput} from "@/utils/CleanInput.js";
import {computeKeywordCounts} from "@/utils/ComputeKeywordCounts.js";
import {computeKeywordDensities} from "@/utils/ComputeDensity.js";
import {MaTextInput, MaBadge, MaSelect, MaButton} from "@mobileaction/action-kit";
import KeywordDensity from "@/components/KeywordDensity.vue";
import {useUserInputStore} from "@/stores/UserInput.js";
import {useSelectedNGramsStore} from "@/stores/SelectedNGrams.js";
import {useGeneratedKeywordsStore} from "@/stores/GeneratedKeywords.js";
import {useInputHistoryStore} from "@/stores/InputHistory.js";
import {SAMPLE_KEYWORD_INPUT} from "@/constants/KeywordGeneratorSamples.js";

const userInputStore = useUserInputStore()
const selectedNGramsStore = useSelectedNGramsStore()
const generatedKeywordsStore = useGeneratedKeywordsStore()
const inputHistoryStore = useInputHistoryStore()
const cleanedInput = computed(() => cleanInput(userInputStore.userInput))
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
      border-gray-100 bg-white p-6 shadow-sm"
  >

    <div class="border-b border-gray-200 pb-3">
      <span class="text-xl font-bold text-gray-800">Keyword Generator</span>
    </div>

    <div class="flex flex-col gap-2">
      <div data-cy="keyword-generator-input">
        <MaTextInput
            v-model="userInputStore.userInput"
            placeholder="Enter text..."
            class="w-full"
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
          Generate
        </MaButton>
      </div>
      <p class="text-sm text-gray-500 italic px-1">
        <span class="font-medium text-gray-600">Cleaned User Input:</span> {{ cleanedInput }}
      </p>
    </div>

    <div
        v-if="inputHistoryStore.entries.length"
        data-cy="input-history"
        class="flex flex-col gap-2"
    >
      <span class="text-sm font-semibold text-gray-600">History</span>
      <ul class="flex max-h-48 flex-col gap-1 overflow-y-auto">
        <li v-for="entry in inputHistoryStore.entries" :key="entry.id">
          <button
              type="button"
              data-cy="input-history-item"
              @click="inputHistoryStore.selectEntry(entry.id)"
              class="w-full truncate rounded-md border px-3 py-2 text-left text-sm transition-colors"
              :class="entry.id === inputHistoryStore.activeEntry?.id
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100'"
          >
            {{ entry.input }}
          </button>
        </li>
      </ul>
    </div>

    <hr class="border-gray-200">

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
    <KeywordDensity/>
  </div>

</template>
