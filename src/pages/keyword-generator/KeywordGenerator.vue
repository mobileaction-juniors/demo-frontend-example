<script setup>
import { ref, computed } from 'vue';
import { MaInput, MaCheckbox2 as MaCheckbox, MaButton, MaBadge, MaCard } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription';

const N_GRAM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const input = ref('');
const n_grams = ref([1, 2, 3]);
const removeStopWords = ref(true);
const ngramsResult = ref([]);

const filteredNgramsResult = computed(() => ngramsResult.value.filter(ngram => ngram.keywords.length > 0));

const cleanedInput = computed(() => cleanDescription(input.value).trim().toLowerCase().split(/\s+/).filter(Boolean));

const inputInfo = computed(() => {
  const charCount = input.value.trim().length;
  const wordCount = cleanedInput.value.length;
  return charCount +' characters, '+ wordCount +' words'
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
    ngramsResult.value = [];
}

const convert = () => {
  let words = cleanedInput.value;

  const stopWords = cleanStopWords(input.value);
  words = words.filter(w => {
    if (removeStopWords.value && stopWords.includes(w)) return false;
    return true;
  });

  ngramsResult.value = n_grams.value.map(n => ({
    n,
    keywords: getNGrams(words, n)
  }));
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
                 <div class="ma-button-container-right">
                    <MaButton @click="clearAll" :size="medium" variant="stroke">Clear All</MaButton>
                    <MaButton @click="convert" :size="medium" variant="stroke" icon="arrow-right">Convert</MaButton>
                 </div>
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
   @apply w-full h-full bg-white p-6 flex flex-col gap-4; 
  .ma-header {
     @apply w-full h-full bg-white flex flex-col items-start justify-center gap-2; 
    .ma-title {
      @apply text-4xl font-bold;
    }
    .ma-description {
      @apply text-lg text-gray-500;
    }
  }

  .ma-text-input-container {
    @apply w-full h-[150px] flex flex-col gap-2;    
  }
  
  .ma-description-count {
    @apply text-gray-500 text-sm;
  }
  .ma-button-container {
    @apply w-full h-full flex justify-between;
    .ma-button-container-right {
      @apply flex flex-row gap-2;
    }
  }

  .ma-ngram-container {
    @apply w-full h-full flex flex-col gap-2;

    .ma-ngram-item {
      @apply w-full h-full flex flex-col gap-2;

      .ma-ngram-item-title {
        @apply text-lg font-bold;

        .ma-ngram-item-title-count {
          @apply bg-gray-100 text-black text-sm px-2 py-1 rounded-full;
        }
      }

      .ma-ngram-item-keywords {
        @apply w-full flex flex-row flex-wrap gap-2;

        .ma-ngram-item-keyword {
          @apply text-sm text-gray-500;
        }

      }

      .ma-divider {
        @apply w-full h-[1px] bg-gray-200;
      }
    }
  }
}
.ma-keyword-generator-layout {
    @apply w-full h-full flex flex-row gap-4;

    &-left {
        @apply w-3/4 h-full flex flex-col gap-4;
    }

    &-right {
        @apply w-1/4 h-full flex flex-col gap-4;
    }
}

.ma-ngram-selection-container {
    @apply w-full h-full grid grid-cols-2 gap-x-4 gap-y-2;

    .ma-ngram-selection-item {
        @apply w-full h-full flex flex-col gap-2;
    }
}

.badge-stopword {
    @apply bg-gray-200 text-gray-500;
}

.ma-filtering-options-container {
    @apply w-full h-full flex flex-col gap-2;

    .ma-filtering-options-item {
        @apply w-full h-full flex flex-col gap-2;
    }
}

.ma-ngram-item-keyword-badge {
  @apply border-black text-black;
}
.ma-card {
  @apply border border-gray-200;
}
.ma-text-input {
      @apply w-full h-full;

      ::v-deep(.ak-input__input) {
        @apply w-full h-full resize-none min-h-[150px];
      }
}
.ma-result-description {
  @apply text-gray-400 text-base italic py-4;
}
</style>