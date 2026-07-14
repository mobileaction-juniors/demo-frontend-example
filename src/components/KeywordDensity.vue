<script setup>
import {ref, watch} from "vue";
import {MaTextarea, MaButton} from "@mobileaction/action-kit";
import {AgGridVue} from "ag-grid-vue3";

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
    } else {
      keywordsCount[keywords[i]] = 1
    }
  }
  return Object.fromEntries(
      Object.entries(keywordsCount).sort((a, b) => b[1] - a[1])
  )
}

const getKeywordsDensity = (keywordsCount) => {
  const totalCountOfKeywords = Object.values(keywordsCount).reduce((acc, curr) => acc + curr, 0)
  if (!totalCountOfKeywords) return {}
  const densityMap = {}
  for (let keyword in keywordsCount) {
    densityMap[keyword] = Math.round((keywordsCount[keyword] / totalCountOfKeywords) * 100)
  }
  return densityMap
}

const columnDefinitions = [
  {
    field: "keyword",
    headerName: "Keyword",
    sortable: true,
    flex: 1,
    minWidth: 84,
  },
  {
    field: "count",
    headerName: "Count",
    sortable: true,
    flex: 0.6,
    minWidth: 64,
  },
  {
    field: "density",
    headerName: "Density %",
    sortable: true,
    flex: 0.8,
    minWidth: 72,
  },
]

const defaultColDef = {
  resizable: true,
}

const rowData = ref([])

const computeDensityAndCountOfKeywords = () => {
  const countMap = getKeywordsCount()
  const densityMap = getKeywordsDensity(countMap)

  rowData.value = Object.keys(countMap).map((keyword) => ({
    keyword,
    count: countMap[keyword],
    density: densityMap[keyword],
  }))
}

</script>

<template>
  <div class="mx-auto w-full min-w-0 max-w-6xl px-3 sm:px-4">
    <h1 class="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
      Keyword Count & Density
    </h1>

    <div class="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-4">
      <section class="flex min-h-55 min-w-0 flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:p-5">
        <MaTextarea
            v-model="inputText"
            placeholder=""
            :rows="9"
            class="w-full max-w-full"
        />

        <MaButton
            @click="computeDensityAndCountOfKeywords"
            htmlType="button"
            class="self-start"
        >
          Submit
        </MaButton>
      </section>

      <section class="min-w-0 rounded-lg border border-gray-200 p-3 sm:p-4">
        <div class="ag-theme-quartz h-75 w-full max-w-full sm:h-85 lg:h-105">
          <AgGridVue
              class="h-full w-full min-w-0"
              :columnDefs="columnDefinitions"
              :defaultColDef="defaultColDef"
              :rowData="rowData"
              :animateRows="true"
              domLayout="normal"
          />
        </div>
      </section>
    </div>
  </div>
</template>
