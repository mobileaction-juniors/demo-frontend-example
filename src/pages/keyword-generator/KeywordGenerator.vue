<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';
import { MaBadge, MaTextarea, MaButton, MaSelect2 as MaSelect, MaNotification, MaEmpty, MaCollapse, MaCollapseItem, MaCard } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([]);
const keywords = ref(null);
const errors = ref({});
const hasSearched = ref(false);
const expandedGroups = ref([]);

const nGramSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nGramOptions = nGramSizes.map((size) => ({
    label: `${size}-gram`,
    value: size,
}));

function generateKeywords() {
    errors.value = {};

    if (!inputText.value.trim())      errors.value.text  = 'Enter text!';
    if (!selectedNGrams.value.length) errors.value.ngram = 'Select at least one n-gram size.';

    if (errors.value.text || errors.value.ngram) {
        keywords.value = null;
        return;
    }

    hasSearched.value = true;
    keywords.value = generateKeyword(inputText.value, selectedNGrams.value);

    if (keywords.value?.length) {
        expandedGroups.value = keywords.value.map((group) => String(group.ngram));
        MaNotification.success({ title: 'Keywords generated', description: `Found ${keywords.value.length} n-gram groups.` });
    } else {
        MaNotification.warning({ title: 'No keywords found', description: 'Try different text or smaller sizes.' });
    }
}

function resetKeywords() {
    inputText.value = '';
    selectedNGrams.value = [];
    keywords.value = null;
    errors.value = {};
    hasSearched.value = false;
    expandedGroups.value = [];
    MaNotification.info({ title: 'Cleared', description: 'Inputs and results cleared.' });
}
</script>

<template>
    <div class="flex gap-10 max-w-360 my-12 mx-auto px-6 text-gray-800">
        <div class="flex flex-col gap-3 w-120">
            <h2 class="text-2xl font-bold text-gray-900">Keyword Generator</h2>
            <div>
                <MaTextarea v-model="inputText" :error="!!errors.text" placeholder="Enter text" :rows="16"/>
                <p v-if="errors.text" class="mt-1 text-xs text-red-500">{{ errors.text }}</p>
            </div>
            <MaSelect multiple :has-error="!!errors.ngram" :hint="errors.ngram" :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" icon="ai-sparkle" @click="generateKeywords">Generate</MaButton>
            <MaButton variant="stroke" icon="refresh" @click="resetKeywords">Reset Keywords</MaButton>
        </div>
        <MaCard class="flex-1 min-w-0" title="Results" bordered>
            <MaCollapse v-if="keywords && keywords.length" v-model:expanded-values="expandedGroups" mode="multiple">
                <MaCollapseItem
                    v-for="group in keywords"
                    :key="group.ngram"
                    :value="String(group.ngram)"
                    :title="`${group.ngram}-gram (${group.keywords.length})`">
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
