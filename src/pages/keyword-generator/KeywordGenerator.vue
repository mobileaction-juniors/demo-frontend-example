<script setup>
import { computed, ref } from "vue";

import { cleanDescription } from "../../utils/CleanDescription";
import { nGramGenerater } from "../../utils/nGramGeneration";
import KeywordsSection from "@/components/KeywordsSection.vue";

const description = ref("");
const cleanedDescription = computed(() => cleanDescription(description.value));
</script>
<template>
  <div class="ma-keywords-generator">

    <div class="ma-header">
      <span>
        <h1>
          Generator
        </h1>
      </span>
    </div>

    <div class="ma-text-area">
      <textarea
        v-model="description"
        placeholder="Enter your description here..."
        rows="8"
      ></textarea>
      <p v-if="description">Cleaned Description: {{ cleanedDescription }}</p>
    </div>

    <div class="ma-keywords-main-section">
      <KeywordsSection
        :title="'1-Gram Keywords'"
        :keywords="nGramGenerater(cleanedDescription, 1)"
      ></KeywordsSection>
      <KeywordsSection
        :title="'2-Gram Keywords'"
        :keywords="nGramGenerater(cleanedDescription, 2)"
      ></KeywordsSection>
      <KeywordsSection
        :title="'3-Gram Keywords'"
        :keywords="nGramGenerater(cleanedDescription, 3)"
      ></KeywordsSection>
    </div>

  </div>
</template>

<style scope>
.ma-header {
  color: #1bcf6c;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ma-text-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ma-text-area textarea {
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  font-size: 1rem;
  background-color: #c9c7c7;
  border: 3px solid #1bcf6c;
}

.ma-text-area textarea:focus {
  outline: none;
  border: 3px solid #1bcf6c;
  box-shadow: 0 0 0 2px rgba(27, 207, 108, 0.3);
}

.ma-keywords-main-section {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 5px;
}
</style>
