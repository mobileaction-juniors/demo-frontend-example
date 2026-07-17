<script setup>
import {AgGridVue} from "ag-grid-vue3";
import {useCountDensityRowDataStore} from "@/stores/CountDensityRowData.js";

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

const rowDataStore = useCountDensityRowDataStore();

</script>

<template>
  <div
      data-cy="keyword-density"
      class="w-full min-w-0 max-w-6xl px-3 sm:px-4"
  >
    <div class="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-4">
      <div class="ag-theme-quartz h-75 w-full max-w-full sm:h-85 lg:h-105">
        <AgGridVue
            class="h-full w-full min-w-0"
            :columnDefs="columnDefinitions"
            :defaultColDef="defaultColDef"
            :rowData="rowDataStore.rowData"
            :animateRows="true"
            domLayout="normal"
        />
      </div>
    </div>
  </div>
</template>
