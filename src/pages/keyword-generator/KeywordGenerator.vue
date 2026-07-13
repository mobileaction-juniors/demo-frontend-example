<script setup>
import { computed, ref } from "vue";

import { cleanDescription } from "../../utils/CleanDescription";
import { nGramGenerater } from "../../utils/nGramGeneration";

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
      <p v-if="description">Cleaned Description: {{ cleanedDescription }}</p>
    </div>
    <div class="ma-keywords">
      <div class="ma-keywords-section">
        <h3>1-Gram Keywords</h3>
        <p v-if="nGramGenerater(cleanedDescription, 1).length > 0">
          {{ nGramGenerater(cleanedDescription, 1).join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>2-Gram Keywords</h3>
        <p v-if="nGramGenerater(cleanedDescription, 2).length > 0">
          {{ nGramGenerater(cleanedDescription, 2).join(", ") }}
        </p>
      </div>
      <div class="ma-keywords-section">
        <h3>3-Gram Keywords</h3>
        <p v-if="nGramGenerater(cleanedDescription, 3).length > 0">
          {{ nGramGenerater(cleanedDescription, 3).join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>
