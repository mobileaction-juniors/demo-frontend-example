


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

import {filterArr} from "@/cleanupResources";

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
    getCleanInput(text){
      const textAr = text.split(" ");
      const r = [];
      for(let i=0;i<textAr.length;i++){
        let flag=0;
        for(let j=0;j<filterArr.length;j++){
          if(textAr[i] === filterArr[j]){
            flag=1;
            break;
          }
        }
        if(flag===0) r.push(textAr[i]);
      }
      console.log(textAr);
      console.log(r);
      return r;
    },
    createAr(n){
      const r = [];
      for(let i=0;i<n;i++) r.push(i+1);
      return r;
    },
    computeWords(splitWords, n){
      const ans = [];
      for(let i=0;i<splitWords.length-n+1;i++){
        const temp = [];
        for(let k=i;k<i+n;k++) temp.push(splitWords[k]);
        const s = temp.join(' ');
        ans.push(s);
      }
      //console.log(ans);
      //console.log(splitWords);
      return ans;
    },
    storeText() {
      this.computedWords = this.computeWords(this.getCleanInput(this.inputText),this.nGramLength);
    }
  }
};

</script>



