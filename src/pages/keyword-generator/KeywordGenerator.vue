<script setup>
import { ref } from 'vue';

const text = ref('');
const onegrams = ref([]);
const twograms = ref([]);
const threegrams = ref([]);
const keywords = ref([]);
const showWords = ref(false);

const generate = (keywords, n) => {
  const result = new Set();
  const words = keywords.split(" ");
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    result.add(nGram);
  }
  return Array.from(result);
}

const run = () => {
  if (text.value.trim() === '') {
    showWords.value = false;
    keywords.value = [];
  } else {
    onegrams.value = generate(text.value, 1);
    twograms.value = generate(text.value, 2);
    threegrams.value = generate(text.value, 3);
    keywords.value = [...onegrams.value, ...twograms.value, ...threegrams.value];
    showWords.value = true;
  }
}
</script>

<template>
  <div class="ma-keywords-generator">

    <div class="ma-header">
      <h3>Keyword Generator</h3>
    </div>

    <div class="ma-body">
      <textarea v-model="text" placeholder="Enter a text here..."></textarea>
      <button @click="run">Generate</button>
    </div>
    <div class="display" v-if="showWords">
      <h3> Generated Keywords </h3>
      <div v-if="onegrams.length > 0">
        <h4>One-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in onegrams" :key="'onegram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="twograms.length > 0">
        <h4>Two-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in twograms" :key="'twogram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="threegrams.length > 0">
        <h4>Three-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in threegrams" :key="' threegram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Nothing entered</p>
      </div>
    </div>

  </div>
</template>
<style scoped>
.ma-keywords-generator {
  /* Add your styles here */
}

.ma-header {
  font-family: Arial;
  font-size: medium;
}

.display {

  font-family: Arial;
  background-color: #cae3ff;
  margin-top: 10px;
  border-style: groove;
  border-color: #000000;
  border-width: thin;
  font-size: small;
  padding-left: 10px;
  border-radius: 4px;
}

.ma-body {
  margin-top: 10px;
}

textarea {
  font-family: Arial;
  background-color: #cae3ff;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-style: groove;
  border-radius: 4px;
}

button {
  font-family: Arial;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: #007BFF;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>