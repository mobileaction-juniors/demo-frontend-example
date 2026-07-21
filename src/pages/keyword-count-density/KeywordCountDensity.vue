<script setup>

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import {AgGridVue} from "ag-grid-vue3";

import { calculateKeywordDensity } from "@/utils/KeywordDensity.js";

ModuleRegistry.registerModules([AllCommunityModule]);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const colData = [
  {field: "keyword", flex : 1},
  {field: "count", flex : 1},
  {field: "density", flex : 1}
];
// const defaultColDef = ref({ flex: 1 });

const keywordDensity = calculateKeywordDensity(props.text);

const rowData = [];
for (const { word, count, density } of keywordDensity) {
  rowData.push({ keyword: word, count: count, density:density });
}

</script>
<template>
<div class="p-4 m-4" style="height: 500px">
  <AgGridVue :column-defs="colData" :row-data="rowData" style="height: 100%; width: 75%;" />
</div>
</template>