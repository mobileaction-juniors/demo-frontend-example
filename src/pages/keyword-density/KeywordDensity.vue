<script setup>
import { ref, computed, onMounted } from 'vue';
import { MaInput, MaButton, MaCard, MaNotification, MaTooltip2 as MaTooltip, MaBadge, MaEmpty, MaCheckbox2 as MaCheckbox, MaPagination } from '@mobileaction/action-kit'
import { cleanDescription } from '@/utils/CleanDescription';
import { useKeywordDensity } from '@/composables/useKeywordDensity';

const props = defineProps({
  defaultText: {
    type: String,
    default: '',
  },
});

const PAGINATION_OPTIONS = [10, 20, 50, 100];

const perPage = ref(10);
const currentPage = ref(1);
const input = ref('');
const isInputChanged = ref(false);
const removeStopWords = ref(true);
const tableData = ref([]);
const stats = ref({
  charCount: 0,
  wordCount: 0,
  uniqueCount: 0,
  mostFrequent: '',
  highestDensity: '0.0',
});
const copied = ref(false);
const freqMap = ref({});
const uniqueKeywords = ref([]);

const cleanedInput = computed(() => cleanDescription(input.value).trim().toLowerCase().split(/\s+/).filter(Boolean));

const inputInfo = computed(() => {
  const charCount = input.value.trim().length;
  const wordCount = cleanedInput.value.length;
  return charCount + ' characters, ' + wordCount + ' words';
});

const { analyzeKeywords: analyzeKeywordsComposable, updateTableData: updateTableDataComposable } = useKeywordDensity();

function analyzeKeywords(showNotification = true) {
  analyzeKeywordsComposable(input, removeStopWords, freqMap, uniqueKeywords, stats, isInputChanged);
  
  updateTableData();
  copied.value = false;
  
  if (showNotification) {
    MaNotification.success({
      size: "large",
      variant: "filled",
      title: "Analyzed",
      description: "Keywords analyzed successfully",
      type: "success",
      duration: 3000,
      placement: 'topRight'
    });
  }
}

function updateTableData() {
  tableData.value = updateTableDataComposable(uniqueKeywords, freqMap, stats.value.wordCount, currentPage.value, perPage.value);
}

const clearAll = () => {
  input.value = '';
  tableData.value = [];
  stats.value = {
    charCount: 0,
    wordCount: 0,
    uniqueCount: 0,
    mostFrequent: '',
    highestDensity: '0.0',
  };
  MaNotification.info({
    size: "large",
    variant: "filled",
    title: "Cleared",
    description: "All data has been cleared",
    type: "info",
    duration: 3000,
    placement: 'topRight'
  });
}

function copyResults() {
  navigator.clipboard.writeText(JSON.stringify(tableData.value));
  MaNotification.success({
    size: "large",
    variant: "filled",
    title: "Copied",
    description: "Results copied to clipboard",
    type: "success",
    duration: 3000,
    placement: 'topRight'
  });
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 5000);
}

function onStopWordsToggle(checked) {
  removeStopWords.value = checked;
  isInputChanged.value = true;
}

function onPageChange(page) {
  currentPage.value = page;
  updateTableData();
}

function onPerPageChange(value) {
  perPage.value = value;
  currentPage.value = 1;
  updateTableData();
}

onMounted(() => {
  if (props.defaultText && props.defaultText.trim().length > 0) {
    input.value = props.defaultText;
    analyzeKeywords(false);
  }
});

</script>

