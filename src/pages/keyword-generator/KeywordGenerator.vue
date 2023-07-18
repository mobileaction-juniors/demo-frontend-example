<template>
  <div class="ma-keywords-generator">
    <div class="ma-content">
      <div class="ma-left-side">
        <div class="ma-input" label="Input Text">
          <Textarea
            v-model="inputText"
            :rows="5"
            :placeholder="'Enter your text'"
          ></Textarea>
        </div>
        <Button type="primary" @click="generateKeywords" class="convertButton">
          Count
        </Button>
      </div>
      <div class="ma-right-side">
        <div class="ma-select" label="Select n-grams to show">
          <Select
            mode="multiple"
            v-model="selectedNGrams"
            :options="nGramOptions"
            style="width: 100%"
            placeholder="Select n-grams"
          ></Select>
        </div>
        <div class="ma-keywords">
          <div
            v-for="(keywords, index) in selectedKeywords"
            :key="index"
            class="ma-keyword-group"
          >
            <h3>{{ selectedNGrams[index] }}-gram Keywords:</h3>
            <Tag v-for="keyword in keywords" :key="keyword" class="ma-keyword-tag">
              {{ keyword }}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Select, Tag, Textarea } from "ant-design-vue";
import { regex, splitRegex, filterArr } from "../../cleanupResources";

const inputText = ref("");
const selectedNGrams = ref([]);
const selectedKeywords = ref([]);
const nGramOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}-gram`,
  value: i + 1,
}));

function cleanedText() {
  return inputText.value
    .replace(regex, "")
    .split(splitRegex)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .join(" ")
    .toLowerCase();
}

function filteredText() {
  return cleanedText().split(" ").join(" ");
}

function getNGramKeywords(n, text) {
  //çalışmıyor
  const words = text.split(/\s+/);
  const nGrams = [];

  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(" ");
    if (!nGrams.includes(nGram)) {
      nGrams.push(nGram);
    }
  }

  return nGrams;
}

function generateKeywords() {
  const cleanedTextValue = cleanedText();
  const filteredTextValue = cleanedTextValue
    .split(" ")
    .filter((word) => !filterArr.includes(word))
    .join(" ");

  selectedKeywords.value = selectedNGrams.value.map((n) =>
    getNGramKeywords(n, filteredTextValue)
  );
}

function removeKeyword(groupIndex, keywordIndex) {
  selectedKeywords.value[groupIndex].splice(keywordIndex, 1);
}
</script>

<style scoped>
.ma-keywords-generator {
  @apply font-sans max-w-5xl m-auto;
}

.ma-content {
  @apply flex;
}

.ma-left-side {
  @apply flex-1 pr-24;
}

.ma-right-side {
  @apply flex-1 pl-24;
}

.ma-header {
  @apply bg-white text-center;
}

.ma-input {
  @apply mb-5;
}

.ma-input label {
  @apply block mb-4 text-sm font-extralight text-black;
}

.ma-input a-textarea {
  @apply w-full resize-y bg-white;
}

.ma-button {
  @apply mt-5;
}

.convertButton {
  @apply bg-red-900 border-red-900 text-white rounded-lg h-8;
}

.ma-keyword-group {
  @apply mt-5;
}

.ma-keyword-group h3 {
  @apply mt-0 text-sm font-extralight;
}

.ma-keyword-group a-tag {
  @apply mr-1 mb-1;
}
</style>
