<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { MaInput, MaCheckbox2 as MaCheckbox, MaButton, MaBadge, MaCard, MaNotification, MaTooltip2 as MaTooltip, MaEmpty, MaModal } from '@mobileaction/action-kit'
import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription';

const N_GRAM_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const input = ref('');
const n_grams = ref([1, 2, 3]);
const removeStopWords = ref(true);
const ngramsResult = ref([]);
const isInputChanged = ref(false);
const showModal = ref(false);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= 768);

const filteredNgramsResult = computed(() =>
  ngramsResult.value
    .filter(ngram => ngram.keywords.length > 0)
    .sort((a, b) => a.n - b.n)
);

const cleanedInput = computed(() => cleanDescription(input.value).trim().toLowerCase().split(/\s+/).filter(Boolean));

const inputInfo = computed(() => {
  const charCount = input.value.trim().length;
  const wordCount = cleanedInput.value.length;
  return charCount +' characters, '+ wordCount +' words'
})


const clearAll = () => {
    input.value = '';
    ngramsResult.value = [];
    MaNotification.info({
    size: "large",
    variant: "filled",
    title: "Cleared",
    description: "All data has been cleared",
    type: "info",
    duration: 3000,
    placement: 'topRight'
  })
}

const convert = () => {
  isInputChanged.value = false;

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

  if (filteredNgramsResult.value.length > 0) {
    MaNotification.success({
    size:"large",
    variant:"filled",
    title:"Keywords generated successfully",
    description:filteredNgramsResult.value.length + " keywords generated",
    type:"success",
    duration: 3000,
    placement: 'topRight'
  })
  } else {
    MaNotification.error({
    size:"large",
    variant:"filled",
    title:"No keywords generated",
    description:"Input is empty or contains only stop words",
    type:"error",
    duration: 3000,
    placement: 'topRight'
    })
  }
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
  isInputChanged.value = true;
}

function onStopWordsToggle(checked) {
  removeStopWords.value = checked;
  isInputChanged.value = true;
}

