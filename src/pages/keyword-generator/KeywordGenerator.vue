<template>
  <div class="ma-keywords-generator">
    <div class="ma-content">
      <div class="ma-left-side">
        <div class="ma-input">
          <label for="input-text">Input Text:</label>
          <a-textarea
            id="input-text"
            v-model:value="inputText"
            :rows="5"
            :placeholder="'Enter your text'"
          ></a-textarea>
        </div>
        <a-button type="primary" @click="generateKeywords" class="convertButton">
          <!-- <font-awesome-icon icon="fa-solid fa-check" /> -->
          Count
        </a-button>
      </div>
      <div class="ma-right-side">
        <div class="ma-select">
          <label>Select n-grams to show:</label>
          <a-select
            mode="multiple"
            v-model:value="selectedNGrams"
            :options="nGramOptions"
            style="width: 100%"
            placeholder="Select n-grams"
          ></a-select>
        </div>
        <div class="ma-keywords">
          <div
            v-for="(keywords, index) in selectedKeywords"
            :key="index"
            class="ma-keyword-group"
          >
            <h3>{{ selectedNGrams[index] }}-gram Keywords:</h3>
            <a-tag v-for="keyword in keywords" :key="keyword" class="ma-keyword-tag">
              {{ keyword }}
              
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {Select as ASelect, Button as AButton, Textarea as ATextarea, Tag as ATag} from "ant-design-vue";
import { regex, splitRegex, filterArr } from "../../cleanupResources";

const inputText = ref("");
const selectedNGrams = ref([]);
const selectedKeywords = ref([]);
const nGramOptions = ref(
  Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}-gram`,
    value: i + 1,
  }))
);

const cleanedText = computed(() =>
  inputText.value
    .replace(regex, "")
    .split(splitRegex)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .join(" ")
    .toLowerCase()
);

const filteredText = computed(() =>
  cleanedText.value
    .split(" ")
    .filter((word) => !filterArr.includes(word))
    .join(" ")
);

const getNGramKeywords = (n, text) => {
  const words = text.split(/\s+/);
  const nGrams = [];

  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(" ");
    if (!nGrams.includes(nGram)) {
      nGrams.push(nGram);
    }
  }

  return nGrams;
};

const generateKeywords = () => {
  selectedKeywords.value = selectedNGrams.value.map((n) =>
    getNGramKeywords(n, filteredText.value)
  );
};
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

.ma-input textarea {
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