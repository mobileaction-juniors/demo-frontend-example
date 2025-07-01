<script setup>
import { ref, computed } from 'vue';

const inputText = ref('');

function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}

function getNGrams(words, n) {
  const ngrams = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.add(words.slice(i, i + n).join(' '));
  }
  return Array.from(ngrams);
}

const ngramKeywords = computed(() => {
  const cleaned = cleanText(inputText.value);
  if (!cleaned) return { one: [], two: [], three: [] };
  const words = cleaned.split(' ');
  return {
    one: Array.from(new Set(words)),
    two: getNGrams(words, 2),
    three: getNGrams(words, 3),
  };
});
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>
        <div style="margin-top: 1em;">
            <label for="desc-input">Enter application description:</label>
            <textarea
                id="desc-input"
                v-model="inputText"
                rows="4"
                style="width: 100%; margin-top: 0.5em;"
                placeholder="Paste or type your app description here..."
            />
        </div>
        <div v-if="inputText.trim()" style="margin-top: 2em;">
            <div>
                <strong>1-gram keywords:</strong>
                <div style="margin: 0.5em 0;">
                    <span v-for="kw in ngramKeywords.one" :key="kw" style="display: inline-block; margin: 0 0.5em 0.5em 0; padding: 0.2em 0.6em; background: #eee; border-radius: 4px;">{{ kw }}</span>
                </div>
            </div>
            <div>
                <strong>2-gram keywords:</strong>
                <div style="margin: 0.5em 0;">
                    <span v-for="kw in ngramKeywords.two" :key="kw" style="display: inline-block; margin: 0 0.5em 0.5em 0; padding: 0.2em 0.6em; background: #e0f7fa; border-radius: 4px;">{{ kw }}</span>
                </div>
            </div>
            <div>
                <strong>3-gram keywords:</strong>
                <div style="margin: 0.5em 0;">
                    <span v-for="kw in ngramKeywords.three" :key="kw" style="display: inline-block; margin: 0 0.5em 0.5em 0; padding: 0.2em 0.6em; background: #ffe0b2; border-radius: 4px;">{{ kw }}</span>
                </div>
            </div>
        </div>
    </div>
</template>