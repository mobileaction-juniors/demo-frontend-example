<script setup>
import { ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { ClientSideRowModelModule, ModuleRegistry, themeQuartz, ValidationModule } from 'ag-grid-community';
import { MaButton, MaTextarea } from '@mobileaction/action-kit';
import { cleanDescription } from '@/utils/CleanDescription';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ...(import.meta.env.DEV ? [ValidationModule] : [])
]);

const props = defineProps({
    text: {
        type: String,
        default: ''
    }
});

const inputText = ref(props.text);
const rowData = ref([]);

const colDefs = ref([
    { field: "keyword", headerName: "Keyword" },
    { field: "count", headerName: "Count" },
    { field: "density", headerName: "%" }
]);

const defaultColDef = {
    sortable: true,
    flex: 1,
    minWidth: 100
};

function submitText() {
    const cleanedText = cleanDescription(inputText.value);

    if (!cleanedText) {
        rowData.value = [];
        return;
    }

    const words = cleanedText.split(' ').filter((word) => word.length > 0);
    const totalWords = words.length;
    const keywordCounts = {};

    for (let i = 0; i < totalWords; i++) {
        const word = words[i];
        keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    }

    rowData.value = Object.keys(keywordCounts).map((keyword) => {
        const count = keywordCounts[keyword];
        const density = Number(((count / totalWords) * 100).toFixed(2));

        return {
            keyword,
            count,
            density
        };
    });
}
</script>

<template>
    <div class="mx-auto w-full max-w-[1000px] p-6">
        <div class="text-center">
            <h1 class="text-2xl font-semibold">Keyword Count & Density</h1>
        </div>
        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div class="w-full min-w-0">
                <MaTextarea
                    v-model="inputText"
                    placeholder="Paste an app description..."
                    :rows="8"
                />
                <div class="mt-4">
                    <MaButton
                        type="primary"
                        @click="submitText"
                    >
                        Submit
                    </MaButton>
                </div>
            </div>
            <div class="w-full min-w-0 overflow-x-auto">
                <AgGridVue
                    :theme="themeQuartz"
                    :row-data="rowData"
                    :column-defs="colDefs"
                    :default-col-def="defaultColDef"
                    class="h-[400px] w-full min-w-[300px]"    
                />
            </div>
        </div>
    </div>
</template>
