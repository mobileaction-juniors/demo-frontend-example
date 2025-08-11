<template>
  <div class="flex flex-col space-y-4 md:flex-row
              md:space-y-0 md:space-x-4 p-4 w-full
              max-w-screen-xl mx-auto h-auto min:h-[34vh]"
  >
    <div class="w-full md:w-1/2 flex flex-col space-y-4 h-full">
      <InputTextPlace class="flex-1 w-full" />
      <div class="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <MaButton @click="countNGrams"
                  class="px-5 py-2.5 text-base mb-5 cursor-pointer bg-blue-600 text-white
                         rounded-lg border-0 transition-colors duration-300 hover:bg-blue-800"
                  variant="lighter"
                  icon="glass-bulk"
                  :highlight="store.getHighlightSubmit"
        >
          Generate N-Grams...
        </MaButton>
        <p class="text-sm text-gray-500">
          Total characters: <span class="font-bold">{{ store.getInputText.length }}</span>
        </p>
      </div>
    </div>

    <div class="w-full md:w-1/2 flex flex-col space-y-4 h-full">
      <MaTable3/>
      <div class="flex items-center justify-between">

      </div>
      <MaButton @click="copyToClipboard"
                class="
                  px-5 py-2.5 text-base mb-5 cursor-pointer bg-blue-600 text-white
                  rounded-lg border-0 transition-colors duration-300 hover:bg-blue-800
                  self-end"
                variant="lighter"
                icon="copy"
                :highlight="!store.highlightSubmit">
        Copy to clipboard
      </MaButton>
    </div>
  </div>
  <div class="flex justify-center w-full p-4">
    <NGramsControl
        :maxN="MAX_N"
    />
  </div>

</template>

<script setup>
import {sanitizeAndTokenize} from "@/utils/CleanDescription.js";
import {MaButton} from '@mobileaction/action-kit'
import NGramsControl from "@/components/NGramsControl.vue";
import InputTextPlace from "@/components/InputTextPlace.vue";
import {generateNgramRange, nthGram} from "@/utils/NGram.js";
import {giveNotification} from "@/utils/GiveNotification.js";
import MaTable3 from "@/components/MaTable3.vue";
import { useNGramStore } from '@/stores/ngramStore'
import {onMounted} from "vue";

const MAX_N = 10;
const MIN_N = 1;

const store = useNGramStore();

function countNGrams(){
  if (!store.getInputText || store.getInputText.trim() === '') {

    giveNotification("Empty message!","Your message is empty!", "warning");
    return;
  }
  let newGrams = [];

  let cleanedText = sanitizeAndTokenize(store.getInputText,store.getClearUnwantedSelected);
  let wordCount = cleanedText.length;

  if(wordCount < store.selectedNRange[0]){
    giveNotification("Range fault!","Your range doesn't cover your input message!","warning");
    return;
  }

  store.setHighlightSubmit();

  const sorted = generateNgramRange(store.maxN,store.minN);
  //sliding window
  for(let n of sorted){
    const resultN = nthGram(n, wordCount, cleanedText);

    if(resultN.size > 0){
      for (const [ngram, count] of resultN.entries()) {
        newGrams.push({
          word: ngram,
          count: count,
          density: count/wordCount *100
        });
      }
    }
  }
  newGrams.sort((a, b) => b.count - a.count);
  store.setResultGrams(newGrams);
}

function copyToClipboard() {
  const text = store.getResultGrams
      .map(item => `${item.word}: ${item.count} (${item.density.toFixed(2)}%)`)
      .join('\n');

  navigator.clipboard.writeText(text)
      .then(() => {
        giveNotification("Success", "Copied to Clipboard", "success")
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
}

onMounted(()=>{
  countNGrams();
})

</script>

<style>
</style>