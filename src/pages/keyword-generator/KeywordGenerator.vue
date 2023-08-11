

<template>
  <div class="ma-keywords-generator">
<!--    <div class="ma-header">-->
      <span class="ma-title">Keyword Generator </span>

      <input v-model="inputText" placeholder="Enter text">
      <Button type="primary"   @click="storeText">Enter</Button>

      <select v-model="nGramLength">
        <option :value="num" v-for="num in dropdownAr" :key="num.id">{{num}}</option>
      </select>
      <div class="kutucukDiv">

          <span v-for="(word, index) in computedWords" :key="index"> {{ word }}
            {{ index !== computedWords.length - 1 ? ', ' : '' }}
          </span>

      </div>

    </div>
<!--  </div>-->
</template>
<script>

import {regex, filterArr} from "@/cleanupResources";
import {Button} from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

export default {
  components:{
    Button,
  },
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
      text = text.replace(regex,''); //remove special characters
      const textAr2 = text.split(" "); //split
      const textAr = textAr2.filter(t => t !== ''); //filter blanks
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
        for(let k=i;k<splitWords.length;k++){
          let flag=0;
          for(let j=0;j<temp.length;j++){
            if(splitWords[k] === temp[j]){
              flag=1;
              break;
            }
          }
          if(flag===0)temp.push(splitWords[k]);
          if(temp.length===n)break;
        }
        if(temp.length===n){const s = temp.join(' ');ans.push(s);}
      }
      return Array.from(new Set(ans));
    },
    storeText() {
      this.computedWords = this.computeWords(this.getCleanInput(this.inputText),this.nGramLength);
    }
  }
};
</script>


<style scoped>
.ma-keywords-generator *{
  margin: 5px;
}
.ma-keywords-generator{
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.ma-title{
  text-align: center;
  color: cornflowerblue;
}

.kutucukDiv{
  min-height: 100px;
  border: 1px solid black;
  text-align: center;

}

</style>

