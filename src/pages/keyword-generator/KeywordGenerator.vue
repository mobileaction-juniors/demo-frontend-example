<script setup>
import {
    MaBadge,
    MaButton,
    MaInput,
    MaTextarea,
} from '@mobileaction/action-kit';
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
    <main class="max-w-[800px] mx-auto p-6">
        <h1>Keyword Generator</h1>

        <label for="keyword-input">Text</label>
        <MaTextarea
            id="keyword-input"
            v-model="userInput"
            class="block w-full mt-2 mb-4 box-border"
            :rows="8"
            aria-describedby="keyword-validation"
            placeholder="Enter text to generate keywords"
        />

        <fieldset
            class="flex flex-wrap gap-3 mb-4"
            aria-describedby="keyword-validation"
        >
            <legend>N-gram sizes</legend>
            <label
                v-for="gramSize in gramSizeOptions"
                :key="gramSize"
                class="inline-flex items-center gap-1"
            >
                <input
                    v-model="selectedGramSizes"
                    type="checkbox"
                    :value="gramSize"
                >
                {{ gramSize }}
            </label>
        </fieldset>
        <!-- A polite status keeps validation accessible without interrupting users on every input change. -->
        <p
            v-if="!canGenerate"
            id="keyword-validation"
            role="status"
        >
            {{ validationMessage }}
        </p>

        <label for="unwanted-words">Unwanted words</label>
        <!-- Use ActionKit's input for consistent form behavior and appearance. -->
        <MaInput
            id="unwanted-words"
            v-model:value="unwantedWords"
            class="block w-full mt-2 mb-4 box-border"
            type="text"
        />

        <MaButton
            html-type="button"
            icon="ai-sparkle"
            :disabled="!canGenerate"
            @click="generateKeywords"
        >
            Generate Keywords
        </MaButton>

        <section
            v-if="hasGenerated"
            class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 mt-6"
            aria-live="polite"
        >
            <div
                v-for="section in keywordSections"
                :key="section.title"
                class="min-w-0"
            >
                <h2>{{ section.title }}</h2>
                <div
                    v-if="section.keywords.length"
                    class="flex flex-wrap gap-2"
                >
                    <!-- Generated results are read-only, so badges are more appropriate than MaTagInput. -->
                    <MaBadge
                        v-for="keyword in section.keywords"
                        :key="keyword"
                        class="max-w-full max-h-none whitespace-normal [overflow-wrap:anywhere] leading-4"
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
