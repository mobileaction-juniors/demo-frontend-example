<script setup>
import { ref, computed } from 'vue';
import { MaInput, MaCheckbox2 as MaCheckbox, MaButton, MaBadge, MaCard } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription';

const N_GRAM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const input = ref('');
const n_grams = ref([1, 2, 3]);
const removeStopWords = ref(true);

const ngramsResult = computed(() => {
  let words = cleanDescription(input.value)
    .split(/\s+/)
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);

  const stopWords = cleanStopWords(input.value);
  words = words.filter(w => {
    if (removeStopWords.value && stopWords.includes(w)) return false;
    return true;
  });

  return n_grams.value.map(n => ({
    n,
    keywords: getNGrams(words, n)
  }));
});

const filteredNgramsResult = computed(() => ngramsResult.value.filter(ngram => ngram.keywords.length > 0));

const inputInfo = computed(() => {
  const cleaned = cleanDescription(input.value);
  return cleaned.trim().length +' characters, '+ cleaned.trim().split(/\s+/).filter(Boolean).length +' words'
})

const removedWords = computed(() => {
  const words = Array.from(new Set(
    input.value
      .split(/\s+/)
      .map(w => w.trim().toLowerCase())
      .filter(Boolean)
  ));
  return words
    .filter(word => removeStopWords.value && cleanStopWords(input.value).includes(word))
    .map(word => ({
      text: word,
      isStop: true,
    }));
});

const clearAll = () => {
    input.value = '';
}

function getNGrams(words, n) {
  if (words.length < n) return [];
  const result = [];
  for (let i = 0; i <= words.length - n; i++) {
    result.push(words.slice(i, i + n).join(' '));
  }
  return Array.from(new Set(result));
}

function onNgramToggle(ngram, checked) {
  if (checked && !n_grams.value.includes(ngram)) {
    n_grams.value.push(ngram);
  } else if (!checked) {
    n_grams.value = n_grams.value.filter(n => n != ngram);
  }
}

function onStopWordsToggle(checked) {
  removeStopWords.value = checked;
}

</script>

