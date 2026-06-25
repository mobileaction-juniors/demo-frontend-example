<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';
import { MaBadge, MaTextarea, MaButton, MaSelect2 as MaSelect, MaNotification } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([]);
const keywords = ref(null);
const errors = ref({});

const nGramSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nGramOptions = nGramSizes.map((size) => ({
    label: `${size}-gram`,
    value: size,
}));

function generateKeywords() {
    errors.value = {};

    if (!inputText.value.trim())      errors.value.text  = 'Enter text!';
    if (!selectedNGrams.value.length) errors.value.ngram = 'Select at least one n-gram size.';

    if (errors.value.text || errors.value.ngram) {
        keywords.value = null;
        return;
    }

    keywords.value = generateKeyword(inputText.value, selectedNGrams.value);

    if (keywords.value?.length) {
        MaNotification.success({ title: 'Keywords generated', description: `Found ${keywords.value.length} n-gram groups.` });
    } else {
        MaNotification.warning({ title: 'No keywords found', description: 'Try different text or smaller sizes.' });
    }
}

function resetKeywords() {
    inputText.value = '';
    selectedNGrams.value = [];
    keywords.value = null;
    errors.value = {};
    MaNotification.info({ title: 'Cleared', description: 'Inputs and results cleared.' });
}
</script>

<template>
    <div class="flex gap-10 max-w-240 my-12 mx-auto text-gray-800">
        <div class="flex flex-col gap-3 w-100">
            <h2>Keyword Generator</h2>
            <div>
                <MaTextarea v-model="inputText" :error="!!errors.text" placeholder="Enter text" :rows="3"/>
                <p v-if="errors.text" class="mt-1 text-xs text-red-500">{{ errors.text }}</p>
            </div>
            <MaSelect multiple :has-error="!!errors.ngram" :hint="errors.ngram" :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" @click="generateKeywords">Generate</MaButton>
            <MaButton variant="stroke" @click="resetKeywords">Reset Keywords</MaButton>
        </div>
        <div class="flex-1 border-l border-gray-200 pl-10">
            <div v-if="keywords && keywords.length">
                <div v-for="group in keywords" :key="group.ngram" class="p-4 bg-gray-50 rounded-lg mb-5">
                    <strong class="block mb-3">{{ group.ngram }}-gram ({{ group.keywords.length }})</strong>
                    <div class="flex flex-wrap gap-2">
                        <MaBadge v-for="keyword in group.keywords" :key="keyword" size="large" type="secondary" variant="teal">{{ keyword }}</MaBadge>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-400">Results will be in here</p>
        </div>
    </div>
</template>
