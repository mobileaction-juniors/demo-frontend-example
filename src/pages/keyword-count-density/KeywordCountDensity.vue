<script setup>

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import {AgGridVue} from "ag-grid-vue3";
import {MaButton, MaTextarea} from "@mobileaction/action-kit";
import { ref } from "vue";

import { calculateKeywordDensity } from "@/utils/KeywordDensity.js";

ModuleRegistry.registerModules([AllCommunityModule]);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

function putRowData(text){
  const rowData = [];
  const keywordDensity = calculateKeywordDensity(text);
  for (const { word, count, density } of keywordDensity) {
    rowData.push({ keyword: word, count: count, density:density });
  }
  return rowData;
}

function handleButtonClick() {
  rowData.value = putRowData(newText.value);
}

const colData = [
  {field: "keyword", flex : 1},
  {field: "count", flex : 1},
  {field: "density", flex : 1}
];

const rowData = ref(putRowData(props.text));

const newText = ref(props.text);

</script>
<template>
<div class="p-4 m-4 flex flex-row justify-center items-center h-[500px]">
  <div class="p-2 m-2 flex flex-col items-center gap-8">
    <MaTextarea
      v-model="newText"
      placeholder="Enter your description here..."
      rows="10"
      class="w-96">
    </MaTextarea>
    <MaButton
      color="green"
      icon="coffee-bulk"
      @click="handleButtonClick"
    >
      Keyword Count Density
    </MaButton>
  </div>
  <AgGridVue :column-defs="colData" :row-data="rowData" class="h-3/4 w-3/4" />
</div>
</template>