<template>
  <div class="p-4">
    <div class="mb-4">
      <div class="mb-2 text-xl font-semibold">
        Keyword Density Calculator
      </div>
      <div class="mb-4">
        {{ text }}
      </div>
      <textarea
          v-model="userInput"
          class="w-full px-3 py-2 border rounded"
          rows="4"
      />
      <button
          @click="calculateKeywords"
          class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Keywords
      </button>
    </div>
    <div
        v-if="showTable"
        class="mt-4"
    >
      <div class="mb-2 text-lg font-semibold">
        Keyword Density Table
      </div>
      <table class="w-full border">
        <thead>
        <tr>
          <th class="border px-4 py-2">
            Keyword
          </th>
          <th class="border px-4 py-2">
            Count
          </th>
          <th class="border px-4 py-2">
            Percentage
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(keywordData, keyword) in keywordCounts"
            :key="keyword">
          <td class="border px-4 py-2">
            {{ keyword }}
          </td>
          <td class="border px-4 py-2">
            {{ keywordData.count }}
          </td>
          <td class="border px-4 py-2">
            {{ keywordData.percentage.toFixed(2) }}%
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

  import { ref, computed } from 'vue';

  const userInput = ref('');
  const showTable = ref(false);

  const text = computed(() => {
    return userInput.value;
  });

  const keywordCounts = computed(() => {
    const counts = {};
    const words = userInput.value.split(' ').map(word => word.toLowerCase().trim());
    words.forEach(word => {
      if (counts[word]) {
        counts[word].count++;
      } else {
        counts[word] = {
          count: 1,
          percentage: 0,
        };
      }
    });
    const totalWords = words.length;
    Object.keys(counts).forEach(key => {
      counts[key].percentage = (counts[key].count / totalWords) * 100;
    });
    return counts;
  });

  const calculateKeywords = () => {
    showTable.value = true;
  };


</script>

