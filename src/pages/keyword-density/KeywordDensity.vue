<script setup>
import { MaButton, MaTextarea } from '@mobileaction/action-kit';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';
import { storeToRefs } from 'pinia';
import { useKeywordStore } from '../../stores/keywordStore';

// Register Community features only; shared column defaults enable sorting.
ModuleRegistry.registerModules([AllCommunityModule]);

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

const store = useKeywordStore();

// Seed local state once so textarea edits remain independent of the parent prop.
store.initializeDensityText(props.text);

const {
    editableText,
    characterCount,
    results,
    hasCounted,
    copyStatus,
} = storeToRefs(store);

const { countKeywords, copyResults } = store;

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
        valueFormatter: (params) => (params.value != null ? `${params.value.toFixed(1)}%` : ''),
    },
];
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
                    size="small"
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
