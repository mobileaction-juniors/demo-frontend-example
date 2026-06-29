<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { validateInput, showSuccessNotification } from '../../utils/keywordGeneratorActions';
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

const generatedKeywordNGrams = ref([]);
const hasInput = computed(() => sourceDescriptionText.value.trim().length > 0);
const hasGeneratedKeywords = computed(() => generatedKeywordNGrams.value.length > 0);
const totalGeneratedKeywordCount = computed(() => generatedKeywordNGrams.value.reduce((total, nGramCategory) => total + nGramCategory.keywords.length, 0));

const generateKeywordsOnDemand = () => {
    const cleanedText = sourceDescriptionText.value.trim()
        ? cleanDescription(
            sourceDescriptionText.value,
            shouldRemoveStopWords.value
        )
        : '';

    const isValid = validateInput(
        sourceDescriptionText.value,
        selectedNGrams.value,
        cleanedText,
        shouldRemoveStopWords.value
    );

    if (!isValid) {
        generatedKeywordNGrams.value = [];
        return;
    }
    
    const sortedNGrams = [...selectedNGrams.value].sort((a, b) => a - b);
    
    generatedKeywordNGrams.value = generateNGrams(cleanedText, sortedNGrams);
    
    const labels = sortedNGrams.map(n => `${n}-gram`).join(', ');
    showSuccessNotification(totalGeneratedKeywordCount.value, labels);
};

const resetKeywordInput = () => {
    const hadGeneratedKeywords = hasGeneratedKeywords.value;
    sourceDescriptionText.value = '';
    generatedKeywordNGrams.value = [];

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
                    <MaButton class="w-36" variant="stroke" icon="danger" iconAlignment="left" :disabled="!hasInput" @click="resetKeywordInput">
                        Clear Text
                    </MaButton>
                    <MaButton class="w-48" color="dark" variant="stroke" type="primary" :disabled="!hasInput" @click="generateKeywordsOnDemand">
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
            <MaCard 
                v-for="nGramCategory in generatedKeywordNGrams" 
                :key="nGramCategory.id"
                :title="nGramCategory.title"
            >
                <template #headerActions>
                    <MaBadge>{{ nGramCategory.keywords.length }}</MaBadge>
                </template>
                <div class="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                    <MaBadge 
                        v-for="keyword in nGramCategory.keywords" 
                        :key="keyword"
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
