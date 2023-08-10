


<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <span>Keyword Generator: </span>

      <input v-model="inputText" placeholder="Enter text">
      <button @click="storeText">Enter</button>


      <select v-model="nGramLength">
        <option :value="num" v-for="num in dropdownAr" :key="num.id">{{num}}</option>
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
      nGramLength: 1,
      dropdownAr:[],
    };
  },//vue dev tools

  created(){
    this.dropdownAr = this.createAr(10);
  },

  methods: {
    createAr(n){
      const r = [];
      for(let i=0;i<n;i++) r.push(i+1);
      return r;
    },
    computeWords(words, n){
      const splitWords = words.split(" ");
      const ans = [];
      for(let i=0;i<splitWords.length-n+1;i++){
        const temp = [];
        for(let k=i;k<i+n;k++) temp.push(splitWords[k]);
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
