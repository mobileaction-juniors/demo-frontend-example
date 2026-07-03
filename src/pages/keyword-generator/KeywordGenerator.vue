<script setup>
import { ref, computed } from 'vue';

import { useKeywordStore } from '@/stores/keywordStore';
import { processKeywords } from '@/utils/keywordGeneratorActions';
import { MaTextarea, MaSelect2 as MaSelect, MaBadge, MaButton, MaCheckbox2 as MaCheckbox, MaCard, MaEmpty, MaNotification } from '@mobileaction/action-kit';

const keywordStore = useKeywordStore();

const selectedNGrams = ref([1, 2, 3]);
const shouldRemoveStopWords = ref(true);
const MAX_NGRAM_SIZE = 10;

const nGramOptions = Array.from({ length: MAX_NGRAM_SIZE }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}-Gram`
}));

const generatedKeywordNGrams = ref([]);
const hasInput = computed(() => keywordStore.sharedInputText.trim().length > 0);
const hasGeneratedKeywords = computed(() => generatedKeywordNGrams.value.length > 0);

const lastGeneratedState = ref({
    text: null,
    removeStopWords: null,
    nGrams: null
});
const hasStateChanged = computed(() => {
    const currentNGrams = [...selectedNGrams.value].sort().join(',');
    return keywordStore.sharedInputText !== lastGeneratedState.value.text ||
           shouldRemoveStopWords.value !== lastGeneratedState.value.removeStopWords ||
           currentNGrams !== lastGeneratedState.value.nGrams;
});


const generateKeywordsOnDemand = () => {
    const result = processKeywords(
        keywordStore.sharedInputText,
        selectedNGrams.value,
        shouldRemoveStopWords.value
    );

    if (!result.success) {
        generatedKeywordNGrams.value = [];
        MaNotification.error({
            title: result.error.errorTitle,
            message: result.error.errorMessage
        });
        return;
    }
    
    generatedKeywordNGrams.value = result.generatedKeywordNGrams;
    
    lastGeneratedState.value = {
        text: keywordStore.sharedInputText,
        removeStopWords: shouldRemoveStopWords.value,
        nGrams: [...selectedNGrams.value].sort().join(',')
    };
    
    MaNotification.success({
        title: 'Keywords Generated',
        message: `${result.totalCount} unique keyword${result.totalCount === 1 ? '' : 's'} created across ${result.labels}.`
    });
};

const resetKeywordInput = () => {
    const hadGeneratedKeywords = hasGeneratedKeywords.value;
    keywordStore.sharedInputText = '';
    generatedKeywordNGrams.value = [];
    lastGeneratedState.value = { text: null, removeStopWords: null, nGrams: null };

    MaNotification.success({
        title: 'Text Cleared',
        message: hadGeneratedKeywords
            ? 'The input and generated keyword results were cleared.'
            : 'The input text was cleared. No generated keyword results were present.'
    });
};
</script>

<template>
    <div class="p-5 max-w-5xl mx-auto font-sans">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2 text-slate-800">Keyword Generator</h1>
            <p class="text-gray-500 text-base m-0">Generate 1-{{ MAX_NGRAM_SIZE }} gram keywords from your text without duplicates.</p>
        </div>

        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <MaSelect
                v-model:value="selectedNGrams"
                :options="nGramOptions"
                multiple
                placeholder="Select N-Grams to generate"
                class="w-full max-w-md"
            />
            <MaCheckbox v-model:checked="shouldRemoveStopWords">
                <span class="text-gray-700 dark:text-slate-200 font-medium">Remove Stop Words</span>
            </MaCheckbox>
        </div>

        <div class="mb-8">
            <MaTextarea
                v-model="keywordStore.sharedInputText"
                placeholder="Enter your text here (e.g., app description)..."
                :rows="8"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p class="m-0 text-sm text-gray-500">
                    {{ hasInput ? 'Ready to generate keyword ideas.' : 'Paste a description to enable keyword actions.' }}
                </p>
                <div class="flex shrink-0 flex-row gap-3">
                    <MaButton class="w-36" variant="stroke" icon="danger" iconAlignment="left" :disabled="!hasInput" @click="resetKeywordInput">
                        Clear Text
                    </MaButton>
                    <MaButton class="w-48" color="dark" variant="stroke" type="primary" icon="data" iconAlignment="left" :disabled="!hasInput || !hasStateChanged" @click="generateKeywordsOnDemand">
                        Generate Keywords
                    </MaButton>
                </div>
            </div>
        </div>

        <div v-if="hasGeneratedKeywords" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <MaCard 
                class="ma-card !text-black"
                v-for="nGramCategory in generatedKeywordNGrams" 
                :key="nGramCategory.id"
                :title="nGramCategory.title"
            >
                <template #headerActions>
                    <MaBadge class="!text-white">{{ nGramCategory.keywords.length }}</MaBadge>
                </template>
                <div class="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                    <MaBadge 
                        v-for="keyword in nGramCategory.keywords" 
                        :key="keyword"
                        class="!text-white"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
                <MaEmpty v-if="nGramCategory.keywords.length === 0" :description="`No ${nGramCategory.id}-grams generated`"></MaEmpty>
            </MaCard>
        </div>
        <MaEmpty v-else description="Generated keywords will appear here after you enter text and run the generator."></MaEmpty>
    </div>
</template>
