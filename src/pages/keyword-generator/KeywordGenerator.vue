<script setup>
import { MaBadge, MaTextarea } from '@mobileaction/action-kit';
import { computed, ref } from 'vue';

// Store the input and generated keyword groups as reactive state.
const userInput = ref('');
const selectedGramSizes = ref([1, 2, 3]);
const unwantedWords = ref('is, a, an, the');
const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1);
const generatedKeywords = ref({
    1: [],
    2: [],
    3: [],
});

// Provide a single data source for rendering each n-gram result section.
const keywordSections = computed(() => selectedGramSizes.value
    .slice()
    .sort((firstSize, secondSize) => firstSize - secondSize)
    .map((gramSize) => ({
        title: `${gramSize}-Gram`,
        keywords: generatedKeywords.value[gramSize] ?? [],
    })));

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

// Clean the current input and generate the selected n-gram groups.
const generateKeywords = () => {
    const cleanedInput = cleanInput(userInput.value);
    const cleanedUnwantedWords = cleanInput(unwantedWords.value);
    const unwantedWordSet = new Set(
        cleanedUnwantedWords ? cleanedUnwantedWords.split(' ') : [],
    );
    const words = cleanedInput
        ? cleanedInput.split(' ').filter((word) => !unwantedWordSet.has(word))
        : [];

    generatedKeywords.value = Object.fromEntries(
        gramSizeOptions.map((gramSize) => [
            gramSize,
            generateUniqueNGrams(words, gramSize),
        ]),
    );
};
</script>

<template>
    <main class="ma-keyword-generator">
        <h1>Keyword Generator</h1>

        <label for="keyword-input">Text</label>
        <MaTextarea
            id="keyword-input"
            v-model="userInput"
            class="ma-keyword-input"
            :rows="8"
            placeholder="Enter text to generate keywords"
        />

        <fieldset class="ma-keyword-options">
            <legend>N-gram sizes</legend>
            <label
                v-for="gramSize in gramSizeOptions"
                :key="gramSize"
                class="ma-keyword-option"
            >
                <input
                    v-model="selectedGramSizes"
                    type="checkbox"
                    :value="gramSize"
                >
                {{ gramSize }}
            </label>
        </fieldset>

        <label for="unwanted-words">Unwanted words</label>
        <input
            id="unwanted-words"
            v-model="unwantedWords"
            class="ma-unwanted-words-input"
            type="text"
        >

        <button type="button" @click="generateKeywords">
            Generate Keywords
        </button>

        <section v-if="hasGenerated" class="ma-keyword-results" aria-live="polite">
            <div v-for="section in keywordSections" :key="section.title">
                <h2>{{ section.title }}</h2>
                <div v-if="section.keywords.length" class="ma-keyword-tags">
                    <MaBadge
                        v-for="keyword in section.keywords"
                        :key="keyword"
                        shape="rounded"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
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

.ma-keyword-options {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0 0 16px;
}

.ma-keyword-option {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.ma-unwanted-words-input {
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

.ma-keyword-results > div {
    min-width: 0;
}

.ma-keyword-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ma-keyword-tags :deep(.ak-badge) {
    max-width: 100%;
    max-height: none;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1rem;
}
</style>
