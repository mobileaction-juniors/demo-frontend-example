<script setup>
import { onMounted } from 'vue'
import { MaInput, MaButton, MaSelect, MaPagination, MaProgress, MaSelect2, MaToggle } from "@mobileaction/action-kit"
import { useKeywordAnalysis } from '../../utils/useKeywordAnalysis'


const props = defineProps({
  staticText: {
    type: String,
    default: 'This is a sample text for keyword analysis. You can analyze this text to find keywords and their frequency. The analysis will show you how often each keyword appears in the text and what percentage of the total words it represents.'
  }
})

// Use the composable
const {
  // Reactive state
  inputText,
  selectedKeywords,
  analysisResults,
  isAnalyzing,
  analysisMode,
  currentPage,
  perPage,
  keywordOptions,
  analysisModeOptions,
  
  // Computed properties
  hasResults,
  totalWords,
  totalItems,
  totalPages,
  paginatedResults,
  
  // Methods
  analyzeKeywords,
  clearResults,
  handlePerPageChange,
  handleCurrentPageChange,
  initialize
} = useKeywordAnalysis(props.staticText)

onMounted(() => {
  initialize(props.staticText)
})
</script>

<template>
  <div class="ma-container">
    <div class="ma-header">
      <h1 class="ma-title">Keyword Density</h1>
      <p class="ma-subtitle">Analyze keyword frequency and percentage in your text</p>
    </div>

    <div class="ma-main-layout">
      <!-- Left Panel: Input and Settings -->
      <div class="ma-left-panel">
        <!-- Analysis Mode Selection -->
        <div class="ma-input-section">
          <ma-select
            v-model:value="analysisMode"
            :options="analysisModeOptions"
            title="Analysis Mode"
            placeholder="Choose analysis mode..."
            hintText="Select whether to analyze specific keywords or all keywords in the text"
          />
        </div>

        <!-- Text Input Section -->
        <div class="ma-input-section">
          <ma-input
            v-model:value="inputText"
            type="textarea"
            inputClass="resize-none h-55"
            title="Text to Analyze"
            size="large"
            placeholder="Enter or paste the text you want to analyze..."
            hintText="This text will be analyzed for keyword frequency"
          />
        </div>

        <!-- Keywords Input Section (only for specific mode) -->
        <div v-if="analysisMode === 'specific'" class="ma-input-section">
          <ma-select2
            multiple
            :options="keywordOptions"
            title="Keywords to Search"
            size="medium"
            placeholder="Select keywords from the text"
            hintText="Select the keywords you want to analyze in the text above"
            v-model:value="selectedKeywords"
            
          />
        </div>

        <!-- Action Buttons -->
        <div class="ma-actions-section">
          <ma-button
            color="dark"
            icon="poker-cards-bulk"
            variant="filled"
            @click="analyzeKeywords"
            :disabled="!inputText.trim() || (analysisMode === 'specific' && selectedKeywords.length === 0) || isAnalyzing"
            class="ma-analyze-button"
          >
            {{ isAnalyzing ? 'Analyzing...' : (analysisMode === 'specific' ? 'Analyze Keywords' : 'Analyze All Keywords') }}
          </ma-button>

          <ma-button
            color="light"
            icon="tag"
            variant="outlined"
            @click="clearResults"
            :disabled="!hasResults"
            class="ma-clear-button"
          >
            Clear Results
          </ma-button>
        </div>

        <!-- Statistics -->
        <div v-if="inputText.trim()" class="ma-stats-section">
          <h3 class="ma-stats-title">Text Statistics</h3>
          <div class="ma-stats-grid">
            <div class="ma-stat-item">
              <span class="ma-stat-label">Total Words:</span>
              <span class="ma-stat-value">{{ totalWords }}</span>
            </div>
            <div class="ma-stat-item">
              <span class="ma-stat-label">Characters:</span>
              <span class="ma-stat-value">{{ inputText.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Results -->
      <div class="ma-right-panel">
        <!-- Results Section -->
        <div v-if="hasResults" class="ma-results-section">
          <div class="ma-results-header">
            <h2 class="ma-results-title">
              {{ analysisMode === 'specific' ? 'Analysis Results' : 'All Keywords Analysis' }}
            </h2>
            <div class="ma-results-count">
              <span v-if="analysisMode === 'specific'">
                Analyzed {{ totalItems }} keywords (showing page {{ currentPage }} of {{ totalPages || 1 }})
              </span>
              <span v-else>
                {{ totalItems }} keywords found (showing page {{ currentPage }} of {{ totalPages || 1 }})
              </span>
            </div>
          </div>

          <div class="ma-results-content">
            <!-- Results Table -->
            <div class="ma-table-container">
              <table class="ma-results-table">
                <thead>
                  <tr>
                    <th class="ma-table-header">Keyword</th>
                    <th class="ma-table-header">Count</th>
                    <th class="ma-table-header">Percentage</th>
                    <th class="ma-table-header">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(result, index) in paginatedResults" 
                    :key="index"
                    class="ma-table-row"
                  >
                    <td class="ma-table-cell ma-keyword-cell">
                      <span class="ma-keyword-text">{{ result.keyword }}</span>
                    </td>
                    <td class="ma-table-cell ma-count-cell">
                      <span class="ma-count-badge">{{ result.count }}</span>
                    </td>
                    <td class="ma-table-cell ma-percentage-cell">
                      <span class="ma-percentage-text">{{ result.percentage }}%</span>
                    </td>
                    <td class="ma-table-cell ma-frequency-cell">
                      <ma-progress 
                        :percent="Math.min(result.percentage, 100)" 
                        type="line"
                        circleSize="xs"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalItems > 0" class="ma-pagination-section">
              <ma-pagination
                :current="currentPage"
                :perPage="perPage"
                :total-items="totalItems"
                @update:current="handleCurrentPageChange"
                @update:perPage="handlePerPageChange"
              />
            </div>

            <!-- Summary -->
            <div class="ma-summary-section">
              <h3 class="ma-summary-title">Summary</h3>
              <div class="ma-summary-grid">
                <div class="ma-summary-item">
                  <span class="ma-summary-label">Most Frequent:</span>
                  <span class="ma-summary-value">
                    {{ analysisResults[0]?.keyword || 'N/A' }} 
                    ({{ analysisResults[0]?.count || 0 }} times)
                  </span>
                </div>
                <div class="ma-summary-item">
                  <span class="ma-summary-label">Total Occurrences:</span>
                  <span class="ma-summary-value">
                    {{ analysisResults.reduce((sum, result) => sum + result.count, 0) }}
                  </span>
                </div>
                <div class="ma-summary-item">
                  <span class="ma-summary-label">Average Percentage:</span>
                  <span class="ma-summary-value">
                    {{ (analysisResults.reduce((sum, result) => sum + result.percentage, 0) / analysisResults.length).toFixed(2) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="(analysisMode === 'specific' && selectedKeywords.length > 0) && !isAnalyzing" class="ma-empty-state">
          <div class="ma-empty-content">
            <div class="ma-empty-icon">🔍</div>
            <h3>No Keywords Found</h3>
            <p>The specified keywords were not found in the text. Try different keywords or check your spelling.</p>
          </div>
        </div>

        <!-- Initial State -->
        <div v-else class="ma-initial-state">
          <div class="ma-initial-content">
            <div class="ma-initial-icon">📊</div>
            <h3>Ready to Analyze Keywords</h3>
            <p v-if="analysisMode === 'specific'">
              Select keywords from the left panel and click "Analyze Keywords" to see frequency and percentage data.
            </p>
            <p v-else>
              Click "Analyze All Keywords" to see the most frequent keywords in your text with their density.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

.ma-container {
  @apply w-full min-h-screen font-sans p-3 sm:p-5 flex flex-col ;
}

.ma-header {
  @apply text-center mb-6 flex-shrink-0;
}

.ma-title {
  @apply text-2xl sm:text-3xl font-semibold text-gray-800 mb-2;
}

.ma-subtitle {
  @apply text-sm sm:text-base text-gray-600;
}

.ma-main-layout {
  @apply flex flex-col lg:flex-row gap-6 lg:h-screen;
}

.ma-left-panel {
  @apply lg:w-1/2 space-y-6 lg:overflow-y-auto;
}

.ma-right-panel {
  @apply lg:w-1/2 flex flex-col lg:h-full;
}

.ma-input-section {
  @apply space-y-4;
}

.ma-actions-section {
  @apply flex flex-col sm:flex-row gap-3;
}

.ma-analyze-button {
  @apply flex-1;
}

.ma-clear-button {
  @apply flex-1;
}

.ma-stats-section {
  @apply bg-gray-50 rounded-lg p-4;
}

.ma-stats-title {
  @apply text-lg font-semibold text-gray-800 mb-3;
}

.ma-stats-grid {
  @apply grid grid-cols-2 gap-4;
}

.ma-stat-item {
  @apply flex justify-between items-center;
}

.ma-stat-label {
  @apply text-gray-600 text-sm;
}

.ma-stat-value {
  @apply font-semibold text-gray-800;
}

.ma-results-section {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0;
}

.ma-results-header {
  @apply p-6 border-b border-gray-200;
}

.ma-results-title {
  @apply text-xl font-semibold text-gray-800 mb-2;
}

.ma-results-count {
  @apply text-sm text-gray-600;
}

.ma-results-content {
  @apply p-6 flex-1 flex flex-col min-h-0 overflow-hidden;
}

.ma-table-container {
  @apply overflow-x-auto flex-1 overflow-y-auto;
}

.ma-results-table {
  @apply w-full border-collapse;
}

.ma-table-header {
  @apply text-left p-3 bg-gray-50 text-gray-700 font-semibold text-sm border-b border-gray-200;
}

.ma-table-row {
  @apply border-b border-gray-100 hover:bg-gray-50 transition-colors;
}

.ma-table-cell {
  @apply p-3 text-sm;
}

.ma-keyword-cell {
  @apply font-medium text-gray-800;
}

.ma-count-cell {
  @apply text-center;
}

.ma-count-badge {
  @apply inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold;
}

.ma-percentage-cell {
  @apply text-center font-medium;
}

.ma-frequency-cell {
  @apply w-32;
}

.ma-summary-section {
  @apply mt-6 pt-6 border-t border-gray-200;
}

.ma-summary-title {
  @apply text-lg font-semibold text-gray-800 mb-3;
}

.ma-summary-grid {
  @apply grid grid-cols-1 sm:grid-cols-3 gap-4;
}

.ma-summary-item {
  @apply flex flex-col space-y-1;
}

.ma-summary-label {
  @apply text-sm text-gray-600;
}

.ma-summary-value {
  @apply font-semibold text-gray-800;
}

.ma-pagination-section {
  @apply mt-6 pt-6 border-t border-gray-200 flex justify-center;
}

.ma-empty-state,
.ma-initial-state {
  @apply flex items-center justify-center flex-1;
}

.ma-empty-content,
.ma-initial-content {
  @apply text-center max-w-md;
}

.ma-empty-icon,
.ma-initial-icon {
  @apply text-6xl mb-4;
}

.ma-empty-content h3,
.ma-initial-content h3 {
  @apply text-xl font-semibold text-gray-800 mb-2;
}

.ma-empty-content p,
.ma-initial-content p {
  @apply text-gray-600;
}



@media (max-width: 1024px) {
  .ma-main-layout {
    @apply flex-col;
  }
  
  .ma-left-panel {
    @apply w-full;
  }
  
  .ma-right-panel {
    @apply w-full;
  }
}
</style> 