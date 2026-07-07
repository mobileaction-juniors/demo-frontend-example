<script setup>
import KeywordDensity from './KeywordDensity.vue';

// The parent owns the seed text so ONB-204 can pass it to the child on first load.
const initialText = `Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".`;
</script>

<template>
    <main class="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <h1 class="mb-6 text-center text-xl font-medium">
            Keyword count and density
        </h1>
        <KeywordDensity :text="initialText" />
    </main>
</template>
