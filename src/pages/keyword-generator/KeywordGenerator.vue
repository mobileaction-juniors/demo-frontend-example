


<template>

  <div class=" justify-center p-10">

    <div class="ma-keywords-generator mx-auto flex flex-col w-1/2 p-4 bg-white rounded-lg shadow-lg pt-8">

      <span class="text-teal-500 text-center text-lg font-semibold mb-2">Keyword Generator</span>

      <input v-model="inputText" class="py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-teal-300" placeholder="Enter text">
      <Button type="primary" class="py-2 px-4 mt-2 border-teal-600 flex items-center justify-center bg-teal-500 text-white rounded-lg hover:bg-orange-500 hover:border-orange-500" @click="storeText">Enter</Button>

      <select v-model="nGramLength" class="py-2 px-4 mt-2 border rounded-lg">
        <option :value="num" v-for="num in dropdownAr" :key="num">{{num}}</option>
      </select>

      <div class="ma-tinyDiv border border-teal-600 mt-2 py-2 px-4 text-center">
        <span class="" v-for="(word, index) in computedWords" :key="index">{{ word }}{{ index !== computedWords.length - 1 ? ', ' : '' }}</span>
      </div>

    </div>

  </div>

</template>


<script>
import {regex, filterArr} from "@/cleanupResources";
import {Button} from 'ant-design-vue';

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
  },
  created(){
    this.dropdownAr = this.createAr(10) ;
  },
  methods: {
    emitDensity(DMR){
      this.$emit('densityEmitted', DMR);
    },
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
    storeText(){
      this.computedWords = this.computeWords(this.getCleanInput(this.inputText),this.nGramLength);
      this.calculateDensity(this.inputText);
    },
    calculateDensity(inputText){
      const wordCountMap = new Map();
      const inputArray = (inputText.split(" ")).filter(t => t !== '');
      for (const word of inputArray) {
        if(!wordCountMap.has(word)) wordCountMap.set(word,1);
        else wordCountMap.set(word,wordCountMap.get(word)+1);
      } //emit

      const DMR = new Map();
      for (const key of wordCountMap.keys()) {
        let x =  ((wordCountMap.get(key)/inputArray.length)*100).toFixed(2);
        const temp = DMR.get(x) || [];
        temp.push(key);
        DMR.set(x,temp);
      }

      for (const key of DMR.keys()){
        console.log(key + " " +DMR.get(key));
      }

      this.emitDensity(DMR);

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

.ma-tinyDiv{
  min-height: 100px;
  text-align: center;
}

</style>



