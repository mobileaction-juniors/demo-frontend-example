<script setup>
import { MaBadge, MaInput, MaTextarea } from '@mobileaction/action-kit';
import { computed, ref } from 'vue';

const userInput = ref('');

// Keep the original ONB-201 result set visible by default while allowing 1–10 selection.
const selectedGramSizes = ref([1, 2, 3]);

// Seed the editable list with a short set of common words instead of imposing a large fixed stop-word dictionary.
const unwantedWords = ref('is, a, an, the');

// Define the supported range once so the selector and generation logic cannot drift apart.
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

// Require a selection so generation cannot run without a visible result section.
const hasSelectedGramSizes = computed(() => selectedGramSizes.value.length > 0);

// Normalize the input into lowercase words separated by single spaces.
const cleanInput = (input) => input
    .toLowerCase()
    // \p{L} matches Unicode letters and \p{N} matches Unicode numbers.
    // This preserves Turkish/non-ASCII text while removing punctuation.
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const cleanedUserInput = computed(() => cleanInput(userInput.value));
const hasCleanInput = computed(() => Boolean(cleanedUserInput.value));
const currentWordCount = computed(() => (hasCleanInput.value
    ? cleanedUserInput.value.split(' ').length
    : 0));

// The largest selection defines the word count required to generate every selected size.
const largestSelectedGramSize = computed(() => (hasSelectedGramSizes.value
    ? Math.max(...selectedGramSizes.value)
    : 0));
const hasEnoughWordsForSelectedGrams = computed(() => currentWordCount.value
    >= largestSelectedGramSize.value);

// Require enough words for the largest selection to avoid partially generated results.
const canGenerate = computed(() => hasSelectedGramSizes.value
    && hasCleanInput.value
    && hasEnoughWordsForSelectedGrams.value);
const validationMessage = computed(() => {
    if (!hasCleanInput.value && !hasSelectedGramSizes.value) {
        return 'Please enter text and select at least one n-gram size.';
    }

    if (!hasCleanInput.value) {
        return 'Please enter text to generate keywords.';
    }

    if (!hasSelectedGramSizes.value) {
        return 'Please select at least one n-gram size.';
    }

    // Tell the user the exact threshold needed to produce all selected result groups.
    return `Please enter at least ${largestSelectedGramSize.value} words to generate all selected n-gram sizes.`;
});

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

    // Guard direct calls with the same selection, input, and word-count validation as the button.
    if (!hasSelectedGramSizes.value || !cleanedInput || !hasEnoughWordsForSelectedGrams.value) {
        return;
    }

    const cleanedUnwantedWords = cleanInput(unwantedWords.value);

    // Normalize the editable comma/space-separated input before filtering for consistent matching.
    const unwantedWordSet = new Set(
        cleanedUnwantedWords ? cleanedUnwantedWords.split(' ') : [],
    );
    const words = cleanedInput
        ? cleanedInput.split(' ').filter((word) => !unwantedWordSet.has(word))
        : [];

    // Intentionally generate all 1–10 sizes so later selection changes never expose stale results.
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
        <p v-if="!canGenerate" role="alert">
            {{ validationMessage }}
        </p>

        <label for="unwanted-words">Unwanted words</label>
        <!-- Use ActionKit's input for consistent form behavior and appearance. -->
        <MaInput
            id="unwanted-words"
            v-model:value="unwantedWords"
            class="ma-unwanted-words-input"
            type="text"
        />

        <button
            type="button"
            :disabled="!canGenerate"
            @click="generateKeywords"
        >
            Generate Keywords
        </button>

        <section v-if="hasGenerated" class="ma-keyword-results" aria-live="polite">
            <div
                v-for="section in keywordSections"
                :key="section.title"
                class="ma-keyword-group"
            >
                <h2>{{ section.title }}</h2>
                <div v-if="section.keywords.length" class="ma-keyword-tags">
                    <!-- Generated results are read-only, so badges are more appropriate than MaTagInput. -->
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

/* An explicit group class avoids coupling this layout rule to direct-child markup. */
.ma-keyword-group {
    min-width: 0;
}

.ma-keyword-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

/* Override ActionKit's single-line badge sizing for long generated n-grams. */
.ma-keyword-tags :deep(.ak-badge) {
    max-width: 100%;
    max-height: none;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1rem;
}
</style>
