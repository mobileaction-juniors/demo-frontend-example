<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useKeywordStore } from '../../stores/keywordStore';
import { MaTextarea, MaButton, MaCheckbox2 as MaCheckbox, MaNotification } from '@mobileaction/action-kit';
import { processKeywordDensity } from '../../utils/calculateDensity';
import { AgGridVue } from 'ag-grid-vue3';

const store = useKeywordStore();
store.initDensityText();
const { sharedInputText: inputText } = storeToRefs(store);
const keywordStats = ref([]);
const totalWords = ref(0);
const shouldRemoveStopWords = ref(false);
const totalCharacters = computed(() => inputText.value.length);
const hasInput = computed(() => inputText.value.trim().length > 0);

const columnDefs = ref([
    { headerName: 'Keyword', field: 'word', flex: 1, minWidth: 150 },
    { 
        headerName: 'Count', 
        field: 'count', 
        width: 120, 
        type: 'numericColumn' 
    },
    { 
        headerName: 'Density', 
        field: 'percentage', 
        width: 120, 
        type: 'numericColumn',
        valueFormatter: params => `${params.value}%`
    }
]);



const calculateDensity = () => {
    const result = processKeywordDensity(inputText.value, shouldRemoveStopWords.value);
    keywordStats.value = result.stats;
    totalWords.value = result.totalWords;

    if (result.stats.length > 0) {
        MaNotification.success({
            title: 'Density Calculated',
            message: `Successfully calculated density for ${result.totalWords} words.`,
            duration: 2000
        });
    }
};

const copyToClipboard = async () => {
    if (keywordStats.value.length === 0) return;

    const header = "Keyword\tCount\tDensity\n";
    const rows = keywordStats.value.map(stat => `${stat.word}\t${stat.count}\t${stat.percentage}%`).join("\n");
    const textToCopy = header + rows;

    try {
        await navigator.clipboard.writeText(textToCopy);
        MaNotification.success({
            title: 'Copied!',
            message: 'Table copied to clipboard.',
            duration: 2000
        });
    } catch (err) {
        MaNotification.error({
            title: 'Error',
            message: 'Failed to copy to clipboard.',
            duration: 2000
        });
    }
};
</script>

<template>
    <div class="p-5 max-w-7xl mx-auto font-sans">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2 text-slate-800">Keyword Density</h1>
            <p class="text-gray-500 text-base m-0">Count keywords and calculate their density percentage from your text.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 w-full items-start">
            <div class="w-full lg:w-1/2 flex flex-col gap-4">
                <MaTextarea
                    v-model="inputText"
                    placeholder="Enter your text here..."
                    :rows="12"
                />
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 px-1">
                    <div class="flex flex-wrap items-center gap-4 sm:gap-6">
                        <MaCheckbox v-model:checked="shouldRemoveStopWords">
                            <span class="text-sm font-medium text-gray-700 whitespace-nowrap">Remove Stop Words</span>
                        </MaCheckbox>
                        <p class="m-0 text-sm text-gray-500 whitespace-nowrap">Total Characters: {{ totalCharacters }}</p>
                    </div>
                    <MaButton color="dark" type="primary" :disabled="!hasInput" @click="calculateDensity" class="px-6 sm:px-8 flex-shrink-0">
                        Calculate Density
                    </MaButton>
                </div>
            </div>

            <div class="w-full lg:w-1/2 flex flex-col gap-4">
                <div v-if="keywordStats.length === 0" class="border border-gray-200 rounded-lg p-8 text-center text-gray-500 text-sm bg-white shadow-sm">
                    No keywords to display. Enter text and calculate density.
                </div>
                <div v-else class="ag-theme-alpine w-full shadow-sm rounded-lg overflow-hidden border border-gray-200">
                    <ag-grid-vue
                        style="width: 100%;"
                        :columnDefs="columnDefs"
                        :rowData="keywordStats"
                        domLayout="autoHeight"
                    >
                    </ag-grid-vue>
                </div>
                <div v-if="keywordStats.length > 0" class="mt-4">
                    <MaButton variant="stroke" type="primary" @click="copyToClipboard">
                        Copy to clipboard
                    </MaButton>
                </div>
            </div>
        </div>
    </div>
</template>