<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <h1 class="ma-title">Keyword Generator</h1>
            <p class="ma-description">Generate n-gram keywords from your text. Perfect for app descriptions, and ASO analysis.</p>
        </div>
        <div class="ma-keyword-generator-layout">
            <div class="ma-keyword-generator-layout-left">
           <MaCard
             class="ma-card"
             title="Text Input"
             description="Enter your text to generate keywords. For example, paste an app description from the App Store."
           >
             <template #default>
               <MaInput
                 class="ma-text-input"
                 type="textarea"
                 placeholder="Enter your text here"
                 :value="input"
                 @update:value="input = $event"
                 size="large"
               />
             </template>
             <template #footer>
               <div class="ma-button-container">
                 <div class="ma-description-count">{{ inputInfo }}</div>
                 <MaButton @click="clearAll" :size="medium" variant="stroke">Clear All</MaButton>
               </div>
             </template>
           </MaCard>
        <MaCard class="ma-card" title="Keywords" description="Generated keywords from your text.">
            <div v-if="!input.trim()" class="ma-result-description">Waiting for your input</div>
            <div v-else-if="filteredNgramsResult.length > 0" class="ma-ngram-container">
                <div class="ma-ngram-item" v-for="ngram in filteredNgramsResult" :key="ngram.n">
                    <div class="ma-ngram-item-title">
                        {{ ngram.n }}-gram <span class="ma-ngram-item-title-count">{{ ngram.keywords.length }}</span>
                    </div>
                    <div class="ma-ngram-item-keywords">
                        <MaBadge
                          v-for="keyword in ngram.keywords"
                          :key="keyword"
                          class="ma-ngram-item-keyword-badge"
                          size="large"
                          variant="basic"
                        >
                          {{ keyword }}
                        </MaBadge>
                    </div>
                    <div class="ma-divider"/>
                </div>
            </div>
            <div v-else class="ma-result-description">No keywords generated</div>
        </MaCard>
        </div>
        <div class="ma-keyword-generator-layout-right">
            <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
                <div class="ma-ngram-selection-container">
                    <MaCheckbox
                      v-for="ngram in N_GRAM_OPTIONS"
                      :key="ngram"
                      :checked="n_grams.includes(ngram)"
                      @change="checked => onNgramToggle(ngram, checked)"
                    >
                      {{ngram}}-gram
                    </MaCheckbox>
                </div>
            </MaCard>
            <MaCard class="ma-card" title="Filtering Options" description="Configure how keywords are filtered">
                <div class="ma-filtering-options-container"> 
                    <MaCheckbox
                      :checked="removeStopWords"
                      @change="checked => onStopWordsToggle(checked)"
                      >
                      Remove common stop words
                    </MaCheckbox>                    
                    <div v-if="removedWords.length > 0" class="font-semibold">Filtered Words</div>
                    <div class="flex flex-wrap gap-2">
                        <MaBadge
                          v-for="word in removedWords"
                          :key="word.text"
                          class="badge-stopword"
                          size="large"
                          variant="basic"
                        >
                          {{ word.text }}
                        </MaBadge>
                    </div>
                </div>
            </MaCard>
        </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keywords-generator {
  /* @apply w-full h-full bg-white p-6 flex flex-col gap-4; */
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .ma-header {
    /* @apply w-full h-full bg-white flex flex-col items-start justify-center gap-2; */
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;

    .ma-title {
      /* @apply text-4xl font-bold; */
      font-size: 2.25rem;
      font-weight: 700;
    }
    .ma-description {
      /* @apply text-lg text-gray-500; */
      font-size: 1.125rem;
      color: #6b7280;
    }
  }

  .ma-text-input-container {
    /* @apply w-full h-[150px] flex flex-col gap-2; */
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
  }
  
  .ma-description-count {
    /* @apply text-gray-500 text-sm; */
    color: #6b7280;
    font-size: 14px;
  }
  .ma-button-container {
    /* @apply w-full h-full flex justify-between; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .ma-ngram-container {
    /* @apply w-full h-full flex flex-col gap-2; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ma-ngram-item {
      /* @apply w-full h-full flex flex-col gap-2; */
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .ma-ngram-item-title {
        /* @apply text-lg font-bold; */
        font-size: 1.125rem;
        font-weight: 700;

        .ma-ngram-item-title-count {
          /* @apply bg-gray-100 text-black text-sm px-2 py-1 rounded-full; */
          background: #f3f4f6;
          color: #000;
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 9999px;
        }
      }

      .ma-ngram-item-keywords {
        /* @apply w-full flex flex-row flex-wrap gap-2; */
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;

        .ma-ngram-item-keyword {
          /* @apply text-sm text-gray-500; */
          font-size: 14px;
          color: #6b7280;
        }

      }

      .ma-divider {
        /* @apply w-full h-[1px] bg-gray-200; */
        width: 100%;
        height: 1px;
        background: #e5e7eb;
      }
    }
  }
}
.ma-keyword-generator-layout {
    /* @apply w-full h-full flex flex-row gap-4; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;

    &-left {
        /* @apply w-3/4 h-full flex flex-col gap-4; */
        width: 75%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &-right {
        /* @apply w-1/4 h-full flex flex-col gap-4; */
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}

.ma-ngram-selection-container {
    /* @apply w-full h-full grid grid-cols-2 gap-x-4 gap-y-2; */
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 16px;
    row-gap: 8px;

    .ma-ngram-selection-item {
        /* @apply w-full h-full flex flex-col gap-2; */
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}

.badge-stopword {
    /* @apply bg-gray-200 text-gray-500; */
    background-color: #e5e7eb;
    color: #6b7280;
}

.ma-filtering-options-container {
    /* @apply w-full h-full flex flex-col gap-2; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ma-filtering-options-item {
        /* @apply w-full h-full flex flex-col gap-2; */
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}

.ma-ngram-item-keyword-badge {
  border-color: #000 !important;
  color: #000 !important;
}
.ma-card {
  border: 1px solid #e5e7eb;
}
.ma-text-input {
      /* @apply w-full h-full; */
      width: 100%;
      height: 100%;

      ::v-deep(.ak-input__input) {
        /* @apply w-full h-full resize-none; */
        width: 100%;
        min-height: 150px;
        resize: none;
      }
}
.ma-result-description {
  /* @apply text-gray-400 text-base italic py-4; */
  color: #9ca3af;
  font-size: 14px;
  font-style: italic;
  padding: 16px 0;
}
</style>