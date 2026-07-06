<script setup>
import { MaButton, MaTextarea } from '@mobileaction/action-kit';
import { computed, ref } from 'vue';

const props = defineProps({
    initialText: {
        type: String,
        required: true,
    },
});

const text = ref(props.initialText);
// Count every character in the raw textarea value, including whitespace.
const characterCount = computed(() => text.value.length);
const results = ref([]);
const hasCounted = ref(false);
const copyStatus = ref('');

// Normalize case and separators so equivalent words share one count.
const cleanText = (value) => value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const countKeywords = () => {
    hasCounted.value = true;
    copyStatus.value = '';
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

    // Equal-frequency keywords share a density, so combine them into compact rows.
    const groupedKeywords = [...keywordCounts.entries()]
        .reduce((groups, [keyword, count]) => {
            const keywords = groups.get(count) ?? [];
            keywords.push(keyword);
            groups.set(count, keywords);
            return groups;
        }, new Map());

    results.value = [...groupedKeywords.entries()]
        .map(([count, keywords]) => ({
            keywordText: keywords.sort((firstKeyword, secondKeyword) => (
                firstKeyword.localeCompare(secondKeyword)
            )).join(', '),
            count,
            // Density uses every word occurrence, not the number of unique keywords.
            density: `${((count / words.length) * 100).toFixed(1)}%`,
        }))
        // Sort groups by frequency, then alphabetically for stable ties.
        .sort((firstResult, secondResult) => secondResult.count - firstResult.count
            || firstResult.keywordText.localeCompare(secondResult.keywordText));
};

const copyResults = async () => {
    // Mirror the visible columns in a readable tab-separated clipboard format.
    const rows = results.value.map(({ keywordText, count, density }) => (
        `${keywordText}\t${count}\t${density}`
    ));
    const clipboardText = ['Keyword\tCount\tDensity', ...rows].join('\n');

    try {
        await navigator.clipboard.writeText(clipboardText);
        copyStatus.value = 'Copied to clipboard.';
    } catch {
        copyStatus.value = 'Clipboard access is unavailable.';
    }
};
</script>

<template>
    <!-- Mobile stacks the panels; desktop keeps input and results side by side. -->
    <section class="grid w-full gap-6 md:grid-cols-2 md:items-start">
        <div class="w-full min-w-0">
            <label
                for="keyword-density-text"
                class="block mb-2 text-sm font-medium text-gray-700"
            >
                Text
            </label>
            <!-- Enter submits through the same handler without creating a new line. -->
            <MaTextarea
                id="keyword-density-text"
                v-model="text"
                class="block w-full max-w-full box-border"
                :rows="14"
                @keydown.enter.prevent="countKeywords"
            />

            <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
                <MaButton
                    html-type="button"
                    color="red"
                    size="small"
                    class="!border-red-700 !bg-red-700 !text-white hover:!border-red-800 hover:!bg-red-800"
                    @click="countKeywords"
                >
                    Count
                </MaButton>
                <p
                    class="text-sm text-gray-600"
                    aria-live="polite"
                >
                    Total characters:
                    <strong class="ml-1 text-lg font-bold text-gray-900">{{ characterCount }}</strong>
                </p>
            </div>
        </div>

        <div class="w-full min-w-0">
            <h2 class="mb-2 text-sm font-medium text-gray-700">
                Results
            </h2>
            <div
                v-if="results.length"
            >
                <!-- Fixed table layout keeps every column within narrow mobile screens. -->
                <div class="w-full max-w-full overflow-hidden rounded border border-[#e8e7f0]">
                    <table class="w-full table-fixed border-collapse text-sm">
                        <thead class="bg-[#4f5cff] text-white">
                            <tr>
                                <th class="w-3/5 px-3 py-2 text-left font-medium">
                                    Keyword
                                </th>
                                <th class="w-1/5 px-2 py-2 text-right font-medium sm:px-3">
                                    Count
                                </th>
                                <th class="w-1/5 px-2 py-2 text-right font-medium sm:px-3">
                                    Density
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#e8e7f0]">
                            <tr
                                v-for="result in results"
                                :key="`${result.count}-${result.density}`"
                                class="even:bg-[#f3f2fb]"
                            >
                                <td class="break-words px-3 py-2 text-gray-900">
                                    {{ result.keywordText }}
                                </td>
                                <td class="px-2 py-2 text-right text-gray-700 sm:px-3">
                                    {{ result.count }}
                                </td>
                                <td class="px-2 py-2 text-right text-gray-700 sm:px-3">
                                    {{ result.density }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex flex-wrap items-center gap-3 mt-3">
                    <MaButton
                        html-type="button"
                        variant="stroke"
                        color="blue"
                        size="small"
                        @click="copyResults"
                    >
                        Copy to clipboard
                    </MaButton>
                    <span
                        v-if="copyStatus"
                        class="text-sm text-gray-600"
                        role="status"
                    >
                        {{ copyStatus }}
                    </span>
                </div>
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
