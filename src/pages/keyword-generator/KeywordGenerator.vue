<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';
import { MaBadge, MaTextarea, MaButton, MaSelect2 } from '@mobileaction/action-kit';

const inputText = ref('');
const keywords = ref(null);
const error = ref('');

const nGramSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nGramOptions = nGramSizes.map((size) => ({
    label: `${size}-gram`,
    value: size,
}));
const selectedNGrams = ref([]);

function generate(){
    error.value = '';

    if (!inputText.value.trim()) {
        error.value = 'Enter text!';
        keywords.value = null;
        return;
    }

    if (!selectedNGrams.value.length) {
        error.value = 'Select at least one n-gram size.';
        keywords.value = null;
        return;
    }

    keywords.value = generateKeyword(inputText.value, selectedNGrams.value);

    if (!keywords.value) {
        error.value = 'No keywords could be extracted.';
    }
}

function resetKeywords(){
    keywords.value = null;
    error.value = '';
    inputText.value = '';
    selectedNGrams.value = [];
}
</script>

<template>
    <div class="flex gap-10 max-w-[960px] my-12 mx-auto px-5 font-sans text-[#2c3e50]">
        <div class="flex flex-col gap-3 basis-[400px] shrink-0">
            <h2 class="m-0">Keyword Generator</h2>
            <MaTextarea v-model="inputText" placeholder="Enter text" :rows="3"/>
            <MaSelect2 multiple :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" @click="generate">Generate</MaButton>
            <MaButton variant="stroke" @click="resetKeywords">Reset Keywords</MaButton>
        </div>
        <div class="flex-1 border-l border-[#eee] pl-10">
            <div v-if="keywords">
                <div v-for="group in keywords" :key="group.ngram" class="p-4 bg-[#fafafa] rounded-lg mb-5">
                    <strong class="block mb-3 text-base">{{ group.ngram }}-gram ({{ group.keywords.length }})</strong>
                    <div class="flex flex-wrap gap-2">
                        <MaBadge v-for="keyword in group.keywords" :key="keyword" size="large" type="secondary" variant="teal">{{ keyword }}</MaBadge>
                    </div>
                </div>
            </div>
            <p v-else-if="error" class="text-[red]">{{ error }}</p>
            <p v-else class="text-[#bbb]">Results will be in here</p>
        </div>
    </div>
</template>
