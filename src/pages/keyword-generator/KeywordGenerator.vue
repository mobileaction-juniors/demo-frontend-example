<script setup>
import {
    MaButton,
    MaInput,
    MaSelect2,
    MaTagInput,
    MaTextarea,
} from '@mobileaction/action-kit';
import { computed, ref } from 'vue';
import { DEFAULT_STOP_WORDS } from '../../constants/stopWords';
import { cleanInput, generateUniqueNGrams } from '../../utils/keywordUtils';

const userInput = ref('');

// Keep the original ONB-201 result set visible by default while allowing 1–10 selection.
const selectedGramSizes = ref([1, 2, 3]);

// Start with common words while allowing users to edit the list.
const unwantedWords = ref(DEFAULT_STOP_WORDS.join(', '));

// Define the supported range once so the selector and generation logic cannot drift apart.
const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1);
const gramSizeSelectOptions = gramSizeOptions.map((gramSize) => ({
    label: String(gramSize),
    value: gramSize,
}));
const generatedKeywords = ref({
    1: [],
    2: [],
    3: [],
});

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

const cleanedUserInput = computed(() => cleanInput(userInput.value));
const hasCleanInput = computed(() => Boolean(cleanedUserInput.value));
const unwantedWordSet = computed(() => {
    const cleanedUnwantedWords = cleanInput(unwantedWords.value);

    return new Set(cleanedUnwantedWords ? cleanedUnwantedWords.split(' ') : []);
});
const filteredWords = computed(() => (hasCleanInput.value
    ? cleanedUserInput.value
        .split(' ')
        .filter((word) => !unwantedWordSet.value.has(word))
    : []));
const currentWordCount = computed(() => filteredWords.value.length);

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

    return `Please provide at least ${largestSelectedGramSize.value} words after unwanted words are removed.`;
});

const generateKeywords = () => {
    // Guard direct calls with the same selection, input, and word-count validation as the button.
    if (!canGenerate.value) {
        return;
    }

    // Intentionally generate all 1–10 sizes so later selection changes never expose stale results.
    generatedKeywords.value = Object.fromEntries(
        gramSizeOptions.map((gramSize) => [
            gramSize,
            generateUniqueNGrams(filteredWords.value, gramSize),
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

        <label for="gram-size-select">N-gram sizes</label>
        <!-- Stable Cypress hook around ActionKit's implementation-specific markup. -->
        <MaSelect2
            id="gram-size-select"
            data-testid="gram-size-select"
            v-model:value="selectedGramSizes"
            class="block w-full mt-2 mb-4"
            aria-describedby="keyword-validation"
            :options="gramSizeSelectOptions"
            multiple
            placeholder="Select n-gram sizes"
        />
        <!-- A polite status keeps validation accessible without interrupting users on every input change. -->
        <p
            v-if="!canGenerate"
            id="keyword-validation"
            role="status"
        >
            {{ validationMessage }}
        </p>

        <label for="unwanted-words">Unwanted words</label>
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
                    class="max-w-full"
                >
                    <!-- Disabled tag input renders generated keywords as read-only ActionKit tags. -->
                    <MaTagInput
                        :tags="section.keywords"
                        class="keyword-tags max-w-full max-h-none whitespace-normal break-anywhere leading-4"
                        disabled
                    />
                </div>
                <p v-else>No keywords generated.</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
:deep(.keyword-tags.ma-tag-input-wrapper) {
    border: none;
    background: transparent;
    padding: 0;
    box-shadow: none;
    min-height: 0;
}

:deep(.keyword-tags .ma-tag-input) {
    display: none;
}

:deep(.keyword-tags .ak-icon--close) {
    display: none;
}

:deep(.keyword-tags .single-tag) {
    padding-right: 8px;
}
</style>
