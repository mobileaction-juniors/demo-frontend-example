<script setup>
import { cleanDescription } from "../../utils/CleanDescription";
import { ref, computed } from "vue";
const description = ref("");
const cleanedDescription = computed(() => cleanDescription(description.value));
</script>
<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-text-area">
      <textarea
        v-model="description"
        placeholder="Enter your description here..."
        rows="8"
      ></textarea>
      <p v-if="description">{{ cleanedDescription }}</p>
    </div>
  </div>
</template>
