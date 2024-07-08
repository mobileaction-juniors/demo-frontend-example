<script setup>
import { ref} from 'vue';

import { MaButton } from "@mobileaction/action-kit";
import { MaSelect } from "@mobileaction/action-kit";

const text = ref('');
const onegrams = ref([]);
const twograms = ref([]);
const threegrams = ref([]);
const fourgrams = ref([]);
const fivegrams = ref([]);
const sixgrams = ref([]);
const sevengrams = ref([]);
const eightgrams = ref([]);
const ninegrams = ref([]);
const tengrams = ref([]);
const keywords = ref([]);
const showWords = ref(false);
const selectedNgrams = ref([]);

const options = [
  { label: '1-gram', value: 1 },
  { label: '2-gram', value: 2 },
  { label: '3-gram', value: 3 },
  { label: '4-gram', value: 4 },
  { label: '5-gram', value: 5 },
  { label: '6-gram', value: 6 },
  { label: '7-gram', value: 7 },
  { label: '8-gram', value: 8 },
  { label: '9-gram', value: 9 },
  { label: '10-gram', value: 10 },
];

const generate = (keywords, n) => {
  const result = new Set();
  const words = keywords.split(" ");
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    result.add(nGram);
  }
  return Array.from(result);
};

const run = (param) => {
  let txt = param ? removeUnwanted() : text.value;

  if (txt.trim() === '') {
    showWords.value = false;
    keywords.value = [];
  } else {
    onegrams.value = [];
    twograms.value = [];
    threegrams.value = [];
    fourgrams.value = [];
    fivegrams.value = [];
    sixgrams.value = [];
    sevengrams.value = [];
    eightgrams.value = [];
    ninegrams.value = [];
    tengrams.value = [];

    selectedNgrams.value.forEach(n => {
      switch(n) {
        case 1: onegrams.value = generate(txt, 1); break;
        case 2: twograms.value = generate(txt, 2); break;
        case 3: threegrams.value = generate(txt, 3); break;
        case 4: fourgrams.value = generate(txt, 4); break;
        case 5: fivegrams.value = generate(txt, 5); break;
        case 6: sixgrams.value = generate(txt, 6); break;
        case 7: sevengrams.value = generate(txt, 7); break;
        case 8: eightgrams.value = generate(txt, 8); break;
        case 9: ninegrams.value = generate(txt, 9); break;
        case 10: tengrams.value = generate(txt, 10); break;
      }
    });

    keywords.value = [
      ...onegrams.value,
      ...twograms.value,
      ...threegrams.value,
      ...fourgrams.value,
      ...fivegrams.value,
      ...sixgrams.value,
      ...sevengrams.value,
      ...eightgrams.value,
      ...ninegrams.value,
      ...tengrams.value
    ];

    showWords.value = true;
  }
};

const removeUnwanted = () => {
  const unwantedWords = new Set(['a', 'an', 'the', 'is']);
  const words = text.value.split(' ');
  const filteredWords = words.filter(word => !unwantedWords.has(word.toLowerCase()));
  return filteredWords.join(' ');
};
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <h3>Keyword Generator</h3>
    </div>
    <div class="ma-body">
      <textarea v-model="text" placeholder="Enter a text to generate associated keywords. Select N values from the multi-select below"></textarea>
      <div class="input-container">
        <MaSelect
            v-model:value="selectedNgrams"
            class="left-side"
            :options=options
            size="small"
            allow-clear
            option-filter-prop="label"
            show-search
            mode="multiselect"
            dropdown-match-select-width>
          <template #prefixIcon>"N"</template>
        </MaSelect>


        <MaButton class="right-side" @click="run(false)" icon="brain">Generate</MaButton>
        <MaButton class="middle-side" @click="run(true)" icon="brain">Generate Without 'Is, A, An, The'</MaButton>
      </div>
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
          <li v-for="(keyword, index) in threegrams" :key="'threegram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="fourgrams.length > 0">
        <h4>Four-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in fourgrams" :key="'fourgram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="fivegrams.length > 0">
        <h4>Five-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in fivegrams" :key="'fivegram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="sixgrams.length > 0">
        <h4>Six-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in sixgrams" :key="'sixgram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="sevengrams.length > 0">
        <h4>Seven-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in sevengrams" :key="'sevengram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="eightgrams.length > 0">
        <h4>Eight-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in eightgrams" :key="'eightgram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="ninegrams.length > 0">
        <h4>Nine-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in ninegrams" :key="'ninegram-' + index">{{ keyword }}</li>
        </ul>
      </div>
      <div v-if="tengrams.length > 0">
        <h4>Ten-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in tengrams" :key="'tengram-' + index">{{ keyword }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.input-container {
  display: flex;
  justify-content: space-between;
}

.left-side {
  flex: 1;
  justify-content: flex-start;
  margin: 5px;
}

.middle-side {
  flex: 1;
  justify-content: center;
  margin: 5px;
}

.right-side {
  flex: 1;
  justify-content: center;
  margin: 5px;
}
button {
  margin-top: 10px;
  font-family: Arial;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: #007BFF;
  border-radius: 4px;
  cursor: pointer;
}
</style>