<template>
  <div class="container">

    <a-select v-model="selectedNgram" style="width: 120px" @change="handleChange">
      <a-select-option v-for="value in ngramOptions" :key="value" :value="value">
        {{ value }}-Gram
      </a-select-option>
    </a-select>

    <br /><br />
    <a-input-search v-model="textInput" placeholder="input search text" enter-button @search="generateNGrams" />
    <br /><br />

    <a-card v-for="(keywords, index) in Object.values(generatedKeywords)" :key="index" class="keyword-card">
      <h3 class="keyword-title">{{ index+1 }}-Gram Keywords:</h3>
      <div class="keyword-items">
        <ul>
          <li v-for="keyword in keywords" :key="keyword" class="keyword-item">
            <a-tag>
              {{ keyword.toString() }}
            </a-tag>
          </li>
        </ul>
      </div>
    </a-card>

  </div>
</template>

<script setup>

  import { ref, computed } from 'vue';
  //Ant Design
  import {
    Input as AInput,
    Select as ASelect,
    Card as ACard,
    Tag as ATag, // Import the Tag component
  } from 'ant-design-vue';

  const ASelectOption = ASelect.Option;
  const AInputSearch = AInput.Search;

  // N-gram selection
  const textInput = ref('');
  const selectedNgram = ref(1);
  const ngramOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleChange(value) {
    selectedNgram.value = value;
  }

  // Generated keywords
  const generatedKeywords = ref({});

  // Split the text into words
  const words = computed(() => {
    const wordsArray = textInput.value.split(/\s+/).map(word => word.toLowerCase().trim());
    return [...new Set(wordsArray)]; // Convert to a Set to remove duplicates and then back to an array
  });

  // Generate n-grams
  function generateNGrams() {
    const _generatedKeywords = {};
    const unwantedWords = new Set(['is', 'a', 'an', 'the']);
    const filteredWords = words.value.filter((word) => !unwantedWords.has(word.toLowerCase()));

    for (let n = 1; n <= selectedNgram.value; n++) {
      const nGramKeywords = [];

      for (let i = 0; i <= filteredWords.length - n; i++) {
        const nGram = filteredWords.slice(i, i + n).join(' ');
        if (nGram.trim() !== '') {
          nGramKeywords.push(nGram);
        }
      }
      _generatedKeywords[n] = nGramKeywords;
    }

    generatedKeywords.value = _generatedKeywords;
  }
</script>

<style>
button{
  margin: 10px;
  padding: 10px;
}

fa{
  margin: 10px;
  padding: 10px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.keyword-card {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8f8f8;
}

.keyword-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.keyword-item {
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
