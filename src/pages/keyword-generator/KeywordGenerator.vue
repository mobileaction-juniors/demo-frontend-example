<script setup>
import { onMounted, onUnmounted } from 'vue';
import { MaInput, MaCheckbox2 as MaCheckbox, MaButton, MaBadge, MaCard, MaTooltip2 as MaTooltip, MaEmpty, MaModal } from '@mobileaction/action-kit'
import { useKeywordGeneratorPageStore } from '@/stores/keywordGeneratorStore';

const store = useKeywordGeneratorPageStore();

function handleResize() {
  store.handleResize();
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
                 :value="store.input"
                 @update:value="store.input = $event"
                 size="large"
                 @change="store.isInputChanged = true"
               />
               <MaTooltip class="ma-ngram-checkbox">
                    <template #title>
                      Stop words are not useful for keyword generation
                    </template>
                    <template #description>
                      E.g. "a", "an", "the", "and", "is", "in", "of", "for"...
                    </template>
                    <MaCheckbox
                      :checked="store.removeStopWords"
                      @change="checked => store.onStopWordsToggle(checked)"
                      class="ma-ngram-checkbox"
                      >
                      Remove common stop words
                    </MaCheckbox> 
                </MaTooltip>
             </template>
             <template #footer>
               <div class="ma-button-container">
                 <div class="ma-description-count">{{ store.inputInfo }}</div>
                 <div class="ma-button-container-right">
                    <MaTooltip mouseEnterDelay=200>
                      <template #title>
                        Clear all data
                      </template>
                      <MaButton :size="medium" variant="stroke" :disabled="!store.input.trim()" @click="store.clearAll">Clear</MaButton>
                    </MaTooltip>
                    <MaTooltip mouseEnterDelay=200>
                      <template #title>
                        Extract keywords
                      </template>
                        <MaButton :size="medium" :variant="store.isInputChanged ? 'filled' : 'stroke'" icon="arrow-right" :disabled="!store.input.trim() && !store.isInputChanged" :color="store.isInputChanged ? 'green' : 'dark'" @click="store.convert">Apply</MaButton>
                    </MaTooltip>
                  </div>
               </div>
             </template>
           </MaCard>
        <MaCard class="ma-card" title="Keywords" description="Generated keywords from your text.">
          <template #headerActions>
            <MaButton v-if="store.isMobile" :size="medium" variant="stroke" @click="store.showModal = true">Choose n-grams</MaButton>
          </template>
            <div v-if="store.filteredNgramsResult.length > 0" class="ma-ngram-container">
                <div class="ma-ngram-item" v-for="ngram in store.filteredNgramsResult" :key="ngram.n">
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
        <div v-if="!store.isMobile" class="ma-keyword-generator-layout-right">
            <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
                <div class="ma-ngram-selection-container">
                    <MaCheckbox
                      v-for="ngram in store.N_GRAM_OPTIONS"
                      :key="ngram"
                      :checked="store.n_grams.includes(ngram)"
                      @change="checked => store.onNgramToggle(ngram, checked)"
                      class="ma-ngram-checkbox"
                    >
                      {{ngram}}-gram
                    </MaCheckbox>
                </div>
            </MaCard>
        </div>
        <MaModal :visible="store.showModal" title="N-gram Selection" :width="360" closable=true okText="Apply" @ok="store.onModalOk" @closed="store.showModal = false">
                <div class="ma-ngram-selection-container">
                    <MaCheckbox
                      v-for="ngram in store.N_GRAM_OPTIONS"
                      :key="ngram"
                      :checked="store.n_grams.includes(ngram)"
                      @change="checked => store.onNgramToggle(ngram, checked)"
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
  @apply w-full min-h-screen bg-white flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 lg:p-8;
  
  .ma-header {
    @apply w-full flex flex-col items-start justify-center gap-2 mb-4 sm:mb-6;
    
    .ma-title {
      @apply text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl;
    }
    
    .ma-description {
      @apply text-sm text-gray-600 leading-relaxed sm:text-base lg:text-lg;
    }
  }

  .ma-text-input-container {
    @apply w-full flex flex-col gap-2 sm:min-h-[150px];
  }
  
  .ma-description-count {
    @apply text-xs text-gray-500 sm:text-sm;
  }
  
  .ma-button-container {
    @apply w-full flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center;
    
    .ma-button-container-right {
      @apply flex flex-col gap-2 w-full sm:flex-row sm:w-auto;
    }
  }

  .ma-ngram-container {
    @apply w-full flex flex-col gap-3 sm:gap-4;

    .ma-ngram-item {
      @apply w-full flex flex-col gap-2 sm:gap-3;

      .ma-ngram-item-title {
        @apply text-base font-bold text-gray-900 sm:text-lg lg:text-xl;

        .ma-ngram-item-title-count {
          @apply bg-gray-100 text-black text-xs px-2 py-1 rounded-full sm:text-sm;
        }
      }

      .ma-ngram-item-keywords {
        @apply w-full flex flex-wrap gap-1 sm:gap-2;
      }

      .ma-divider {
        @apply w-full h-[1px] bg-gray-200;
      }
    }
  }
}

.ma-keyword-generator-layout {
  @apply w-full flex flex-col gap-4 lg:flex-row lg:gap-6;

  &-left {
    @apply w-full flex flex-col gap-4 lg:w-3/4;
  }

  &-right {
    @apply w-full flex flex-col gap-4 lg:w-1/4;
  }
}

.ma-ngram-selection-container {
  @apply w-full grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4;

  .ma-ngram-selection-item {
    @apply w-full flex flex-col gap-2;
  }
}

.ma-badge-stopword {
  @apply bg-gray-200 text-gray-500;
}

.ma-filtering-options-container {
  @apply w-full flex flex-col gap-3 sm:gap-4;

  .ma-filtering-options-item {
    @apply w-full flex flex-col gap-2;
  }
}

.ma-ngram-item-keyword-badge {
  @apply border-black text-black text-xs sm:text-sm;
}

.ma-card {
  @apply border border-gray-200 rounded-lg;
}

.ma-text-input {
  @apply w-full;
  
  ::v-deep(.ak-input__input) {
    @apply w-full resize-none min-h-[120px] sm:min-h-[150px];
  }
}

.ma-result-description {
  @apply text-gray-400 text-sm italic py-3 sm:text-base sm:py-4;
}

.ma-ngram-checkbox {
  @apply w-full sm:w-auto sm:inline-flex;
}

</style>