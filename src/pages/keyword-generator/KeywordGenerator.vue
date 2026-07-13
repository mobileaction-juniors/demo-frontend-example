<script setup>
import { computed, ref } from "vue";

import { cleanDescription } from "../../utils/CleanDescription";
import { nGramGenerater } from "../../utils/nGramGeneration";

const description = ref("");
const cleanedDescription = computed(() => cleanDescription(description.value));

const oneGramGenerated = computed(() =>
  nGramGenerater(cleanedDescription.value, 1),
);
const twoGramGenerated = computed(() =>
  nGramGenerater(cleanedDescription.value, 2),
);
const threeGramGenerated = computed(() =>
  nGramGenerater(cleanedDescription.value, 3),
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
        <p v-if="oneGramGenerated.length > 0">
          {{ oneGramGenerated.join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>2-Gram Keywords</h3>
        <p v-if="twoGramGenerated.length > 0">
          {{ twoGramGenerated.join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>3-Gram Keywords</h3>
        <p v-if="threeGramGenerated.length > 0">
          {{ threeGramGenerated.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>
