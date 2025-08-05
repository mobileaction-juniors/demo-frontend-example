<script>
export default {
  name: 'ma-keyword-generator',
  data() {
    return {
      inputText: '',
      keywords: [],
    };
  },
  methods: {
    generateKeywords() {
      if (!this.inputText.trim()) {
        this.keywords = [];
        return;
      }

      const cleanedText = this.inputText.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const words = cleanedText.split(' ').filter(word => word.length > 0);
      
      const result = [];
      
      // 1-gram
      const oneGram = [...new Set(words)];
      result.push({ type: '1-gram', keywords: oneGram });
      
      // 2-gram
      const twoGramSet = new Set();
      for (let i = 0; i < words.length - 1; i++) {
        twoGramSet.add(words[i] + ' ' + words[i + 1]);
      }
      result.push({ type: '2-gram', keywords: [...twoGramSet] });
      
      // 3-gram
      const threeGramSet = new Set();
      for (let i = 0; i < words.length - 2; i++) {
        threeGramSet.add(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2]);
      }
      result.push({ type: '3-gram', keywords: [...threeGramSet] });
      
      this.keywords = result;
    },
  },
};
</script>

<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-4">Keyword Generator</h2>
    
    <div class="mb-5">
      <textarea 
        v-model="inputText"
        placeholder="Enter your text here..."
        rows="4"
        class="w-full p-2 border border-gray-300 rounded mb-3"
      ></textarea>
      
      <button @click="generateKeywords" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Generate Keywords
      </button>
    </div>

    <div v-if="keywords.length > 0" class="mt-5">
      <div v-for="group in keywords" :key="group.type" class="mb-5">
        <h3 class="text-lg font-semibold mb-3">{{ group.type }}</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(keyword, index) in group.keywords" 
            :key="keyword"
            class="inline-block bg-gray-100 px-2 py-1 rounded text-sm"
          >
            {{ keyword }}{{ index < group.keywords.length - 1 ? ', ' : '.' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>