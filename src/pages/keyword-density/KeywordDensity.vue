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
            <!-- TODO: Add keyword frequency and density calculation in the next step. -->
            <MaButton html-type="button">
                Count
            </MaButton>
            <p aria-live="polite">
                Total characters: <strong>{{ characterCount }}</strong>
            </p>
        </div>
    </section>
</template>
