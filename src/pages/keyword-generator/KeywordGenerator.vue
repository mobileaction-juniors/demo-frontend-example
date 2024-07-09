<script setup>
import {computed, ref} from 'vue'
import {cleanDescription} from "@/utils/CleanDescription.js";
import {filterArr} from "@/cleanupResources.js";
import {MaBadge, MaInput} from "@mobileaction/action-kit";
import "@mobileaction/action-kit/dist/style.css"

const MAX_VALUE_OF_NGRAM_SIZE = 10;

const filterSet = new Set(filterArr);

const keywordText = ref('')
const selectedNgramSizes = ref(new Array(MAX_VALUE_OF_NGRAM_SIZE).fill(false));

const toggleNgramCheckbox = function (ngramSize) {
  selectedNgramSizes.value[ngramSize - 1] = !selectedNgramSizes.value[ngramSize - 1];
  console.log(ngramSizes.value)
}

const createNGrams = function (words, n) {
  const ngrams = new Set()
  for (let i = 0; i <= words.length - n; i++) {
    let ngram = ""
    for (let j = 0; j < n; j++) {
      ngram += words[i + j] + " "
    }
    ngrams.add(ngram.trim())
  }
  return ngrams
}

const cleanKeywords = computed(() => {
  return cleanDescription(keywordText.value).split(' ').filter(word => word.length > 0 && !filterSet.has(word));
})

const ngramSizes = computed(() => {
  const sizes = [];
  for (let i = 0; i < MAX_VALUE_OF_NGRAM_SIZE; i++) {
    if (selectedNgramSizes.value[i]) {
      sizes.push(i + 1)
    }
  }
  return sizes;
})

const ngramsList = computed(() => {
  return ngramSizes.value.map(size => {
    return {
      size,
      grams: computed(() => createNGrams(cleanKeywords.value, size))
    };
  });
});
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="ma-keyword-text-input-wrapper">
      <MaInput
          type="textarea"
          placeholder="Enter the text to generate keywords from"
          rows=5
          size="large"
          class="ma-keyword-textarea"
          v-model:value="keywordText"
      >
      </MaInput>
    </div>
    <div class="ma-keyword-ngram-size-selector-wrapper">
      <div class="text-center">
        Generate:
      </div>
      <div v-for="ngramSize in MAX_VALUE_OF_NGRAM_SIZE" v-bind:key="ngramSize" class="ma-keyword-ngram-size-selector"
           @click="toggleNgramCheckbox(ngramSize)">
        <input type="checkbox" :id="`ngram-${ngramSize}`" :value="ngramSize" v-model="selectedNgramSizes[ngramSize-1]"
               @click="toggleNgramCheckbox(ngramSize)"/>
        <label :for="`ngram-${ngramSize}`">{{ ngramSize }}-gram</label>
      </div>
    </div>
    <div class="ma-ngrams-wrapper">
      <div v-for="ngramData in ngramsList" v-bind:key="ngramData" class="ma-ngrams-column">
        <div class="ma-ngrams-column-title">
          {{ ngramData.size }}-grams
        </div>
        <div v-for="ngram in ngramData.grams.value" v-bind:key="ngram" class="ma-ngrams-ngram">
          <MaBadge v-for="ngramWord in ngram.split(' ')" v-bind:key="ngramWord" variant="dark" size="large"
                   type="primary" class="ma-ngrams-badge">
            <div class="ma-ngrams-ngram-text">
              {{ ngramWord }}
            </div>
          </MaBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.ma-keywords-generator {
  margin: 0 15%;
}

.ma-header {
  text-align: center;
  margin: 20px auto;
  font-size: larger;
  font-weight: bold;
}

.ma-keyword-ngram-size-selector-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 10px;
  align-items: center;
}

.ma-keyword-ngram-size-selector {
  display: flex;
  flex-direction: row;
  background-color: #e3e3e3;
  border-radius: 5px;
  padding: 10px;
}

.ma-keyword-text-input-wrapper {
  text-align: center;
}

.ma-keyword-textarea {
  width: 100%;
  margin: 10px auto;
}

.ma-ngrams-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 10px;
  margin: 10px auto 0;
}

.ma-ngrams-ngram {
  margin: 7px 0;
  text-align: center;
}

.ma-ngrams-badge {
  margin: 2px;
  padding: 7px;
  display: inline-block;
}

.ma-ngrams-ngram-text {
  font-size: small;
  text-align: center;
  margin: auto;
}

.ma-ngrams-column {
  text-align: center;
  background-color: #e3e3e3;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.ma-ngrams-column-title {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
</style>