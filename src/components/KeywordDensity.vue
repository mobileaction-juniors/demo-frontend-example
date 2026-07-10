<script setup>
import {ref, watch} from "vue";
import {MaTextarea, MaButton} from "@mobileaction/action-kit";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const inputText = ref(props.text)

watch(
    () => props.text,
    (newText) => {
      inputText.value = newText
    }
)

const getKeywordsCount = () => {
  if (!inputText.value) return {}
  const keywordsCount = {}
  const keywords = inputText.value.split(' ')
  for (let i = 0; i < keywords.length; i++) {
    if (keywordsCount[keywords[i]]) {
      keywordsCount[keywords[i]]++
    }
    else {
      keywordsCount[keywords[i]] = 1
    }
  }
  return Object.fromEntries(
      Object.entries(keywordsCount).sort((a, b) => b[1] - a[1])
  )
}

const getKeywordsDensity = () => {
  const keywordsCount = getKeywordsCount()
  const totalCountOfKeywords = Object.values(keywordsCount).reduce((acc, curr) => acc + curr, 0)
  const densityMap = {}
  for (let keyword in keywordsCount) {
    densityMap[keyword] = Math.round((keywordsCount[keyword] / totalCountOfKeywords) * 100)
  }
  return Object.fromEntries(
      Object.entries(densityMap).sort((a, b) => a[1] - b[1])
  )
}

const densityOfKeywords = ref({})
const countOfKeywords = ref({})

const computeDensityAndCountOfKeywords = () => {
  densityOfKeywords.value = getKeywordsDensity()
  countOfKeywords.value = getKeywordsCount()
}

</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex w-full flex-col gap-3 lg:w-1/2">
      <h1>Keyword Count & Density</h1>
      <MaTextarea
          v-model="inputText"
          placeholder=""
      />
      <MaButton @click="computeDensityAndCountOfKeywords()" htmlType="button" class="self-start">
        Submit
      </MaButton>
    </div>

    <div class="w-full overflow-x-auto lg:w-1/2">
      <div class="min-w-full rounded-lg border border-gray-200 bg-white">
        <table class="min-w-full border-collapse text-left text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="border-b border-gray-200 px-4 py-3 font-semibold text-gray-700">Keyword</th>
              <th class="border-b border-gray-200 px-4 py-3 font-semibold text-gray-700">Count</th>
              <th class="border-b border-gray-200 px-4 py-3 font-semibold text-gray-700">Density %</th>
            </tr>
          </thead>
          <tbody>
            <tr
                v-for="keyword in Object.keys(countOfKeywords)"
                :key="keyword"
                class="border-b border-gray-100 last:border-b-0"
            >
              <td class="px-4 py-3 text-gray-800">{{ keyword }}</td>
              <td class="px-4 py-3 text-gray-800">{{ countOfKeywords[keyword] }}</td>
              <td class="px-4 py-3 text-gray-800">{{ densityOfKeywords[keyword] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>
