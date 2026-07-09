<script setup>
import {
    MaButton,
    MaInput,
    MaSelect2,
    MaTagInput,
    MaTextarea,
} from '@mobileaction/action-kit';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useKeywordStore } from '../../stores/keywordStore';

// Define the supported range once so the selector and generation logic cannot drift apart.
const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1);
const gramSizeSelectOptions = gramSizeOptions.map((gramSize) => ({
    label: String(gramSize),
    value: gramSize,
}));

const store = useKeywordStore();
const {
    keywordSections,
    hasGenerated,
    canGenerate,
    validationMessage,
} = storeToRefs(store);

const { generateKeywords } = store;

// Use store actions via computed setters to ensure stale results are cleared when inputs change
const userInput = computed({
    get: () => store.userInput,
    set: (value) => store.setUserInput(value),
});
const selectedGramSizes = computed({
    get: () => store.selectedGramSizes,
    set: (value) => store.setSelectedGramSizes(value),
});
const unwantedWords = computed({
    get: () => store.unwantedWords,
    set: (value) => store.setUnwantedWords(value),
});
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
