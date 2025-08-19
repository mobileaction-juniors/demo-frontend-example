<template>
  <section class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-3">Keyword Generator</h1>

    <MaForm :model="{ description: descriptionText }" label-position="top">
      <MaInput
        id="app-desc"
        v-model:value="descriptionText"
        type="textarea"
        label="App Description"
        placeholder="Paste an app description here..."
        rows="10"
      />
    </MaForm>

    <div class="flex items-center gap-3 mt-3">
      <MaButton @click="generateKeywords">Generate</MaButton>
      <MaButton variant="outline" @click="resetForm">Clear</MaButton>
      <span class="text-sm text-gray-600">Tokens: {{ tokenCount }}</span>
    </div>

    <div v-if="hasNgramResults" class="grid md:grid-cols-3 gap-4 mt-6">
      <div>
        <h2 class="font-semibold mb-2">1-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="(keyword, index) in unigramKeywords" :key="`u:${index}`">
            {{ keyword }}
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-semibold mb-2">2-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="(keyword, index) in bigramKeywords" :key="`b:${index}`">
            {{ keyword }}
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-semibold mb-2">3-gram</h2>
        <ul class="list-disc pl-5">
          <li v-for="(keyword, index) in trigramKeywords" :key="`t:${index}`">
            {{ keyword }}
          </li>
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
import { MaButton, MaInput, MaForm } from "@mobileaction/action-kit";
import "@mobileaction/action-kit/dist/style.css";

const descriptionText   = ref("");
const unigramKeywords   = ref([]);
const bigramKeywords    = ref([]);
const trigramKeywords   = ref([]);

const tokenCount = computed(() => cleanToTokens(descriptionText.value).length);

function generateKeywords() {
  const results = generateAllNgrams(descriptionText.value);
  unigramKeywords.value = results.unigrams || [];
  bigramKeywords.value  = results.bigrams  || [];
  trigramKeywords.value = results.trigrams || [];
}

function resetForm() {
  descriptionText.value = "";
  unigramKeywords.value = [];
  bigramKeywords.value  = [];
  trigramKeywords.value = [];
}

const hasNgramResults = computed(() => {
  const total =
    unigramKeywords.value.length +
    bigramKeywords.value.length +
    trigramKeywords.value.length;
  return total > 0;
});
</script>

<style scoped></style>
