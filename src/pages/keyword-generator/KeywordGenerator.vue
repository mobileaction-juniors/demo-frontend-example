<script setup>
import { computed, ref } from "vue";

import { cleanDescription } from "../../utils/CleanDescription";
import { filterDescription } from "../../utils/FilterDescription";
import KeywordsSection from "@/components/KeywordsSection.vue";
import MultiSelectButtons from "@/components/MultiSelectButtons.vue";
import { nGramGenerater } from "../../utils/nGramGeneration";

const description = ref("");
const cleanedAndFilteredDescription = computed(() => filterDescription(cleanDescription(description.value)));

const gramSizeArray = [1,2,3,4,5,6,7,8,9,10];
const gramSizeOptions = gramSizeArray.map((n) => ({
  label: `${n}-Gram`,
  value: n,
}));

const selectedGramSizes = ref([]);

const sections = computed(() =>
  selectedGramSizes.value
    .slice()
    .sort((a, b) => a - b)
    .map((n) => ({
      title: `${n}-Gram Keywords`,
      keywords: nGramGenerater(cleanedAndFilteredDescription.value, n),
    })),
);

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
      <p v-if="description">Cleaned and Filtered Description: {{ cleanedAndFilteredDescription }}</p>
    </div>

    <MultiSelectButtons :options="gramSizeOptions" v-model="selectedGramSizes" />

    <div class="ma-keywords-main-section">
      <KeywordsSection
        v-for="section in sections"
        :key="section.title"
        :title="section.title"
        :keywords="section.keywords"
      ></KeywordsSection>
    </div>

  </div>
</template>

<style scoped>
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
