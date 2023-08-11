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

    <KeyWordDensity/>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import KeyWordDensity from "../../components/KeyWordDensity.vue";
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
    const wordsArray = textInput.value.split(/\s+/).map(word => word.toLowerCase().trim());
    return [...new Set(wordsArray)];
    // Convert to a Set to remove duplicates and then back to an array
  });

  // Generate n-grams
  function generateNGrams() {
    const _generatedKeywords = {};
    const unwantedWords = ['is', 'a', 'an', 'the'];
    const filteredWords = words.value.filter((word) => !unwantedWords.includes(word.toLowerCase()));

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
