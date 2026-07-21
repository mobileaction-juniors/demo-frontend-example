<script setup>
import { ref } from 'vue';
import { useKeywordStore } from '@/stores/keyword';
import { storeToRefs } from 'pinia';
import { AgGridVue } from 'ag-grid-vue3';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { MaButton, MaTextarea } from '@mobileaction/action-kit';

const keywordStore = useKeywordStore();

const {
    densityInputText,
    densityRowData
} = storeToRefs(keywordStore);

const { calculateDensity } = keywordStore;

const modules = [
    ClientSideRowModelModule
];

const colDefs = ref([
    { field: "keyword", headerName: "Keyword" },
    { field: "count", headerName: "Count" },
    { field: "density", headerName: "%", valueFormatter: (params) => `${params.value}%` }
]);

const defaultColDef = {
    flex: 1,
    minWidth: 100
};
</script>

<template>
    <div class="mx-auto w-full max-w-[1200px] p-6">
        <div class="text-center">
            <h1 class="text-2xl font-semibold">
                Keyword Count & Density
            </h1>
        </div>
        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            <div class="w-full min-w-0">
                <MaTextarea
                    v-model="densityInputText"
                    placeholder="Paste an app description..."
                    :rows="8"
                />
                <div class="mt-4">
                    <MaButton
                        type="primary"
                        @click="calculateDensity"
                    >
                        Submit
                    </MaButton>
                </div>
            </div>
            <div class="w-full min-w-0 overflow-x-auto">
                <AgGridVue
                    :modules="modules"
                    :row-data="densityRowData"
                    :column-defs="colDefs"
                    :default-col-def="defaultColDef"
                    class="ag-theme-ma ag-theme-ma--secondary h-[400px] w-full min-w-[420px]"
                />
            </div>
        </div>
    </div>
</template>
