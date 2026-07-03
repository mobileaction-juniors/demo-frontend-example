<script setup>
import { computed, ref } from 'vue';

// Store the input and generated keyword groups as reactive state.
const userInput = ref('');
const generatedKeywords = ref({
    oneGram: [],
    twoGram: [],
    threeGram: [],
});

// Provide a single data source for rendering each n-gram result section.
const keywordSections = computed(() => [
    {
        title: '1-Gram',
        keywords: generatedKeywords.value.oneGram,
    },
    {
        title: '2-Gram',
        keywords: generatedKeywords.value.twoGram,
    },
    {
        title: '3-Gram',
        keywords: generatedKeywords.value.threeGram,
    },
]);

const hasGenerated = computed(() => keywordSections.value
    .some((section) => section.keywords.length > 0));

// Normalize the input into lowercase words separated by single spaces.
const cleanInput = (input) => input
    .toLowerCase()
    // \p{L} matches Unicode letters and \p{N} matches Unicode numbers.
    // This preserves Turkish/non-ASCII text while removing punctuation.
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');

// Build unique consecutive word groups while preserving their original order.
const generateUniqueNGrams = (words, gramSize) => {
    const keywords = [];

    for (let index = 0; index <= words.length - gramSize; index += 1) {
        keywords.push(words.slice(index, index + gramSize).join(' '));
    }

    return [...new Set(keywords)];
};

// Clean the current input and generate the required ONB-201 n-gram groups.
const generateKeywords = () => {
    const cleanedInput = cleanInput(userInput.value);
    const words = cleanedInput ? cleanedInput.split(' ') : [];

    generatedKeywords.value = {
        oneGram: generateUniqueNGrams(words, 1),
        twoGram: generateUniqueNGrams(words, 2),
        threeGram: generateUniqueNGrams(words, 3),
    };
};
</script>

<template>
    <main class="ma-keyword-generator">
        <h1>Keyword Generator</h1>

        <label for="keyword-input">Text</label>
        <textarea
            id="keyword-input"
            v-model="userInput"
            class="ma-keyword-input"
            rows="8"
            placeholder="Enter text to generate keywords"
        />
        <button type="button" @click="generateKeywords">
            Generate Keywords
        </button>

        <section v-if="hasGenerated" class="ma-keyword-results" aria-live="polite">
            <div v-for="section in keywordSections" :key="section.title">
                <h2>{{ section.title }}</h2>
                <ul v-if="section.keywords.length">
                    <li v-for="keyword in section.keywords" :key="keyword">
                        {{ keyword }}
                    </li>
                </ul>
                <p v-else>No keywords generated.</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* Keep the generator content centered and comfortably spaced. */
.ma-keyword-generator {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
}

/* Let the text input fill the available content width. */
.ma-keyword-input {
    display: block;
    width: 100%;
    margin: 8px 0 16px;
    box-sizing: border-box;
}

/* Arrange the result groups responsively across the available space. */
.ma-keyword-results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
    margin-top: 24px;
}
</style>
