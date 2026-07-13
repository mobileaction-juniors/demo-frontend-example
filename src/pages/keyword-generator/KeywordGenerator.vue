<script setup>
import { cleanDescription } from "../../utils/CleanDescription";
import {
  oneGramGeneration,
  twoGramGeneration,
  threeGramGeneration,
} from "../../utils/nGramGeneration";

import { ref, computed } from "vue";
const description = ref("");
const cleanedDescription = computed(() => cleanDescription(description.value));

const oneGramKeywords = computed(() =>
  oneGramGeneration(cleanedDescription.value),
);
const twoGramKeywords = computed(() =>
  twoGramGeneration(cleanedDescription.value),
);
const threeGramKeywords = computed(() =>
  threeGramGeneration(cleanedDescription.value),
);
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
      <p v-if="description">Cleaned Description: {{ cleanedDescription }}</p>
    </div>
    <div class="ma-keywords">
      <div class="ma-keywords-section">
        <h3>1-Gram Keywords</h3>
        <p v-if="oneGramKeywords.length > 0">
          {{ oneGramKeywords.join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>2-Gram Keywords</h3>
        <p v-if="twoGramKeywords.length > 0">
          {{ twoGramKeywords.join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>3-Gram Keywords</h3>
        <p v-if="threeGramKeywords.length > 0">
          {{ threeGramKeywords.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>
