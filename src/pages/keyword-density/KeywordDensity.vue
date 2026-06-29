<script setup>
import { ref, computed } from 'vue';
import { MaTextarea, MaButton } from '@mobileaction/action-kit';
import { AgGridVue } from 'ag-grid-vue3';
import { computeKeywordDensity } from '@/utils/KeywordDensity';

const STATIC_TEXT = 'The quick brown fox jumps over the lazy dog. The quick brown fox is quick and the lazy dog stays lazy.';

const inputText = ref(STATIC_TEXT);
const rows = ref([]);
const lastCalculated = ref('');
const isUnchanged = computed(() => inputText.value === lastCalculated.value);

const columnDefs = [
    { field: 'keyword', flex: 2 },
    { field: 'count', flex: 1 },
    {
        field: 'density',
        flex: 1,
        valueFormatter: ({ value }) => `${value.toFixed(2)}%`,
    },
];

function calculateDensity() {
    rows.value = computeKeywordDensity(inputText.value);
    lastCalculated.value = inputText.value;
}

calculateDensity();
</script>

<template>
    <div class="flex flex-col md:flex-row gap-6 max-w-360 mx-auto p-6">
        <div class="flex flex-col gap-3 w-full md:w-120">
            <h1 class="text-2xl font-bold text-gray-900">Keyword Density</h1>
            <MaTextarea v-model="inputText" placeholder="Enter text" :rows="12"/>
            <MaButton color="dark" :disabled="isUnchanged" @click="calculateDensity">Calculate</MaButton>
        </div>
        <div class="flex-1 min-w-0">
            <AgGridVue :row-data="rows" :column-defs="columnDefs" class="h-150"/>
        </div>
    </div>
</template>
