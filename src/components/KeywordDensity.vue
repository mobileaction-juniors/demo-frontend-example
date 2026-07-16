<script setup>
import {ref} from "vue";
import {MaTextarea, MaButton} from "@mobileaction/action-kit";
import {AgGridVue} from "ag-grid-vue3";
import {useUserInputStore} from "@/stores/UserInput.js";
import {computeKeywordDensities} from "@/utils/ComputeDensity.js";
import {computeKeywordCounts} from "@/utils/ComputeKeywordCounts.js";

const userInputStore = useUserInputStore()

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
  const countMap = computeKeywordCounts(userInputStore.userInput)
  const densityMap = computeKeywordDensities(countMap)

  rowData.value = Object.keys(countMap).map((keyword) => ({
    keyword,
    count: countMap[keyword],
    density: densityMap[keyword],
  }))
}

</script>

<template>
  <div
      data-cy="keyword-density"
      class="mx-auto w-full min-w-0 max-w-6xl px-3 sm:px-4"
  >
    <h1 class="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
      Keyword Count & Density
    </h1>

    <div class="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-4">
      <section class="flex min-h-55 min-w-0 flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:p-5">
        <MaTextarea
            id="keyword-density-textarea"
            :wrapperProps="{ 'data-cy': 'keyword-density-textarea-wrapper' }"
            v-model="userInputStore.userInput"
            :rows="9"
            class="w-full max-w-full"
        />

        <MaButton
            data-cy="keyword-density-submit"
            @click="computeDensityAndCountOfKeywords"
            htmlType="button"
            class="self-start"
        >
          Submit
        </MaButton>
      </section>

      <section data-cy="keyword-density-grid-panel" class="min-w-0 rounded-lg border border-gray-200 p-3 sm:p-4">
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
