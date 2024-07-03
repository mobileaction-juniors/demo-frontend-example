<script setup>
import { ref } from 'vue';

// Define a reactive variable for the message input
const message = ref('');
const showKeywords = ref(false);

const ngramGenerate = (keywords, n) => {

    const res = [];

    for(let i = 0; i <= keywords.length - n; i++) {

        res.push(keywords.slice(i, i+n).join(" "));

    }
    return res;
};

const generateKeywords = () => {
    const inputText = message.value;
    const keywords = inputText.split(/\s+/);

    let resKeywords = [];
    const oneGrams = ngramGenerate(keywords, 1);
    resKeywords = [...oneGrams];
    if(inputText.length > 1) {
        const twoGrams = ngramGenerate(keywords, 2);
        resKeywords = [...resKeywords, ...twoGrams];
    }
    if(inputText.length > 2) {
        const threeGrams = ngramGenerate(keywords, 3);
        resKeywords = [...resKeywords, ...threeGrams];
    }

    // Display or process the generated keywords
    showKeywords.value = true;
    return resKeywords;
}

const generatedKeywords = ref([]);

const displayKeywords = () => {
  generatedKeywords.value = generateKeywords();
};
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
            <ul id="keywords-list">
            <li v-for="keyword in generatedKeywords" :key="keyword">{{ keyword }}</li>
            </ul>
        </div>
    </div>
  </template>

  
  <style scoped>
  .ma-keywords-generator {
    display: flex;
    flex-direction: column;
    align-items: center; /* Horizontally center items */
    height: 40vh; /* Ensures full viewport height */
  }
  
  .ma-header {
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  
  textarea {
    width: 100%; /* Takes full width of its container */
    max-width: 600px; /* Adjust maximum width as needed */
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical; /* Allow vertical resizing */
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
  width: 100%;
  max-width: 800px; /* Adjust maximum width for keywords container */
}

.keywords-container ul {
  list-style-type: none;
  padding: 0;
}

.keywords-container li {
  margin-bottom: 5px;
}
  </style>
  