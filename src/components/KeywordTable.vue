<template>
  <div class="ma-table">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowClassName="getRowClassName"
    />
    <a-button @click="copyToClipboard" type="primary" html-type="submit"
      >Copy to Clipboard</a-button
    >
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from "vue";
import { Button as AButton, Table as ATable } from "ant-design-vue";
import { regex, splitRegex, filterArr } from "../cleanupResources";

const props = defineProps({
  initialText: {
    type: String,
    required: true,
  },
});

const columns = [
  {
    title: "Keyword",
    dataIndex: "keyword",
    key: "keyword",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Density",
    dataIndex: "density",
    key: "density",
  },
];
const dataSource = ref([]);
let totalCount = 0;
watch(
  () => props.initialText,
  (newText) => {
    updateTable(newText);
  }
);

onMounted(() => {
  updateTable(props.initialText);
});
const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(regex, "")
    .split(splitRegex)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .filter((word) => !filterArr.includes(word))
    .join(" ");
};
const countKeywords = (words) => {
  //this method takes an array as inputs (words) and it stores each keyword in keywordCountMap if the word exist it increments the count of that keyword by one
  const keywordCountMap = {};

  words.forEach((word) => {
    if (!keywordCountMap[word] && !filterArr.includes(word)) {
      keywordCountMap[word] = 0;
    }
    keywordCountMap[word]++;
  });

  return keywordCountMap;
};

const calculateDensity = (count, totalCount) => {
  //toFixed(1) is used for rounding the result to one decimal place
  return ((count / totalCount) * 100).toFixed(1);
};
const mergeKeywords = (keywordCountMap) => {
  //it combines keywords with the same count and density values into a single row.
  const mergedKeywords = {};

  for (const keyword in keywordCountMap) {
    const count = keywordCountMap[keyword];
    const density = calculateDensity(count, totalCount);

    const key = `${count}-${density}`;

    if (!mergedKeywords[key]) {
      mergedKeywords[key] = [];
    }

    mergedKeywords[key].push(keyword);
  }

  return mergedKeywords;
};

const updateTable = (text) => {
  if (text) {
    const cleanedText = cleanText(text);
    const words = getWords(cleanedText);
    totalCount = words.length;
    const keywordCountMap = countKeywords(words);
    const mergedKeywords = mergeKeywords(keywordCountMap);
    const keywordData = generateKeywordData(mergedKeywords);
    dataSource.value = keywordData;
  }
};

const getWords = (cleanedText) => {
  //getwords one by one
  return cleanedText.split(" ");
};
const generateKeywordData = (mergedKeywords) => {
  const keywordData = [];

  for (const key in mergedKeywords) {
    const [count, density] = key.split("-");
    const keywords = mergedKeywords[key].filter(
      (keyword) => !filterArr.includes(keyword)
    );

    if (keywords.length > 0 && !isNaN(count) && !isNaN(density)) {
      const densityValue =
        keywords.length === 1 ? density : calculateDensity(parseInt(count), totalCount);
      keywordData.push({
        key: keywords.join(" , "),
        keyword: keywords.join(" , "),
        count: parseInt(count),
        density: densityValue,
      });
    }
  }

  return keywordData;
};

const getRowClassName = (_, index) => {
  //I didn't use record so I add _ as placeholder because there is no specific data that I want to keep
  return index % 2 === 0 ? "ma-default-row" : "ma-gray-row";
};
const copyToClipboard = () => {
  const csvData =
    "Keywords,Count,Density\n" +
    dataSource.value
      .map((row) => {
        const keywords = row.key.split(", ").join(" - ");
        return `${keywords},${row.count},${row.density}`;
      })
      .join("\n");
  navigator.clipboard.writeText(csvData);
};
</script>

<style scoped>
:deep .ant-table-thead > tr > th {
  @apply bg-blue-700 text-white;
}
:deep .ant-btn-primary {
  @apply bg-blue-700 border-blue-700;
}
:deep .ma-default-row {
  @apply bg-white;
}

:deep .ma-gray-row {
  @apply bg-gray-100;
}

.ma-table {
  @apply w-full lg:w-4/12;
}
</style>
