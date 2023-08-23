<script setup>
import {ref, onMounted} from 'vue';
import { Button as AButton, Table as ATable, Input} from 'ant-design-vue';
import {filterArr} from "@/cleanupResources";
const keywordData = ref([]);
const userInput = ref('');
const characterCount = ref(0);
const showTable = ref(false);
const ATextArea = Input.TextArea;
const columns = ref([
  { title: 'Keyword', dataIndex: 'keyword', key: 'keyword' },
  { title: 'Count', dataIndex: 'count', key: 'count' },
  { title: 'Density', dataIndex: 'percentage', key: 'percentage' },
]);
const countAndFindDensity = () => {
  const allWords = userInput.value.split(' ');
  for(let i = 0; i < allWords.length; ++i){
    allWords[i] = allWords[i].toLowerCase();
  }
  const filteredWords = allWords.filter((word) => !filterArr.includes(word.toLowerCase()));
  const densityMap = {};
  const keywordKeys = [];
  for (const word of filteredWords) {
    if (!densityMap[word]) {
      densityMap[word] = 1;
      keywordKeys.push(word);
    } else {
      densityMap[word]++;
    }
  }
  const totalWords = filteredWords.length;
  keywordData.value = keywordKeys.map(keyword => ({
    keyword,
    count: densityMap[keyword],
    percentage: ((densityMap[keyword] / totalWords) * 100).toFixed(2) + '%',
  }));
  showTable.value = true;
  characterCount.value = userInput.value.length;
}
onMounted(()=> {
  userInput.value = sessionStorage.getItem("initialText");
})
</script>

<template>
  <div class="keyword-density">
    <div>
      <div class="text-input">
        <a-text-area v-model="userInput" placeholder="Please enter the text here"></a-text-area>
      </div>
        <a-button type="primary" @click="countAndFindDensity">Count</a-button>
      <div class="character-count">Total characters: {{characterCount}}</div>
    </div>
    <div class="result-table" v-if="showTable">
      <a-table :columns="columns" :dataSource="keywordData" :pagination="false"></a-table>
    </div>
  </div>
</template>

<style scoped>
.keyword-density {
  @apply max-w-md mx-auto flex;
}
.text-input {
  @apply mt-10 mb-4 justify-start;
}
button{
  @apply text-white bg-black justify-start;
}
.character-count {
  @apply mt-2 mb-4 justify-end font-bold;
}
.result-table {
  @apply mt-10 mb-4 ml-2 flex justify-end text-white;
}
</style>