function onModalOk() {
  convert();
  showModal.value = false;
}

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

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
                 @change="isInputChanged = true"
               />
               <MaTooltip class="ma-ngram-checkbox">
                    <template #title>
                      Stop words are not useful for keyword generation
                    </template>
                    <template #description>
                      E.g. "a", "an", "the", "and", "is", "in", "of", "for"...
                    </template>
                    <MaCheckbox
                      :checked="removeStopWords"
                      @change="checked => onStopWordsToggle(checked)"
                      class="ma-ngram-checkbox"
                      >
                      Remove common stop words
                    </MaCheckbox> 
                </MaTooltip>
             </template>
             <template #footer>
               <div class="ma-button-container">
                 <div class="ma-description-count">{{ inputInfo }}</div>
                 <div class="ma-button-container-right">
                    <MaTooltip mouseEnterDelay=200>
                      <template #title>
                        Clear all data
                      </template>
                      <MaButton :size="medium" variant="stroke" :disabled="!input.trim()" @click="clearAll">Clear</MaButton>
                    </MaTooltip>
                    <MaTooltip mouseEnterDelay=200>
                      <template #title>
                        Extract keywords
                      </template>
                        <MaButton :size="medium" :variant="isInputChanged ? 'filled' : 'stroke'" icon="arrow-right" :disabled="!input.trim() && !isInputChanged" :color="isInputChanged ? 'green' : 'dark'" @click="convert">Apply</MaButton>
                    </MaTooltip>
                  </div>
               </div>
             </template>
           </MaCard>
        <MaCard class="ma-card" title="Keywords" description="Generated keywords from your text.">
          <template #headerActions>
            <MaButton v-if="isMobile" :size="medium" variant="stroke" @click="showModal = true">Choose n-grams</MaButton>
          </template>
            <div v-if="filteredNgramsResult.length > 0" class="ma-ngram-container">
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
            <div v-else class="ma-result-description"><MaEmpty description="No keywords generated" animation="no-data-found" size="medium" /></div>
        </MaCard>
        </div>
        <div v-if="!isMobile" class="ma-keyword-generator-layout-right">
            <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
                <div class="ma-ngram-selection-container">
                    <MaCheckbox
                      v-for="ngram in N_GRAM_OPTIONS"
                      :key="ngram"
                      :checked="n_grams.includes(ngram)"
                      @change="checked => onNgramToggle(ngram, checked)"
                      class="ma-ngram-checkbox"
                    >
                      {{ngram}}-gram
                    </MaCheckbox>
                </div>
            </MaCard>
        </div>
        <MaModal :visible="showModal" title="N-gram Selection" :width="360" closable=true okText="Apply" @ok="onModalOk" @closed="showModal = false">
                <div class="ma-ngram-selection-container">
                    <MaCheckbox
                      v-for="ngram in N_GRAM_OPTIONS"
                      :key="ngram"
                      :checked="n_grams.includes(ngram)"
                      @change="checked => onNgramToggle(ngram, checked)"
                      class="ma-ngram-checkbox"
                    >
                      {{ngram}}-gram
                    </MaCheckbox>
                </div>
        </MaModal>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keywords-generator {
  @apply w-full min-h-screen bg-white flex flex-col gap-3 p-4;
  @apply sm:gap-4 sm:p-6;
  @apply lg:p-8;
  
  .ma-header {
    @apply w-full flex flex-col items-start justify-center gap-2 mb-4;
    @apply sm:mb-6;
    
    .ma-title {
      @apply text-2xl font-bold text-gray-900;
      @apply sm:text-3xl;
      @apply lg:text-4xl;
    }
    
    .ma-description {
      @apply text-sm text-gray-600 leading-relaxed;
      @apply sm:text-base;
      @apply lg:text-lg;
    }
  }

  .ma-text-input-container {
    @apply w-full flex flex-col gap-2;
    @apply sm:min-h-[150px];
  }
  
  .ma-description-count {
    @apply text-xs text-gray-500;
    @apply sm:text-sm;
  }
  
  .ma-button-container {
    @apply w-full flex flex-col gap-3;
    @apply sm:flex-row sm:justify-between sm:items-center;
    
    .ma-button-container-right {
      @apply flex flex-col gap-2 w-full;
      @apply sm:flex-row sm:w-auto;
    }
  }

  .ma-ngram-container {
    @apply w-full flex flex-col gap-3;
    @apply sm:gap-4;

    .ma-ngram-item {
      @apply w-full flex flex-col gap-2;
      @apply sm:gap-3;

      .ma-ngram-item-title {
        @apply text-base font-bold text-gray-900;
        @apply sm:text-lg;
        @apply lg:text-xl;

        .ma-ngram-item-title-count {
          @apply bg-gray-100 text-black text-xs px-2 py-1 rounded-full;
          @apply sm:text-sm;
        }
      }

      .ma-ngram-item-keywords {
        @apply w-full flex flex-wrap gap-1;
        @apply sm:gap-2;
      }

      .ma-divider {
        @apply w-full h-[1px] bg-gray-200;
      }
    }
  }
}

.ma-keyword-generator-layout {
  @apply w-full flex flex-col gap-4;
  @apply lg:flex-row lg:gap-6;

  &-left {
    @apply w-full flex flex-col gap-4;
    @apply lg:w-3/4;
  }

  &-right {
    @apply w-full flex flex-col gap-4;
    @apply lg:w-1/4;
  }
}

.ma-ngram-selection-container {
  @apply w-full grid grid-cols-1 gap-3;
  @apply sm:grid-cols-2 sm:gap-4;

  .ma-ngram-selection-item {
    @apply w-full flex flex-col gap-2;
  }
}

.ma-badge-stopword {
  @apply bg-gray-200 text-gray-500;
}

.ma-filtering-options-container {
  @apply w-full flex flex-col gap-3;
  @apply sm:gap-4;

  .ma-filtering-options-item {
    @apply w-full flex flex-col gap-2;
  }
}

.ma-ngram-item-keyword-badge {
  @apply border-black text-black text-xs;
  @apply sm:text-sm;
}

.ma-card {
  @apply border border-gray-200 rounded-lg shadow-sm;
  @apply sm:shadow-md;
}

.ma-text-input {
  @apply w-full;
  
  ::v-deep(.ak-input__input) {
    @apply w-full resize-none min-h-[120px];
    @apply sm:min-h-[150px];
  }
}

.ma-result-description {
  @apply text-gray-400 text-sm italic py-3;
  @apply sm:text-base sm:py-4;
}

.ma-ngram-checkbox {
  @apply w-full;
  @apply sm:w-auto sm:inline-flex;
}

</style>