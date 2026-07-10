<script setup>
import {ref, watch} from "vue";
import {MaTextarea, MaButton} from "@mobileaction/action-kit";
import {AgGridVue} from "ag-grid-vue3";
import "../../node_modules/.pnpm/ag-grid-community@36.0.0/node_modules/ag-grid-community/styles/ag-grid.css";
import "../../node_modules/.pnpm/ag-grid-community@36.0.0/node_modules/ag-grid-community/styles/ag-theme-quartz.css";

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
  {field: "keyword", headerName: "Keyword", sortable: true, flex: 1, minWidth: 140},
  {field: "count", headerName: "Count", sortable: true, flex: 1, minWidth: 110},
  {field: "density", headerName: "Density %", sortable: true, flex: 1, minWidth: 130},
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
  <div class="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start">
    <div class="flex w-full min-w-0 flex-col gap-3 lg:flex-1">
      <h1>Keyword Count & Density</h1>
      <MaTextarea
          v-model="inputText"
          placeholder=""
          class="w-full max-w-full"
      />
      <MaButton @click="computeDensityAndCountOfKeywords()" htmlType="button" class="self-start">
        Submit
      </MaButton>
    </div>

    <div class="w-full min-w-0 overflow-x-auto lg:flex-1">
      <div class="ag-theme-quartz h-[360px] w-full max-w-full
            rounded-lg border
            border-gray-200 lg:h-[420px]">
        <AgGridVue
            class="h-full w-full min-w-0"
            :columnDefs="columnDefinitions"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :animateRows="true"
            domLayout="normal"
        />
      </div>
    </div>
  </div>


</template>
