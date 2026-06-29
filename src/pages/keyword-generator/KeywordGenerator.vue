<script setup>
import { ref, computed } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';
import { MaBadge, MaTextarea, MaButton, MaSelect2 as MaSelect, MaNotification, MaEmpty, MaCollapse, MaCollapseItem, MaCard } from '@mobileaction/action-kit';

defineOptions({ name: 'KeywordGenerator' });

const inputText = ref('');
const selectedNGrams = ref([]);
const keywords = ref([]);
const errors = ref({ text: '', ngram: '' });
const hasSearched = ref(false);
const expandedGroups = ref([]);
const currentInput = computed(() => `${inputText.value}|${selectedNGrams.value.join(',')}`);
const lastGeneratedInput = ref(currentInput.value);
const isUnchanged = computed(() => currentInput.value === lastGeneratedInput.value);
const isEmpty = computed(() => !inputText.value.trim() && selectedNGrams.value.length === 0);

const MAX_N_GRAM = 10;
const nGramSizes = Array.from({ length: MAX_N_GRAM }, (_, i) => i + 1);
const nGramOptions = nGramSizes.map((size) => ({
    label: `${size}-gram`,
    value: size,
}));

function validate() {
    errors.value = { text: '', ngram: '' };
    if (!inputText.value.trim())      errors.value.text  = 'Enter text!';
    if (!selectedNGrams.value.length) errors.value.ngram = 'Select at least one n-gram size.';
    return Object.values(errors.value).every((message) => !message);
}

function clearResults() {
    keywords.value = [];
    hasSearched.value = false;
    expandedGroups.value = [];
}

function notifyResult(groupCount) {
    if (groupCount) {
        MaNotification.success({ title: 'Keywords generated', description: `Found ${groupCount} n-gram groups.` });
    } else {
        MaNotification.warning({ title: 'No keywords found', description: 'Try different text or smaller sizes.' });
    }
}

function generateKeywords() {
    if (!validate()) {
        clearResults();
        return;
    }

    hasSearched.value = true;
    keywords.value = generateKeyword(inputText.value, selectedNGrams.value);
    expandedGroups.value = keywords.value.map((group) => String(group.ngram));

    notifyResult(keywords.value.length);
    lastGeneratedInput.value = currentInput.value;
}

function resetKeywords() {
    inputText.value = '';
    selectedNGrams.value = [];
    errors.value = { text: '', ngram: '' };
    lastGeneratedInput.value = currentInput.value;
    clearResults();
    MaNotification.info({ title: 'Cleared', description: 'Inputs and results cleared.' });
}
</script>

<template>
    <div class="flex flex-col md:flex-row gap-6 md:gap-10 max-w-360 my-8 md:my-12 mx-auto px-6 text-gray-800">
        <div class="flex flex-col gap-3 w-full md:w-120">
            <h2 class="text-2xl font-bold text-gray-900">Keyword Generator</h2>
            <div>
                <MaTextarea v-model="inputText" :error="!!errors.text" placeholder="Enter text" :rows="16"/>
                <p v-if="errors.text" class="mt-1 text-xs text-red-500">{{ errors.text }}</p>
            </div>
            <MaSelect multiple :has-error="!!errors.ngram" :hint="errors.ngram" :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" icon="ai-sparkle" :disabled="isUnchanged" @click="generateKeywords">Generate</MaButton>
            <MaButton variant="stroke" icon="refresh" :disabled="isEmpty" @click="resetKeywords">Reset Keywords</MaButton>
        </div>
        <MaCard class="flex-1 min-w-0" title="Results" bordered>
            <MaCollapse v-if="keywords.length" v-model:expanded-values="expandedGroups" mode="multiple">
                <MaCollapseItem
                    v-for="group in keywords"
                    :key="group.ngram"
                    :value="String(group.ngram)"
                    :title="`${group.ngram}-gram (${group.keywords.length})`"
                >
                    <template #content>
                        <div class="flex flex-wrap gap-2">
                            <MaBadge v-for="keyword in group.keywords" :key="keyword" size="large" type="secondary" variant="teal" class="whitespace-normal break-words">{{ keyword }}</MaBadge>
                        </div>
                    </template>
                </MaCollapseItem>
            </MaCollapse>
            <MaEmpty v-else-if="hasSearched" title="No keywords found" description="Try different text or smaller sizes."/>
            <MaEmpty v-else title="No results yet" description="Generate keywords to see them here."/>
        </MaCard>
    </div>
</template>
