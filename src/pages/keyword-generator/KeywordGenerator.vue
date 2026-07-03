<script setup>
import { ref, computed, onActivated } from 'vue';
import { MaBadge, MaTextarea, MaButton, MaSelect2 as MaSelect, MaNotification, MaEmpty, MaCollapse, MaCollapseItem, MaCard } from '@mobileaction/action-kit';
import { generateKeyword } from '@/utils/NGramUtils';
import { useTextStore } from '@/stores/text';

defineOptions({ name: 'KeywordGenerator' });

const textStore = useTextStore();

const DEFAULT_NGRAMS = [1, 2, 3];
const selectedNGrams = ref([...DEFAULT_NGRAMS]);
const keywords = ref([]);
const errors = ref({ text: '', ngram: '' });
const hasSearched = ref(false);
const expandedGroups = ref([]);
const currentInput = computed(() => `${textStore.text}|${selectedNGrams.value.join(',')}`);
const lastGeneratedInput = ref(null);
const isUnchanged = computed(() => currentInput.value === lastGeneratedInput.value);
const isResetDisabled = computed(() =>
    !textStore.text.trim() && selectedNGrams.value.length === 0 && keywords.value.length === 0,
);

const MAX_N_GRAM = 10;
const nGramOptions = Array.from({ length: MAX_N_GRAM }, (_, i) => ({
    label: `${i + 1}-gram`,
    value: i + 1,
}));

function validate() {
    errors.value = { text: '', ngram: '' };
    if (!textStore.text.trim())       errors.value.text  = 'Enter text!';
    if (!selectedNGrams.value.length) errors.value.ngram = 'Select at least one n-gram size.';
    return Object.values(errors.value).every((message) => !message);
}

function clearResults() {
    keywords.value = [];
    hasSearched.value = false;
    expandedGroups.value = [];
}

function notifyResult(keywordCount) {
    if (keywordCount) {
        MaNotification.success({ title: 'Keywords generated', description: `Found ${keywordCount} keywords.` });
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
    keywords.value = generateKeyword(textStore.text, selectedNGrams.value);
    expandedGroups.value = keywords.value.map((group) => String(group.ngram));

    const keywordCount = keywords.value.reduce((sum, group) => sum + group.keywords.length, 0);
    notifyResult(keywordCount);
    lastGeneratedInput.value = currentInput.value;
}

onActivated(() => {
    selectedNGrams.value = [...DEFAULT_NGRAMS];
});

function resetKeywords() {
    textStore.text = '';
    selectedNGrams.value = [];
    errors.value = { text: '', ngram: '' };
    lastGeneratedInput.value = currentInput.value;
    clearResults();
    MaNotification.info({ title: 'Cleared', description: 'Inputs and results cleared.' });
}
</script>

<template>
    <div class="flex max-lg:flex-col gap-10 max-w-360 my-12 mx-auto px-6 text-gray-800">
        <div class="flex flex-col gap-3 w-full lg:flex-1 lg:max-w-120">
            <h2 class="text-2xl font-bold text-gray-900">Keyword Generator</h2>
            <div>
                <MaTextarea v-model="textStore.text" :error="!!errors.text" placeholder="Enter text" :rows="16"/>
                <p v-if="errors.text" class="mt-1 text-xs text-red-500">{{ errors.text }}</p>
            </div>
            <MaSelect multiple :has-error="!!errors.ngram" :hint="errors.ngram" :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" icon="ai-sparkle" :disabled="isUnchanged" @click="generateKeywords">Generate</MaButton>
            <MaButton variant="stroke" icon="refresh" :disabled="isResetDisabled" @click="resetKeywords">Reset Keywords</MaButton>
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
                        <div v-if="group.keywords.length" class="flex flex-wrap gap-2">
                            <MaBadge v-for="keyword in group.keywords" :key="keyword" size="large" type="secondary" variant="teal" class="whitespace-normal break-words">{{ keyword }}</MaBadge>
                        </div>
                        <p v-else class="text-sm text-gray-500">No n-gram result</p>
                    </template>
                </MaCollapseItem>
            </MaCollapse>
            <MaEmpty v-else-if="hasSearched" title="No keywords found" description="Try different text or smaller sizes."/>
            <MaEmpty v-else title="No results yet" description="Generate keywords to see them here."/>
        </MaCard>
    </div>
</template>
