<template>
    <div class="max-w-[1000px]  mx-auto p-4 flex flex-col md:flex-row md:justify-around items-center md:items-start">
      <div class="mb-4 w-full md:w-[35%]">
        <MaInput
          v-model:value="userText"
          type="textarea"
          placeholder="Write your text here..."
          class="w-full"
          disabled="true"
          @input="resetResults"
        />
      <div class="flex justify-between">
        <div class="flex justify-center">
          <MaButton @click="analyzeKeywords" size="medium" variant="filled" color="black">
            Count
          </MaButton>
        </div>
        <div class="mt-2">
          Total charachters: <span class="font-bold">{{wordCount}}</span>
        </div>
      </div>
      </div>
      <div v-if="showResults" class="w-full md:w-[35%]">
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th class="px-4 py-2 border">Keyword</th>
              <th class="px-4 py-2 border">Count</th>
              <th class="px-4 py-2 border">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in keywordResults" :key="result.count">
              <td class="px-4 py-2 border">{{ result.keywords.join(', ') }}</td>
              <td class="px-4 py-2 border">{{ result.count }}</td>
              <td class="px-4 py-2 border">{{ result.percentage.toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-4">
        <MaButton @click="$emit('goToMainPage')" size="medium" variant="outlined" color="black">
          Go to Main Page
        </MaButton>
      </div>
    </div>
  </template>
  
  <script>
  import { MaButton, MaInput } from "@mobileaction/action-kit";
  export default {
    name: "KeywordAnalysisPage",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        userText: this.text,
        keywordResults: [],
        showResults: false,
        wordCount: null,
      };
    },
    components: {
      MaButton,
      MaInput,
    },
    methods: {
      analyzeKeywords() {
        const words = this.userText.trim().toLowerCase().split(" ");
        this.wordCount = words.length;
        const wordFrequency = {};
        words.forEach((word) => {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
        const groupedResults = {};
        Object.keys(wordFrequency).filter(keyword => wordFrequency[keyword] > 1).forEach((keyword) => {
          const count = wordFrequency[keyword];
          if (!groupedResults[count]) {
            groupedResults[count] = [];
          }
          groupedResults[count].push(keyword);
        });
        this.keywordResults = Object.keys(groupedResults).map((count) => {
          const percentage = (count / this.wordCount) * 100;
          return { count: parseInt(count), keywords: groupedResults[count], percentage };
        }).sort((a, b) => b.count - a.count); 
        this.showResults = true;
      }
    },
  };
  </script>
  