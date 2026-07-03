<script setup>
import { ref, computed } from 'vue';
import { MaTextarea, MaButton, MaNotification } from '@mobileaction/action-kit';
import { AgGridVue } from 'ag-grid-vue3';
import { computeKeywordDensity } from '@/utils/KeywordDensity';
import { useTextStore } from '@/stores/text';

defineOptions({ name: 'KeywordDensity' });

const textStore = useTextStore();

const gridApi = ref(null);
const rows = ref(computeKeywordDensity(textStore.text));
const lastCalculated = ref(textStore.text);
const isUnchanged = computed(() => textStore.text === lastCalculated.value);

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
    rows.value = computeKeywordDensity(textStore.text);
    lastCalculated.value = textStore.text;
}

async function copyCsv() {
    try {
        await navigator.clipboard.writeText(gridApi.value.getDataAsCsv());
        MaNotification.success({ title: 'Copied', description: 'Table copied as CSV.' });
    } catch {
        MaNotification.warning({ title: 'Copy failed', description: 'Could not access clipboard.' });
    }
}
</script>

<template>
    <div class="flex max-lg:flex-col gap-10 max-w-360 my-12 mx-auto px-6 text-gray-800">
        <div class="flex flex-col gap-3 w-full lg:flex-1 lg:max-w-120">
            <h2 class="text-2xl font-bold text-gray-900">Keyword Density</h2>
            <MaTextarea v-model="textStore.text" data-cy="density-text" placeholder="Enter text" :rows="16"/>
            <MaButton color="dark" data-cy="calculate" :disabled="isUnchanged" @click="calculateDensity">Calculate</MaButton>
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex justify-end mb-3">
                <MaButton variant="stroke" icon="copy" data-cy="copy-csv" :disabled="!rows.length" @click="copyCsv">Copy as CSV</MaButton>
            </div>
            <AgGridVue :row-data="rows" :column-defs="columnDefs" class="h-150" data-cy="density-grid" @grid-ready="gridApi = $event.api"/>
        </div>
    </div>
</template>
