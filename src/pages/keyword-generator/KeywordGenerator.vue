import './assets/tailwind.css'

<template>
  <section class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-3">Keyword Generator</h1>

    <label class="block mb-2 font-medium">App Description</label>
    <textarea
      v-model="input"
      class="w-full border rounded p-3 h-40"
      placeholder="Paste an app description here..."
      @input="onInput"
    />

    <div class="flex items-center gap-3 mt-3">
      <button @click="generate" class="border rounded px-3 py-1">Generate</button>
      <button @click="clearAll" class="border rounded px-3 py-1">Clear</button>
      <span class="text-sm text-gray-600">Tokens: {{ tokens.length }}</span>
    </div>

    <div v-if="hasAny" class="grid md:grid-cols-3 gap-4 mt-6">
      <div>
        <h2 class="font-semibold mb-2">1-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="k in result.unigrams" :key="'u:'+k">{{ k }}</li>
        </ul>
      </div>
      <div>
        <h2 class="font-semibold mb-2">2-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="k in result.bigrams" :key="'b:'+k">{{ k }}</li>
        </ul>
      </div>
      <div>
        <h2 class="font-semibold mb-2">3-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="k in result.trigrams" :key="'t:'+k">{{ k }}</li>
        </ul>
      </div>
    </div>

    <div v-else class="mt-6 text-gray-600">
      Enter/paste text and click <b>Generate</b>.
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { generateAllNgrams, cleanToTokens } from "@/utils/keywordUtils";

const input = ref("");
const result = ref({ unigrams: [], bigrams: [], trigrams: [] });
const tokens = ref([]);

function generate() {
  const all = generateAllNgrams(input.value);
  result.value = {
    unigrams: all.unigrams,
    bigrams: all.bigrams,
    trigrams: all.trigrams,
  };
  tokens.value = all.tokens;
}

function clearAll() {
  input.value = "";
  result.value = { unigrams: [], bigrams: [], trigrams: [] };
  tokens.value = [];
}

function onInput() {
  // canlı token sayacı (opsiyonel)
  tokens.value = cleanToTokens(input.value);
}

const hasAny = computed(
  () =>
    result.value.unigrams.length +
      result.value.bigrams.length +
      result.value.trigrams.length >
    0
);
</script>

<style scoped>
/* basic spacing only */
</style>