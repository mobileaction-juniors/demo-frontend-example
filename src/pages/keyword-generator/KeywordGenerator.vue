<template>
  <div class="container mx-auto p-4 grid gap-x-8 gap-y-4">
    <a-select
        v-model="selectedNgram"
        class="w-32 mb-4"
        @change="handleChange"
    >
      <a-select-option
          v-for="value in ngramOptions"
          :key="value"
          :value="value"
      >
        {{ value }}-Gram
      </a-select-option>
    </a-select>
    <a-input-search
        v-model="textInput"
        class="mt-6"
        placeholder="Input search text"
        @search="generateNGrams"
    >
      <font-awesome-icon
          icon="fa-duotone fa-magnifying-glass"
          class="text-gray-400 ml-2"
      />
    </a-input-search>
    <a-card
        v-for="(keywords, index) in generatedKeywordsArray"
        :key="index"
        class="p-4 my-4 bg-white border rounded shadow-md"
    >
      <h3 class="text-lg font-semibold mb-2">
        {{ index + 1 }}-Gram Keywords:
      </h3>
      <div class="space-y-2">
            <a-tag
                v-for="keyword in keywords"
                :key="keyword"
            >
              {{ keyword }}
            </a-tag>
      </div>
    </a-card>


    <div class="generator-section">
      <h1>Keyword Density Table</h1>
      <router-link to="/keyword-density">Go to Keyword Density Table</router-link>
    </div>

  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';

  import { cleanFunc, removeUnwantedWords } from '../../utilities/CleanWords';

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


  watch(
      () => selectedNgram.value,
      () => {
        if (textInput.value !== '')
          generateNGrams();
        localStorage.removeItem('savedText');
        localStorage.setItem('savedText', textInput.value);
      }

  );

  function handleChange(value) {
    selectedNgram.value = value;
  }



  const generatedKeywordsArray =
      computed(() => Object.values(generatedKeywords.value));

  // Generated keywords
  const generatedKeywords = ref({});

  // Split the text into words
  const words = computed(() => {
    return cleanFunc(textInput.value);
    // Convert to a Set to remove duplicates and then back to an array
  });

  // Generate n-grams
  function generateNGrams() {
    const _generatedKeywords = {};

    localStorage.removeItem('savedText');
    localStorage.setItem('savedText', textInput.value);

    for (let n = 1; n <= selectedNgram.value; n++) {
      const nGramKeywords = [];

      const filteredWords = removeUnwantedWords(words.value);

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
