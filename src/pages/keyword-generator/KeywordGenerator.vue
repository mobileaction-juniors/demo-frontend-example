<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { generateNGrams } from '../../utils/generateNGrams';
import { MaTextarea as MaInput2, MaSelect2, MaBadge, MaButton, MaCheckbox } from '@mobileaction/action-kit';

const sourceDescriptionText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const shouldRemoveStopWords = ref(true);

const nGramOptions = [
    { value: 1, label: '1-Gram' },
    { value: 2, label: '2-Gram' },
    { value: 3, label: '3-Gram' },
    { value: 4, label: '4-Gram' },
    { value: 5, label: '5-Gram' },
    { value: 6, label: '6-Gram' },
    { value: 7, label: '7-Gram' },
    { value: 8, label: '8-Gram' },
    { value: 9, label: '9-Gram' },
    { value: 10, label: '10-Gram' },
];

const generatedKeywordNGrams = computed(() => {
    const text = sourceDescriptionText.value;
    if (!text.trim()) return [];

    const cleanedText = cleanDescription(text, shouldRemoveStopWords.value);
    
    return generateNGrams(cleanedText, selectedNGrams.value);
});
</script>

<template>
    <div class="p-5 max-w-5xl mx-auto font-sans">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2 text-slate-800">Keyword Generator</h1>
            <p class="text-gray-500 text-base m-0">Generate 1-10 gram keywords from your text without duplicates.</p>
        </div>

        <div class="mb-6 flex items-center justify-between">
            <MaSelect2
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
            <MaInput2
                v-model="sourceDescriptionText"
                placeholder="Enter your text here (e.g., app description)..."
                :rows="8"
            />
            <div class="mt-3 flex justify-end" v-if="sourceDescriptionText.trim().length > 0">
                <MaButton @click="sourceDescriptionText = ''">Clear Text</MaButton>
            </div>
        </div>

        <div v-if="sourceDescriptionText.trim().length > 0" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="nGramCategory in generatedKeywordNGrams" :key="nGramCategory.id" class="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                <h2 class="text-xl mb-4 text-gray-900 flex items-center justify-between mt-0">
                    <span>{{ nGramCategory.title }}</span>
                    <span class="text-base bg-gray-200 py-1 px-2 rounded-xl text-gray-600">{{ nGramCategory.keywords.length }}</span>
                </h2>
                <div class="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                    <MaBadge 
                        v-for="keyword in nGramCategory.keywords" 
                        :key="keyword"
                        class="mr-1 mb-1"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
                <div v-if="nGramCategory.keywords.length === 0" class="text-gray-400 italic mt-3">No {{ nGramCategory.id }}-grams generated</div>
            </div>
        </div>
    </div>
</template>
