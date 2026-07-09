import { defineStore } from 'pinia';
import { DEFAULT_STOP_WORDS } from '../constants/stopWords';
import { cleanInput, generateUniqueNGrams } from '../utils/keywordUtils';

export const useKeywordStore = defineStore('keyword', {
    state: () => ({
        // Keyword Generator State
        userInput: '',
        selectedGramSizes: [1, 2, 3],
        // Dynamically format input stop words if constant is array, or pass string directly
        unwantedWords: Array.isArray(DEFAULT_STOP_WORDS)
            ? DEFAULT_STOP_WORDS.join(', ')
            : DEFAULT_STOP_WORDS,
        generatedKeywords: {
            1: [],
            2: [],
            3: [],
        },

        // Keyword Density State
        editableText: '',
        isDensityTextInitialized: false,
        results: [],
        hasCounted: false,
        copyStatus: '',
    }),

    getters: {
        // Keyword Generator Derived State
        cleanedUserInput(state) {
            return cleanInput(state.userInput);
        },
        hasCleanInput() {
            return Boolean(this.cleanedUserInput);
        },
        unwantedWordSet(state) {
            const cleanedUnwantedWords = cleanInput(state.unwantedWords);
            return new Set(cleanedUnwantedWords ? cleanedUnwantedWords.split(' ') : []);
        },
        filteredWords() {
            return this.hasCleanInput
                ? this.cleanedUserInput
                    .split(' ')
                    .filter((word) => !this.unwantedWordSet.has(word))
                : [];
        },
        currentWordCount() {
            return this.filteredWords.length;
        },
        hasSelectedGramSizes(state) {
            return state.selectedGramSizes.length > 0;
        },
        largestSelectedGramSize(state) {
            return this.hasSelectedGramSizes
                ? Math.max(...state.selectedGramSizes)
                : 0;
        },
        hasEnoughWordsForSelectedGrams() {
            return this.currentWordCount >= this.largestSelectedGramSize;
        },
        canGenerate() {
            return this.hasSelectedGramSizes
                && this.hasCleanInput
                && this.hasEnoughWordsForSelectedGrams;
        },
        validationMessage() {
            if (!this.hasCleanInput && !this.hasSelectedGramSizes) {
                return 'Please enter text and select at least one n-gram size.';
            }

            if (!this.hasCleanInput) {
                return 'Please enter text to generate keywords.';
            }

            if (!this.hasSelectedGramSizes) {
                return 'Please select at least one n-gram size.';
            }

            return `Please provide at least ${this.largestSelectedGramSize} words after unwanted words are removed.`;
        },
        keywordSections(state) {
            return state.selectedGramSizes
                .slice()
                .sort((firstSize, secondSize) => firstSize - secondSize)
                .map((gramSize) => ({
                    title: `${gramSize}-Gram`,
                    keywords: state.generatedKeywords[gramSize] ?? [],
                }));
        },
        hasGenerated() {
            return this.keywordSections.some((section) => section.keywords.length > 0);
        },

        // Keyword Density Derived State
        characterCount(state) {
            return state.editableText.length;
        },
    },

    actions: {
        // Keyword Generator Actions
        generateKeywords() {
            if (!this.canGenerate) {
                return;
            }

            const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1);
            this.generatedKeywords = Object.fromEntries(
                gramSizeOptions.map((gramSize) => [
                    gramSize,
                    generateUniqueNGrams(this.filteredWords, gramSize),
                ]),
            );
        },
        // Missing gram-size keys are read as empty arrays by keywordSections, so an empty object fully clears stale results.
        clearGeneratedKeywords() {
            this.generatedKeywords = {};
        },
        setUserInput(value) {
            this.userInput = value;
            this.clearGeneratedKeywords();
        },
        setSelectedGramSizes(value) {
            this.selectedGramSizes = value;
            this.clearGeneratedKeywords();
        },
        setUnwantedWords(value) {
            this.unwantedWords = value;
            this.clearGeneratedKeywords();
        },

        // Keyword Density Actions
        initializeDensityText(text) {
            // Seed the density text only once on first load so subsequent edits are independent of parent prop changes
            if (this.isDensityTextInitialized) {
                return;
            }
            this.editableText = text;
            this.isDensityTextInitialized = true;
        },
        countKeywords() {
            this.hasCounted = true;
            this.copyStatus = '';
            const cleanedText = cleanInput(this.editableText);

            if (!cleanedText) {
                this.results = [];
                return;
            }

            const words = cleanedText.split(' ');
            const keywordCounts = words.reduce((counts, keyword) => {
                counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
                return counts;
            }, new Map());

            this.results = [...keywordCounts.entries()]
                .map(([keyword, count]) => ({
                    keywordText: keyword,
                    count,
                    density: (count / words.length) * 100,
                }))
                .sort((firstResult, secondResult) => secondResult.count - firstResult.count
                    || firstResult.keywordText.localeCompare(secondResult.keywordText));
        },
        async copyResults() {
            const rows = this.results.map(({ keywordText, count, density }) => (
                `${keywordText}\t${count}\t${density.toFixed(1)}%`
            ));
            const clipboardText = ['Keyword\tCount\tDensity', ...rows].join('\n');

            try {
                await navigator.clipboard.writeText(clipboardText);
                this.copyStatus = 'Copied to clipboard.';
            } catch {
                this.copyStatus = 'Clipboard access is unavailable.';
            }
        },
    },
});
