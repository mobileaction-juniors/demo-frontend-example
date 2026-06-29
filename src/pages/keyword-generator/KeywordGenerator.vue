<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { generateNGrams } from '../../utils/generateNGrams';
import { MaTextarea, MaSelect2 as MaSelect, MaBadge, MaButton, MaCheckbox2 as MaCheckbox, MaCard, MaEmpty, MaNotification } from '@mobileaction/action-kit';

const sourceDescriptionText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const shouldRemoveStopWords = ref(true);
const MAX_NGRAM_SIZE = 10;

const nGramOptions = Array.from({ length: MAX_NGRAM_SIZE }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}-Gram`
}));

const sortedSelectedNGrams = computed(() => [...selectedNGrams.value].sort((a, b) => a - b));

const cleanedSourceText = computed(() => {
    const text = sourceDescriptionText.value;
    if (!text.trim()) return '';
    
    return cleanDescription(text, shouldRemoveStopWords.value);
});

const generatedKeywordNGrams = ref([]);

const hasInput = computed(() => sourceDescriptionText.value.trim().length > 0);
const hasSelectedNGrams = computed(() => sortedSelectedNGrams.value.length > 0);
const hasGeneratedKeywords = computed(() => generatedKeywordNGrams.value.length > 0);
const totalGeneratedKeywordCount = computed(() => generatedKeywordNGrams.value.reduce((total, nGramCategory) => total + nGramCategory.keywords.length, 0));
const selectedNGramLabels = computed(() => sortedSelectedNGrams.value.map(nGram => `${nGram}-gram`).join(', '));

const lastGeneratedState = ref(null);

const isStale = computed(() => {
    if (!lastGeneratedState.value) return false;
    return lastGeneratedState.value.text === sourceDescriptionText.value &&
           lastGeneratedState.value.nGrams === sortedSelectedNGrams.value.join(',') &&
           lastGeneratedState.value.removeStopWords === shouldRemoveStopWords.value;
});

const generateKeywordsOnDemand = () => {
    if (!hasInput.value) {
        MaNotification.error({
            title: 'Text Required',
            message: 'Paste an app description or keyword list before generating keyword ideas.'
        });
        generatedKeywordNGrams.value = [];
        return;
    }

    if (!hasSelectedNGrams.value) {
        MaNotification.error({
            title: 'N-Gram Selection Required',
            message: 'Select at least one n-gram size so the generator knows which keyword groups to build.'
        });
        generatedKeywordNGrams.value = [];
        return;
    }

    if (!cleanedSourceText.value) {
        MaNotification.error({
            title: 'No Keywords After Cleaning',
            message: shouldRemoveStopWords.value
                ? 'Your text only contains stop words or unsupported characters. Add more descriptive words or turn off stop word removal.'
                : 'Your text only contains unsupported characters. Add words or phrases before generating keywords.'
        });
        generatedKeywordNGrams.value = [];
        return;
    }
    
    generatedKeywordNGrams.value = generateNGrams(cleanedSourceText.value, sortedSelectedNGrams.value);
    
    lastGeneratedState.value = {
        text: sourceDescriptionText.value,
        nGrams: sortedSelectedNGrams.value.join(','),
        removeStopWords: shouldRemoveStopWords.value
    };
    
    MaNotification.success({
        title: 'Keywords Generated',
        message: `${totalGeneratedKeywordCount.value} unique keyword${totalGeneratedKeywordCount.value === 1 ? '' : 's'} created across ${selectedNGramLabels.value}.`
    });
};

const resetKeywordInput = () => {
    const hadGeneratedKeywords = hasGeneratedKeywords.value;
    sourceDescriptionText.value = '';
    generatedKeywordNGrams.value = [];
    lastGeneratedState.value = null;

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
            <p class="text-gray-500 text-base m-0">Generate 1-10 gram keywords from your text without duplicates.</p>
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
                Remove Stop Words
            </MaCheckbox>
        </div>

        <div class="mb-8">
            <MaTextarea
                v-model="sourceDescriptionText"
                placeholder="Enter your text here (e.g., app description)..."
                :rows="8"
            />
            <div class="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p class="m-0 text-sm text-gray-500">
                    {{ hasInput ? 'Ready to generate keyword ideas.' : 'Paste a description to enable keyword actions.' }}
                </p>
                <div class="flex shrink-0 flex-row gap-3">
                    <MaButton class="w-36" :disabled="!hasInput" @click="resetKeywordInput">
                        <template #icon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 7.5h12M9.75 7.5v-.75A1.5 1.5 0 0 1 11.25 5.25h1.5a1.5 1.5 0 0 1 1.5 1.5v.75m-6.75 3v7.5m4.5-7.5v7.5m4.5-7.5v7.5M7.5 7.5l.75 12A1.5 1.5 0 0 0 9.75 21h4.5a1.5 1.5 0 0 0 1.5-1.5l.75-12" />
                            </svg>
                        </template>
                        Clear Text
                    </MaButton>
                    <MaButton class="w-48" type="primary" :disabled="!hasInput || isStale" @click="generateKeywordsOnDemand">
                        <template #icon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </template>
                        Generate Keywords
                    </MaButton>
                </div>
            </div>
        </div>

        <div v-if="hasGeneratedKeywords" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <MaCard v-for="nGramCategory in generatedKeywordNGrams" :key="nGramCategory.id">
                <h2 class="text-xl mb-4 text-gray-900 flex items-center justify-between mt-0">
                    <span>{{ nGramCategory.title }}</span>
                    <MaBadge>{{ nGramCategory.keywords.length }}</MaBadge>
                </h2>
                <div class="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                    <MaBadge 
                        v-for="keyword in nGramCategory.keywords" 
                        :key="keyword"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
                <MaEmpty v-if="nGramCategory.keywords.length === 0" :description="`No ${nGramCategory.id}-grams generated`">
                    <template #icon>
                        <span class="hidden"></span>
                    </template>
                </MaEmpty>
            </MaCard>
        </div>
        <MaEmpty v-else description="Generated keywords will appear here after you enter text and run the generator.">
            <template #icon>
                <span class="hidden"></span>
            </template>
        </MaEmpty>
    </div>
</template>
