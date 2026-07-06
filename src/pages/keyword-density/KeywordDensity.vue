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
    <!-- Stack panels by default, then place them side by side on desktop. -->
    <section class="grid w-full gap-6 md:grid-cols-2 md:items-start">
        <div class="w-full min-w-0">
            <label
                for="keyword-density-text"
                class="block mb-2 text-sm font-medium text-gray-700"
            >
                Text
            </label>
            <MaTextarea
                id="keyword-density-text"
                v-model="text"
                class="block w-full max-w-full box-border"
                :rows="12"
            />

            <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
                <MaButton
                    html-type="button"
                    @click="countKeywords"
                >
                    Count
                </MaButton>
                <p
                    class="text-sm text-gray-600"
                    aria-live="polite"
                >
                    Total characters:
                    <strong class="text-gray-900">{{ characterCount }}</strong>
                </p>
            </div>
        </div>

        <div class="w-full min-w-0">
            <h2 class="mb-2 text-sm font-medium text-gray-700">
                Results
            </h2>
            <!-- Keep wide table content scrollable instead of overflowing small screens. -->
            <div
                v-if="results.length"
                class="w-full max-w-full overflow-x-auto rounded border border-gray-200"
            >
                <table class="w-full min-w-[360px] border-collapse text-sm">
                    <thead class="bg-indigo-600 text-white">
                        <tr>
                            <th class="p-3 text-left font-medium">
                                Keyword
                            </th>
                            <th class="p-3 text-right font-medium">
                                Count
                            </th>
                            <th class="p-3 text-right font-medium">
                                Density
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="result in results"
                            :key="result.keyword"
                            class="even:bg-gray-50"
                        >
                            <td class="p-3 text-gray-900 break-words">
                                {{ result.keyword }}
                            </td>
                            <td class="p-3 text-right text-gray-700">
                                {{ result.count }}
                            </td>
                            <td class="p-3 text-right text-gray-700">
                                {{ result.density }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p
                v-else
                class="flex min-h-48 items-center justify-center rounded border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500"
                role="status"
            >
                {{ hasCounted ? 'No keywords found.' : 'Count the text to see keyword density results.' }}
            </p>
        </div>
    </section>
</template>
