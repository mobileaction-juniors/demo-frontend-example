<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { generateNGrams } from '../../utils/generateNGrams';
import { MaTextarea, MaSelect2 as MaSelect, MaBadge, MaButton, MaCheckbox2 as MaCheckbox, MaCard, MaEmpty } from '@mobileaction/action-kit';

const sourceDescriptionText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const shouldRemoveStopWords = ref(true);
const maxNumberForNgram = 10;

const nGramOptions = Array.from({ length: maxNumberForNgram }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}-Gram`
}));

const generatedKeywordNGrams = computed(() => {
    const text = sourceDescriptionText.value;
    if (!text.trim()) return [];

    const cleanedText = cleanDescription(text, shouldRemoveStopWords.value);
    
    const sortedNGrams = [...selectedNGrams.value].sort((a, b) => a - b);
    return generateNGrams(cleanedText, sortedNGrams);
});

const resetKeywordInput = () => {
    sourceDescriptionText.value = '';
};
</script>

<template>
    <div class="p-5 max-w-5xl mx-auto font-sans">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2 text-slate-800">Keyword Generator</h1>
            <p class="text-gray-500 text-base m-0">Generate 1-10 gram keywords from your text without duplicates.</p>
        </div>

        <div class="mb-6 flex items-center justify-between">
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
            <div class="mt-3 flex justify-end" v-if="sourceDescriptionText.trim().length > 0">
                <MaButton @click="resetKeywordInput">Clear Text</MaButton>
            </div>
        </div>

        <div v-if="sourceDescriptionText.trim().length > 0" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                <MaEmpty v-if="nGramCategory.keywords.length === 0" :description="`No ${nGramCategory.id}-grams generated`" />
            </MaCard>
        </div>
    </div>
</template>
