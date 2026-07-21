<script setup>
import { useKeywordStore } from '@/stores/keyword';
import { storeToRefs } from 'pinia';
import { MAX_N_GRAM } from '@/utils/GenerateNGrams';
import { MaBadge, MaButton, MaSelect2, MaTextarea } from '@mobileaction/action-kit';

const keywordStore = useKeywordStore();

const {
    generatorInputText,
    selectedNGrams,
    generatedKeywords,
    nGramGroups
} = storeToRefs(keywordStore);

const { generateKeywords } = keywordStore;

const nGramOptions = Array.from({ length: MAX_N_GRAM }, (_, index) => ({
    label: `${index + 1}-gram`,
    value: index + 1
}));
</script>

<template>
    <div class="mx-auto max-w-[800px] p-6">
        <div class="text-center">
            <h1 class="text-2xl font-semibold">
                Keyword Generator
            </h1>
        </div>
        <div class="mt-5">
            <MaTextarea
                v-model="generatorInputText"
                placeholder="Paste an app description..."
                :rows="8"
            />
        </div>
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
        <div class="mt-5">
            <MaButton
                type="primary"
                icon="apple"
                @click="generateKeywords"
            >
                Generate Keywords
            </MaButton>
        </div>
        <div
            v-if="generatedKeywords.length > 0"
            class="mt-6"
        >
            <div
                v-for="group in nGramGroups"
                :key="group.n"
                class="mb-5"
            >
                <h3 class="mb-2 font-semibold">
                    {{ group.n }}-gram:
                </h3>
                <p
                    v-if="!group.hasKeywords"
                    class="mt-0"
                >
                    None
                </p>
                <div
                    v-else
                    class="flex flex-wrap gap-2"
                >
                    <MaBadge
                        v-for="keyword in group.keywords"
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
