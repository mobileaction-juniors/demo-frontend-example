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

<style scoped src="./KeywordGenerator.css"></style>
