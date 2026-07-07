<script setup>
import { MaButton, MaTextarea } from '@mobileaction/action-kit';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { computed, ref } from 'vue';
import { cleanInput } from '../../utils/keywordUtils';

// Register Community features only; shared column defaults enable sorting.
ModuleRegistry.registerModules([AllCommunityModule]);

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

// Seed local state once so textarea edits remain independent of the parent prop.
const editableText = ref(props.text);
// Count every character in the raw textarea value, including whitespace.
const characterCount = computed(() => editableText.value.length);
const results = ref([]);
const hasCounted = ref(false);
const copyStatus = ref('');
const defaultColDef = {
    sortable: true,
};
const columnDefs = [
    {
        field: 'keywordText',
        headerName: 'Keyword',
        flex: 3,
        minWidth: 120,
    },
    {
        field: 'count',
        headerName: 'Count',
        flex: 1,
        minWidth: 70,
        headerClass: 'ag-right-aligned-header',
        cellClass: 'ag-right-aligned-cell',
    },
    {
        field: 'density',
        headerName: 'Density',
        flex: 1,
        minWidth: 70,
        headerClass: 'ag-right-aligned-header',
        cellClass: 'ag-right-aligned-cell',
        comparator: (firstDensity, secondDensity) => (
            Number.parseFloat(firstDensity) - Number.parseFloat(secondDensity)
        ),
    },
];

const countKeywords = () => {
    hasCounted.value = true;
    copyStatus.value = '';
    const cleanedText = cleanInput(editableText.value);

    if (!cleanedText) {
        results.value = [];
        return;
    }

    const words = cleanedText.split(' ');
    const keywordCounts = words.reduce((counts, keyword) => {
        counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
        return counts;
    }, new Map());

    // Keep one row per keyword for direct sorting in AG Grid.
    results.value = [...keywordCounts.entries()]
        .map(([keyword, count]) => ({
            keywordText: keyword,
            count,
            // Density uses every word occurrence, not the number of unique keywords.
            density: `${((count / words.length) * 100).toFixed(1)}%`,
        }))
        // Sort keywords by frequency, then alphabetically for stable ties.
        .sort((firstResult, secondResult) => secondResult.count - firstResult.count
            || firstResult.keywordText.localeCompare(secondResult.keywordText));
};

const copyResults = async () => {
    // Mirror the visible columns in a readable tab-separated clipboard format.
    const rows = results.value.map(({ keywordText, count, density }) => (
        `${keywordText}\t${count}\t${density}`
    ));
    const clipboardText = ['Keyword\tCount\tDensity', ...rows].join('\n');

    try {
        await navigator.clipboard.writeText(clipboardText);
        copyStatus.value = 'Copied to clipboard.';
    } catch {
        copyStatus.value = 'Clipboard access is unavailable.';
    }
};
</script>

<template>
    <!-- Mobile stacks the panels; desktop keeps input and results side by side. -->
    <section class="grid w-full gap-6 md:grid-cols-2 md:items-start">
        <div class="w-full min-w-0">
            <label
                for="keyword-density-text"
                class="block mb-2 text-sm font-medium text-gray-700"
            >
                Text
            </label>
            <!-- Enter remains available for multiline input; counting is button-triggered. -->
            <MaTextarea
                id="keyword-density-text"
                v-model="editableText"
                class="block w-full max-w-full box-border"
                :rows="14"
            />

            <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
                <MaButton
                    html-type="button"
                    color="red"
                    size="small"
                    class="!border-red-700 !bg-red-700 !text-white hover:!border-red-800 hover:!bg-red-800"
                    @click="countKeywords"
                >
                    Count
                </MaButton>
                <p
                    class="text-sm text-gray-600"
                    aria-live="polite"
                >
                    Total characters:
                    <strong class="ml-1 text-lg font-bold text-gray-900">{{ characterCount }}</strong>
                </p>
            </div>
        </div>

        <div class="w-full min-w-0">
            <h2 class="mb-2 text-sm font-medium text-gray-700">
                Results
            </h2>
            <div
                v-if="results.length"
            >
                <div class="w-full max-w-full overflow-hidden rounded border border-[#e8e7f0]">
                    <AgGridVue
                        class="w-full"
                        :column-defs="columnDefs"
                        :default-col-def="defaultColDef"
                        :row-data="results"
                        dom-layout="autoHeight"
                    />
                </div>
                <div class="flex flex-wrap items-center gap-3 mt-3">
                    <MaButton
                        html-type="button"
                        variant="stroke"
                        color="blue"
                        size="small"
                        @click="copyResults"
                    >
                        Copy to clipboard
                    </MaButton>
                    <span
                        v-if="copyStatus"
                        class="text-sm text-gray-600"
                        role="status"
                    >
                        {{ copyStatus }}
                    </span>
                </div>
            </div>
            <p
                v-else
                class="flex min-h-48 items-center justify-center rounded border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500"
                role="status"
            >
                {{ hasCounted ? 'No keywords found.' : 'Count the text to see keyword density results.' }}
            </p>
        </div>
    </section>
</template>