<template>
    <div class="ma-keywords-density">
        <div class="ma-header">
            <h1 class="ma-title">Keyword Density</h1>
            <p class="ma-description">Analyze keyword frequency and density in your text. Count how many times keywords appear and calculate their percentage distribution.</p>
        </div>
        <div class="ma-keyword-generator-layout">
            <div class="ma-keyword-generator-layout-left">
                <MaCard
                    class="ma-card"
                    title="Text Analysis"
                    description="Enter your text to analyze keyword frequency and density. The tool will count occurrences and calculate percentages."
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
                                Analyze keywords
                            </template>
                                <MaButton :size="medium" :variant="isInputChanged ? 'filled' : 'stroke'" icon="favorite-chart" :disabled="!input.trim() && !isInputChanged" :color="isInputChanged ? 'green' : 'dark'" @click="analyzeKeywords">Analyze Keywords</MaButton>
                            </MaTooltip>
                        </div>
                    </div>
                </template>
            </MaCard>
            <MaCard class="ma-card" title="Keyword Analysis Results" :description="stats.uniqueCount + ' unique keywords found in ' + stats.wordCount + ' total words'">
                <template #headerActions>
                    <MaButton
                      :size="medium"
                      :variant="copied ? 'lighter' : 'stroke'"
                      :icon="copied ? 'check' : 'clipboard'"
                      @click="copyResults"
                    >
                      Copy Results
                    </MaButton>
                </template>
                <div v-if="tableData.length > 0" class="ma-keyword-density-table">
                    <table class="ma-table">
                        <thead class="ma-thead">
                            <tr>
                            <th class="ma-th">Keyword</th>
                            <th class="ma-th">Count</th>
                            <th class="ma-th">Density</th>
                            <th class="ma-th">Frequency</th>
                            </tr>
                        </thead>
                        <tbody class="ma-tbody">
                            <tr v-for="row in tableData" :key="row.keyword" class="ma-tr">
                            <td class="ma-td">
                                <MaBadge 
                                class="ma-keyword-badge" 
                                size="large"
                                variant="basic"
                                color="dark"
                                >{{ row.keyword }}</MaBadge>
                            </td>
                            <td class="ma-td">{{ row.count }}</td>
                            <td class="ma-td">
                                <span class="ma-density-text">{{ row.density }}%</span>
                            </td>
                            <td class="ma-td">
                                <div class="ma-bar-container">
                                <div class="ma-bar-background">
                                    <div class="ma-bar-fill" :style="{ width: row.density + '%' }"></div>
                                </div>
                                <span class="ma-bar-label">{{ row.density }}%</span>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <MaEmpty v-else description="No keywords found" animation="no-data-found" size="medium" />
                <template #footer>
                    <MaPagination
                        v-if="stats.uniqueCount > 0"
                        rounded=true
                        :options="PAGINATION_OPTIONS"
                        :current="currentPage"
                        :perPage="perPage"
                        :totalItems="stats.uniqueCount"
                        @change="onPageChange"
                        @update:perPage="onPerPageChange"
                    />
                </template>
            </MaCard>
        </div>
        <div class="ma-keyword-generator-layout-right">
            <MaCard class="ma-card" title="Analysis Statistics" description="Overview of your text analysis">
                <div class="ma-stats-list">
                    <div class="ma-stats-row"><span>Total Words</span><span><MaBadge class="ma-badge">{{ stats.wordCount }}</MaBadge></span></div>
                    <div class="ma-stats-row"><span>Unique Keywords</span><span><MaBadge class="ma-badge">{{ stats.uniqueCount }}</MaBadge></span></div>
                    <div class="ma-stats-row"><span>Characters</span><span><MaBadge class="ma-badge">{{ stats.charCount }}</MaBadge></span></div>
                </div>
                <template #footer>
                <div class="ma-stats-list">
                  <div class="ma-stats-row"><span>Most Frequent</span><span>
                      <div v-if="stats.mostFrequent && stats.mostFrequent.length" class="ma-most-frequent-badges">
                        <MaBadge v-for="word in stats.mostFrequent" :key="word">{{ word }}</MaBadge>
                      </div>
                    </span>
                  </div>
                  <div class="ma-stats-row"><span>Highest Density</span><span><MaBadge class="ma-badge">{{ stats.highestDensity }}%</MaBadge></span></div>
                </div>
                </template>
            </MaCard>
        </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keywords-density {
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

.ma-card {
  @apply border border-gray-200 rounded-lg;
}

.ma-text-input {
  @apply w-full;
  
  ::v-deep(.ak-input__input) {
    @apply w-full resize-none min-h-[120px];
    @apply sm:min-h-[150px];
  }
}

.ma-keyword-density-table {
  @apply w-full overflow-x-auto;
  @apply -mx-4 sm:mx-0;
  
  .ma-table {
    @apply w-full text-xs;
    @apply sm:text-sm;
    
    .ma-thead {
      @apply border-b border-gray-200 text-gray-500;
      
      .ma-th {
        @apply py-2 px-1 text-left font-medium whitespace-nowrap;
        @apply sm:px-2;
        
        &:nth-child(1) { @apply w-1/4; }
        &:nth-child(2) { @apply w-1/6; }
        &:nth-child(3) { @apply w-1/6; }
        &:nth-child(4) { @apply w-1/3; }
      }
    }
    
    .ma-tbody {
      .ma-tr {
        @apply border-b border-gray-100 hover:bg-gray-50;
        
        .ma-td {
          @apply py-2 px-1;
          @apply sm:px-2;
        }
        
        .ma-keyword-badge {
          @apply inline-block border-black text-black;
        }
        
        .ma-density-text {
          @apply font-semibold text-xs;
          @apply sm:text-sm;
        }
        
        .ma-bar-container {
          @apply flex items-center gap-1;
          @apply sm:gap-2;
          
          .ma-bar-background {
            @apply relative w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden;
            @apply sm:w-20 sm:h-2;
            @apply lg:w-24;
            
            .ma-bar-fill {
              @apply absolute left-0 top-0 h-1.5 bg-blue-500 rounded-full;
              @apply sm:h-2;
              transition: width 0.3s ease;
            }
          }
          
          .ma-bar-label {
            @apply text-xs text-gray-500 whitespace-nowrap;
          }
        }
      }
    }
  }
}

.ma-most-frequent-badges {
  @apply flex flex-wrap gap-1;
  @apply sm:gap-2;
}

.ma-stats-list {
  @apply flex flex-col gap-2 mt-2;
  
  .ma-stats-row {
    @apply flex flex-col gap-1;
    @apply sm:flex-row sm:justify-between sm:items-center sm:gap-2;
    
  }
}

.ma-ngram-checkbox {
  @apply w-full;
  @apply sm:w-auto sm:inline-flex;
}

@media (max-width: 640px) {
  .ma-keyword-density-table {
    .ma-table {
      .ma-thead {
        .ma-th {
          &:nth-child(3) {
            @apply hidden sm:table-cell;
          }
        }
      }
      
      .ma-tbody {
        .ma-tr {
          .ma-td {
            &:nth-child(3) {
              @apply hidden sm:table-cell;
            }
          }
        }
      }
    }
  }
}

.ma-badge{
  @apply inline-block;
}
</style>
