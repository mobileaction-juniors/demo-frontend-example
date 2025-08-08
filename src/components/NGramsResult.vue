<template>
  <div v-for="(words, i) in results" :key="i" class="ngram-row">
    <strong class="ngram-title">{{ words.label }} :</strong>
    <div class="word-list">
      <MaBadge v-for="(word, j) in words.value" :key="j" class="word-tag">
        {{ word }}
      </MaBadge>
    </div>
  </div>
</template>

<script setup>
import {MaBadge} from "@mobileaction/action-kit";

defineProps({
  results: Array
});
</script>
