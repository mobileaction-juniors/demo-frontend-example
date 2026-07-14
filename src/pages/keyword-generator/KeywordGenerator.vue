<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '@/utils/CleanDescription';
import { generateNGrams, MAX_N_GRAM } from '@/utils/GenerateNGrams';
import { MaBadge, MaButton, MaSelect2, MaTextarea } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([]);
const displayedKeywords = ref({});

const nGramOptions = Array.from({ length: MAX_N_GRAM }, (_, index) => ({
    label: `${index + 1}-gram`,
    value: index + 1
}));

const sortedSelectedNGrams = computed(() => {
    return [...selectedNGrams.value].sort((a, b) => a - b);
});

function generateKeywords() {
    const cleanedText = cleanDescription(inputText.value);

    if (!cleanedText) {
        displayedKeywords.value = {};
        return;
    }

    const wordsArray = cleanedText.split(' ').filter((word) => word.length > 0);

    if (wordsArray.length === 0) {
        displayedKeywords.value = {};
        return;
    }

    displayedKeywords.value = generateNGrams(wordsArray, MAX_N_GRAM);
}
</script>

<template>
    <div class="mx-auto max-w-[800px] p-6">
        <div class="text-center">
            <h1 class="text-2xl font-semibold">Keyword Generator</h1>
        </div>
        <!-- Text Area -->
        <div class="mt-5">
            <MaTextarea
                v-model="inputText"
                placeholder="Paste an app description..."
                :rows="8"
            />
        </div>
        <!-- Select Section -->
        <div class="mt-5 flex items-center gap-5">
            <label class="font-medium whitespace-nowrap">
                N-grams to show:
            </label>
            <MaSelect2
                v-model:value="selectedNGrams"
                multiple
                :options="nGramOptions"
                placeholder="Select n-grams"
                show-search
                class="flex-1 w-full"
            />
        </div>
        <!-- Button -->
        <div class="mt-5">
            <MaButton
                type="primary"
                icon="apple"
                @click="generateKeywords"
            >
                Generate Keywords
            </MaButton>
        </div>
        <!-- Results Section -->
        <div
            v-if="Object.keys(displayedKeywords).length > 0"
            class="mt-6"
        >
            <div
                v-for="n in sortedSelectedNGrams"
                :key="n"
                class="mb-5"
            >
                <h3 class="mb-2 font-semibold">
                    {{ n }}-gram:
                </h3>
                <p
                    v-if="!displayedKeywords[n] || displayedKeywords[n].length === 0"
                    class="mt-0"
                >
                    None
                </p>
                <div
                    v-else
                    class="flex flex-wrap gap-2"
                >
                    <MaBadge
                        v-for="keyword in displayedKeywords[n]"
                        :key="keyword"
                        class="w-fit"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
            </div>
        </div>
    </div>
</template>
