


<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator: </span>

      <input v-model="inputText" placeholder="Enter text">

      <button @click="storeText">Enter</button>

      <select v-model="nGramLength">

        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>

      </select>

      <p>
        <span v-for="(word, index) in computedWords" :key="index"> {{ word }}
          {{ index !== computedWords.length - 1 ? ', ' : '' }}
        </span>
      </p>


    </div>
  </div>
</template>


<script>
export default {

  data() {
    return {
      inputText: '',
      storedText: '',
      computedWords: [],
      nGramLength: 1
    };
  },//vue dev tools

  methods: {
    computeWords(words, n){
      const splitWords = words.split(" ");
      const ans = [];
      console.log(splitWords.length)
      for(let i=0;i<splitWords.length-n+1;i++){
        const temp = [];
        for(let k=i;k<i+n;k++){
          temp.push(splitWords[k]);
        }
        const s = temp.join(' ');
        ans.push(s);
      }
      return ans;
    },

    storeText() {
      this.computedWords = this.computeWords(this.inputText,this.nGramLength);
    }
  }
};
</script>
