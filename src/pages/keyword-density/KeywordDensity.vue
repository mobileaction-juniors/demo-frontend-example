<script setup>
import { MaButton, MaTextarea } from '@mobileaction/action-kit';
import { computed, ref } from 'vue';

const props = defineProps({
    initialText: {
        type: String,
        required: true,
    },
});

// Copy the prop into local state so edits do not mutate parent-owned data.
const text = ref(props.initialText);
const characterCount = computed(() => text.value.length);
const results = ref([]);
const hasCounted = ref(false);

// Normalize case and separators so equivalent words share one count.
const cleanText = (value) => value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const countKeywords = () => {
    hasCounted.value = true;
    const cleanedText = cleanText(text.value);

    if (!cleanedText) {
        results.value = [];
        return;
    }

    const words = cleanedText.split(' ');
    const keywordCounts = words.reduce((counts, keyword) => {
        counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
        return counts;
    }, new Map());

    results.value = [...keywordCounts.entries()]
        .map(([keyword, count]) => ({
            keyword,
            count,
            // Density uses every word occurrence, not the number of unique keywords.
            density: `${((count / words.length) * 100).toFixed(1)}%`,
        }))
        // Prioritize frequent keywords and use alphabetical order to break ties.
        .sort((firstResult, secondResult) => secondResult.count - firstResult.count
            || firstResult.keyword.localeCompare(secondResult.keyword));
};
</script>

<template>
    <section class="w-full">
        <label
            for="keyword-density-text"
            class="block mb-2 font-medium"
        >
            Text
        </label>
        <MaTextarea
            id="keyword-density-text"
            v-model="text"
            class="block w-full box-border"
            :rows="10"
        />

        <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
            <MaButton
                html-type="button"
                @click="countKeywords"
            >
                Count
            </MaButton>
            <p aria-live="polite">
                Total characters: <strong>{{ characterCount }}</strong>
            </p>
        </div>

        <div
            v-if="results.length"
            class="w-full mt-6 overflow-x-auto"
        >
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th class="p-2 text-left border">
                            Keyword
                        </th>
                        <th class="p-2 text-left border">
                            Count
                        </th>
                        <th class="p-2 text-left border">
                            Density
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="result in results"
                        :key="result.keyword"
                    >
                        <td class="p-2 border">
                            {{ result.keyword }}
                        </td>
                        <td class="p-2 border">
                            {{ result.count }}
                        </td>
                        <td class="p-2 border">
                            {{ result.density }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p
            v-else-if="hasCounted"
            class="mt-6"
            role="status"
        >
            No keywords found.
        </p>
    </section>
</template>
