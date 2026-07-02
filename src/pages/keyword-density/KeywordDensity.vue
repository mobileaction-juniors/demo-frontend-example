<script setup>
import { ref, computed, onMounted } from 'vue';

import { useKeywordStore } from '@/stores/keywordStore';
import { MaTextarea, MaButton, MaCheckbox2 as MaCheckbox, MaNotification, MaEmpty } from '@mobileaction/action-kit';
import { processKeywordDensity } from '@/utils/calculateDensity';
import { AgGridVue } from 'ag-grid-vue3';

const keywordStore = useKeywordStore();

const STATIC_PARENT_TEXT = 'Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".';

onMounted(() => {
    if (!keywordStore.sharedInputText) {
        keywordStore.sharedInputText = STATIC_PARENT_TEXT;
    }
});

const keywordStats = ref([]);
const totalWords = ref(0);
const shouldRemoveStopWords = ref(false);
const totalCharacters = computed(() => keywordStore.sharedInputText.length);
const hasInput = computed(() => keywordStore.sharedInputText.trim().length > 0);

const lastCalculatedState = ref({
    text: null,
    removeStopWords: null
});
const hasStateChanged = computed(() => {
    return keywordStore.sharedInputText !== lastCalculatedState.value.text ||
           shouldRemoveStopWords.value !== lastCalculatedState.value.removeStopWords;
});

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
    const result = processKeywordDensity(keywordStore.sharedInputText, shouldRemoveStopWords.value);
    keywordStats.value = result.stats;
    totalWords.value = result.totalWords;

    lastCalculatedState.value = {
        text: keywordStore.sharedInputText,
        removeStopWords: shouldRemoveStopWords.value
    };

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
            <h1 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">Keyword Density</h1>
            <p class="text-gray-500 dark:text-gray-400 text-base m-0">Count keywords and calculate their density percentage from your text.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 w-full items-start">
            <div class="w-full lg:w-1/2 flex flex-col gap-4">
                <MaTextarea
                    v-model="keywordStore.sharedInputText"
                    placeholder="Enter your text here..."
                    :rows="12"
                    class="dark:invert dark:hue-rotate-180"
                />
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 px-1">
                    <div class="flex flex-wrap items-center gap-4 sm:gap-6">
                        <MaCheckbox v-model:checked="shouldRemoveStopWords" class="dark:!text-slate-100">
                            <span class="text-sm font-medium text-gray-700 dark:!text-slate-100 whitespace-nowrap">Remove Stop Words</span>
                        </MaCheckbox>
                        <p class="m-0 text-sm text-gray-500 whitespace-nowrap">Total Characters: {{ totalCharacters }}</p>
                    </div>
                    <MaButton color="dark" type="primary" :disabled="!hasInput || !hasStateChanged" @click="calculateDensity" class="px-6 sm:px-8 flex-shrink-0 dark:!bg-black dark:!border-black dark:!text-white">
                        Calculate Density
                    </MaButton>
                </div>
            </div>

            <div class="w-full lg:w-1/2 flex flex-col gap-4">
                <MaEmpty v-if="keywordStats.length === 0" description="No keywords to display. Enter text and calculate density." class="dark:invert dark:hue-rotate-180"></MaEmpty>
                <div v-else class="ag-theme-alpine w-full shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:invert dark:hue-rotate-180">
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
