<script setup>
import { computed, ref, watchEffect } from 'vue'
import { MaInput, MaBadge, MaButton } from "@mobileaction/action-kit"

const selectedNGrams = ref([])
const inputText = ref('')
const nGrams = ref([])

// Defined excludeWords as a constant
const EXCLUDED_WORDS = 'is, a, an, the, in, of, text, and';

const excludedWordsArray = computed(() => {
    return EXCLUDED_WORDS.split(/\s*,\s*/).map(word => word.toLowerCase());
});

const filteredWords = computed(() => {
    return inputText.value.split(/\s+/).filter(word => word && !excludedWordsArray.value.includes(word.toLowerCase()));
});

const generateNGrams = () => {
    nGrams.value = []
    selectedNGrams.value.sort((a, b) => a - b)

    const currentWords = filteredWords.value

    selectedNGrams.value.forEach(n => {
        const nGramSet = new Set()

        for (let j = 0; j <= currentWords.length - n; j++) {
            const nGramCombination = currentWords.slice(j, j + n).join(' ')
            nGramSet.add(nGramCombination)
        }

        if (nGramSet.size) {
            nGrams.value.push({ n, combinations: Array.from(nGramSet) })
        }
    })
};

watchEffect(() => {
    localStorage.setItem('inputText', inputText.value)
});
</script>

<template>
    <div class="ma-keywords-generator p-4">
        <div class="ma-header mb-4">
            <label for="allwords" class="text-xl font-bold">Keyword Generator</label>
        </div>
        <MaInput id="allwords" 
                v-model:value="inputText" 
                type="textarea" 
                hint-text="Please select how you want to see n-grams and don't forget to use ',' for different excluded words." 
                class="input-area resize-none w-full p-2 mb-1" 
                style="resize: none;">
        </MaInput>
        <div class="mb-4 text-sm">Checked N-Grams: {{ selectedNGrams }}</div>
        <div class="flex flex-wrap mb-4 space-x-2">
            <div v-for="index in Math.min(filteredWords.length, 10)" :key="index" class="flex items-center space-x-1">
                <input type="checkbox" :id="'n' + index" :value="index" v-model="selectedNGrams" class="mr-1">
                <label :for="'n' + index">{{ index }}</label>
            </div>
        </div>
        <label for="excludeWords" class="block mb-2">Exclude Words:</label>
        <input type="text" id="excludeWords" :value="EXCLUDED_WORDS" disabled class="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded mb-4 transition-all duration-500 ease-in-out">
        <MaButton class="submit-button mb-4 w-full md:w-auto transition-all duration-500 ease-in-out" 
                type="primary" 
                variant="dark" 
                icon="tick" 
                @click="generateNGrams">Submit</MaButton>
        <div class="preview space-y-4" v-for="(keyword, index) in nGrams" :key="index">
            <strong>{{ keyword.n + "-gram:" }}</strong>
            <div class="flex flex-wrap">
                <div v-for="tag in keyword.combinations" :key="tag" class="m-1">
                    <MaBadge shape="square" variant="dark" type="secondary" size="medium">
                        <MaBadge shape="dot" variant="dark"/> {{ tag }}
                    </MaBadge>
                </div>
            </div>
        </div>
    </div>
</template>
