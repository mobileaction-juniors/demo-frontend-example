<script setup>
import KeywordDensity from './KeywordDensity.vue'

const staticText = `Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords. The keyword density is the percentage of times a keyword appears in a text compared to the total number of words in that text. Simply write or paste your text here and hit "count".`
</script>

<template>
  <KeywordDensity :initial-text="staticText" />
</template>
