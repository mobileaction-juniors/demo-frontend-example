<script setup>
import { ref, computed } from 'vue';
import { MaButton } from "@mobileaction/action-kit"
import "@mobileaction/action-kit/dist/style.css"
import { cleanDescription, filterUnwantedWords } from '../../utils/CleanDescription.js';

const message = ref('');
const selectedNgrams = ref([]);

const ngramGenerate = (keywords, n) => {
  const res = new Set();

  //Finds all possible n-gram words
  for(let i = 0; i <= keywords.length - n; i++) {
    const ngram = keywords.slice(i, i+n).join(" ");
    // Add keyword to the list if it is not an empty string
    if(ngram.trim().length > 0) {
      res.add(ngram);
    }
  }
  return Array.from(res);
};

const singleWords = computed(() => {
    const inputText = message.value;

    // Replaces non-alphanumeric characters and multiple spaces with a single space
    const cleanedText = cleanDescription(message.value);

    // Splits the cleaned text into single words based on whitespace
    const keywords = cleanedText.split(/\s+/);

    const filteredKeywords = filterUnwantedWords(keywords);
    
    return filteredKeywords;
});

// Computed property to generate n-grams based on selected n values
const computedNgrams = computed(() => {
  const sortedNgrams = selectedNgrams.value
    .map(n => parseInt(n))
    .sort((a, b) => a - b); // Sort selected n-grams in ascending order

  const ngrams = sortedNgrams.map(n => {
    const ngramList = ngramGenerate(singleWords.value, n);
    return { n: n.toString(), list: ngramList };
  });
  return ngrams;
});

const showKeywords = computed(() => {
    return computedNgrams.value.length > 0;
});

// Handler for checkbox changes
const handleCheckboxChange = (event) => {
  const { value, checked } = event.target;

  if (checked) {
    selectedNgrams.value.push(value);
  } else {
    selectedNgrams.value = selectedNgrams.value.filter(item => item !== value);
  }
};

const handleNgramButton = (n) => {
  selectedNgrams.value = [n.toString()];

  // Uncheck all checkboxes and check only the specified n-Gram checkbox
  document.querySelectorAll('.dropdown-menu input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = checkbox.value === n.toString();
  });
};
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator</span>
    </div>
    <div class="dropdown">
      <ul class="dropdown-menu" aria-labelledby="multiSelectDropdown">
        <li v-for="n in 10" :key="n" class="menu-item">
          <label>
            <input type="checkbox" :value="n.toString()" @change="handleCheckboxChange">
            {{ n }}-Gram
          </label>
        </li>
      </ul>
    </div>
    <div class="buttons-container">
      <ma-button type="primary" variant="danger" size="middle" @click="handleNgramButton(1)">1-Gram</ma-button>
      <ma-button type="primary" variant="danger" size="middle" @click="handleNgramButton(2)">2-Gram</ma-button>
      <ma-button type="primary" variant="danger" size="middle" @click="handleNgramButton(3)">3-Gram</ma-button>
    </div>
    <textarea v-model="message" id="keywordgen" name="keywordgen" rows="10" cols="50"
              placeholder="Type your description here...">
    </textarea>
  </div>
  <div v-if="showKeywords">
    <div class="ma-header">
      <span>Generated Keywords</span>
    </div>
    <div class="keywords-container">
      <template v-for="(item, index) in computedNgrams" :key="index">
          <div class="column">
            <div class="column-header">{{ item.n }}-Grams</div>
            <div v-if="item.list.length > 0">
              <ul>
              <li v-for="keyword in item.list" :key="keyword" class="keyword-item">{{ keyword }}</li>
              </ul>
            </div>
            <div v-else>
              <label>Can't generate any {{ item.n }}-Gram keywords. </label>
            </div>
          </div>
      </template>
    </div>
  </div>
</template>

  <style scoped>
  .ma-keywords-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40vh;
  }
  
  .ma-header {
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  
  textarea {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

.generate-button {
  margin-top: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #0056b3;
}

.keywords-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-bottom: 20px;
}

.keywords-container ul {
  list-style-type: none;
  padding: 0;
}

.keywords-container li {
  margin-bottom: 5px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.column {
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ccc;
  min-width: 100px;
  word-wrap: break-word;
}

.column-header {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background-color: #f0f0f0;
}

.dropdown-menu {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.menu-item {
  margin-right: 10px;
}

.keyword-item {
  border: 1px solid #ccc;
  padding: 5px;
}
</style>