<template>
  <template v-if="tableData">
    <div class="ma-table">
      <a-table :columns="columns" :data-source="tableData" bordered />
      <a-tooltip placement="topLeft" title="Copy to Clipboard">
        <a-button class="ma-copy-button" @click="copyToClipboard">
          <font-awesome-icon icon="copy" />
        </a-button>
      </a-tooltip>
    </div>
  </template>
  <template v-else>
    <p>No value to show</p>
  </template>
</template>

<script setup>
import {
  Table as ATable,
  Button as AButton,
  Tooltip as ATooltip,
  message
} from 'ant-design-vue';
import {ref, watchEffect} from 'vue';
import {filterArr, regex, splitRegex} from '@/cleanupResources';

const props = defineProps(['keywords'])
const tableData = ref([]);

const columns = [
  {
    title: 'Keyword',
    dataIndex: 'keyword',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Density',
    dataIndex: 'density',
  },
];

// function for copying to clipboard:
const copyToClipboard = async () => {
  let dataToCopy = '';
  tableData.value.forEach( (value) => {
        dataToCopy += `keywords: "${value.keyword}", count: ${value.count}, density: ${value.density}\n`;
  });
  try {
    await navigator.clipboard.writeText(dataToCopy);
    success();
  } catch (error) {
    error();
  }
}

// to show error message for clipboard
const error = () => {
  message.error('Error Copying to Clipboard',4);
};

// to show success message for clipboard
const success = () => {
  message.success('Copied!',4);
};

// calculate density and display table rows
const calculateDensity = () => {
  let wordArr = props.keywords.split(" ");
  wordArr.forEach((word, index) => {
    let newText = word.toLowerCase().replace(splitRegex, '');
    newText = newText.replace(regex, '');
    newText = newText.replace(/\s+/g, ' ');
    newText = newText.trim();
    wordArr[index] = newText;
  });
  let wordCount = wordArr.length;

  // remove disliked words:
  wordArr = wordArr.filter(token => !filterArr.includes(token.toLowerCase()));

  const wordStorage = new Map();
  wordArr.forEach(word => {
    if (word) {
      if (wordStorage.has(word)) {
        wordStorage.set(word, wordStorage.get(word) + 1);
      } else {
        wordStorage.set(word, 1);
      }
    }
  });

  const groupedByCount = new Map();
  wordStorage.forEach((count, word) => {
    if (!groupedByCount.has(count)) {
      groupedByCount.set(count, []);
    }
    groupedByCount.get(count).push(word);
  });

  tableData.value = [];
  let indexOfData = 1;
  groupedByCount.forEach((words, count) => {
    tableData.value.push({
      key: indexOfData,
      keyword: words.join(', '),
      count: count,
      density: (( count / wordCount ) * 100).toFixed(2) + "%",
    });
    indexOfData++;
  });
}

// calculate everytime the text changes
watchEffect(() => {
  calculateDensity();
});

// Initial calculation
calculateDensity();
</script>

<style scoped>
.ma-table {
  @apply mx-auto w-2/3 md:w-2/5;
}

.ma-copy-button {
  @apply ml-0;
}
</style>