<script setup>
import { ref, computed} from 'vue';

const message = ref('');
const generatedKeywords = ref([]);
const oneGrams = ref([]);
const twoGrams = ref([]);
const threeGrams = ref([]);

const ngramGenerate = (keywords, n) => {
  const res = [];

  //Finds all possible n-gram words
  for(let i = 0; i <= keywords.length - n; i++) {
      res.push(keywords.slice(i, i+n).join(" "));
  }
  return res;
};

const generateKeywords = () => {
    const inputText = message.value;

    // Replaces non-alphanumeric characters and multiple spaces with a single space
    const cleanedText = inputText.replace(/[^\w\s]+/g, ' ').trim();

    // Splits the cleaned text into single words based on whitespace
    const keywords = cleanedText.split(/\s+/);

    // Method call for each ngram
    oneGrams.value = ngramGenerate(keywords, 1);
    twoGrams.value = ngramGenerate(keywords, 2);
    threeGrams.value = ngramGenerate(keywords, 3);

    let resKeywords = [...oneGrams.value, ...twoGrams.value, ...threeGrams.value];
    return resKeywords;
}

const displayKeywords = () => {
  generatedKeywords.value = generateKeywords();
};

const showKeywords = computed(() => {
    return generatedKeywords.value.length > 1;
});
</script>

<template>
  <div class="ma-keywords-generator">
      <div class="ma-header">
          <span>Keyword Generator</span>
      </div>
      <textarea v-model="message" id="keywordgen" name="keywordgen" rows="10" cols="50"
              placeholder="Type your keywords here...">{{ message }}</textarea>
      <button @click="displayKeywords" class="generate-button">Generate Keywords</button> 
  </div>
  <div v-if="showKeywords">
    <div class="ma-header">
        <span>Generated Keywords</span>
    </div>
    <div class="keywords-container">
      <div class="column">
          <div class="column-header">1-Grams</div>
          <ul id="onegrams-list">
              <li v-for="keyword in oneGrams" :key="keyword">{{ keyword }}</li>
          </ul>
      </div>
      <div class="column">
          <div class="column-header">2-Grams</div>
          <ul id="twograms-list">
              <li v-for="keyword in twoGrams" :key="keyword">{{ keyword }}</li>
          </ul>
      </div>
      <div class="column">
        <div class="column-header">3-Grams</div>
        <ul id="threegrams-list">
            <li v-for="keyword in threeGrams" :key="keyword">{{ keyword }}</li>
        </ul>
      </div>
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
  width: 100%;
  max-width: 800px;
}

.keywords-container ul {
  list-style-type: none;
  padding: 0;
}

.keywords-container li {
  margin-bottom: 5px;
}

.column {
    flex: 1;
    margin: 0 10px;
    text-align: center;
    border: 1px solid #ccc;
}

.column-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
</style>