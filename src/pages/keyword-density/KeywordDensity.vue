<script setup>
import { computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { MaInput, MaButton, MaCard, MaEmpty, MaCheckbox2 } from '@mobileaction/action-kit';
import { KEYWORD_DENSITY_CONSTANTS } from '../../constants/keywordDensity';
import { useKeywordAnalysisStore } from '../../stores/keywordAnalysis';

const props = defineProps({
    defaultText: {
        type: String,
        default: KEYWORD_DENSITY_CONSTANTS.DEFAULT_TEXT
    }
});

const route = useRoute();
const store = useKeywordAnalysisStore();

const initialText = route.query.text || props.defaultText;
store.setDefaultText(initialText);
store.setItemsPerPage(KEYWORD_DENSITY_CONSTANTS.DEFAULT_PAGE_SIZE);

const copyResultsToClipboard = store.copyResultsToClipboard;

const paginationInfo = computed(() => {
    const start = (store.currentPage - 1) * store.itemsPerPage + 1;
    const end = Math.min(start + store.itemsPerPage - 1, store.sortedDensityResults.length);
    return {
        start,
        end,
        total: store.sortedDensityResults.length
    };
});

const analyzeDensity = store.analyzeKeywords;
const clearInput = store.clearAll;

const clearError = () => {
    store.densityErrorMessage = '';
    store.densityErrorType = '';
};

const goToPage = (page) => {
    if (page >= 1 && page <= store.totalPages) {
        store.setCurrentPage(page);
    }
};

const nextPage = () => {
    if (store.currentPage < store.totalPages) {
        store.setCurrentPage(store.currentPage + 1);
    }
};

const prevPage = () => {
    if (store.currentPage > 1) {
        store.setCurrentPage(store.currentPage - 1);
    }
};

const setSorting = (field) => {
    const newOrder = store.sortBy === field ? (store.sortOrder === 'desc' ? 'asc' : 'desc') : 'desc';
    store.setSorting(field, newOrder);
    store.setCurrentPage(1);
};

const getSortIcon = (field) => {
    return store.sortBy === field ? (store.sortOrder === 'desc' ? '↓' : '↑') : '';
};

const totalCharacters = computed(() => store.textStats.totalCharacters);

watch(() => store.inputText, () => {
    store.shouldHighlight = store.inputText.trim() !== '';
});

watch(() => store.filterUnwanted, () => {
    const hasChanged = store.filterUnwanted !== store.lastAnalysisState.filterUnwanted;
    store.shouldHighlight = hasChanged && store.inputText.trim() !== '';
});

onMounted(() => {
    store.analyzeKeywords();
});

</script>

<template>
    <div class="ma-container">
        <MaCard title="Keyword Density Analyzer" description="Enter your text and keywords to analyze keyword density" class="ma-input-card">
            <template #default>
                <div v-if="store.densityErrorMessage" class="ma-error-message" role="alert">
                    {{ store.densityErrorMessage }}
                    <button @click="clearError" class="ma-error-close" aria-label="Close error message">×</button>
                </div>
                <MaInput
                    v-model:value="store.inputText"
                    type="textarea"
                    placeholder="Paste your text here..."
                    size="large"
                    :rows="KEYWORD_DENSITY_CONSTANTS.TEXT_AREA_ROWS"
                />
                <div class="ma-character-count">
                    Total characters: {{ totalCharacters }}
                </div>
                <div class="ma-options">
                    <div class="ma-merge-option">
                        <MaCheckbox2 v-model:checked="store.shouldMergeKeywords">
                            Merge keywords has same density
                        </MaCheckbox2>
                    </div>
                    <div class="ma-filter-option">
                        <MaCheckbox2 v-model:checked="store.filterUnwanted">
                            Hide unwanted words
                        </MaCheckbox2>
                    </div>
                </div>
                <div class="ma-controls">
                    <MaButton 
                        @click="analyzeDensity" 
                        size="medium" 
                        variant="stroke"
                        color="green"
                        icon="chart-bar"
                        :highlight="store.shouldHighlight"
                        :disabled="store.isDensityAnalyzing || !store.inputText.trim()"
                        aria-describedby="analyze-help"
                    >
                        {{ store.isDensityAnalyzing ? 'Analyzing...' : 'Analyze Density' }}
                    </MaButton>
                    <div id="analyze-help" class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style="clip: rect(0, 0, 0, 0);">
                        Click to analyze keyword density in your text. Button is disabled when text or keywords are empty.
                    </div>
                    <MaButton 
                        @click="clearInput" 
                        size="medium" 
                        variant="stroke" 
                        color="red"
                        :disabled="!store.inputText.trim()"
                    >
                        Clear
                    </MaButton>
                </div>
                <div aria-live="polite" aria-atomic="true" class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style="clip: rect(0, 0, 0, 0);">
                    {{ store.isDensityAnalyzing ? 'Analyzing keyword density...' : '' }}
                </div>
            </template>
        </MaCard>
        
        <MaCard title="Density Results" description="Keyword density analysis results" class="ma-results-card">
            <template #default>
                <div v-if="store.sortedDensityResults.length > 0" class="ma-results-content">
                    <div class="ma-table-container">
                        <table class="ma-density-table" aria-label="Keyword density analysis results">
                            <caption class="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style="clip: rect(0, 0, 0, 0);">
                                Keyword density analysis results showing keyword occurrences and percentages
                            </caption>
                            <thead>
                                <tr>
                                    <th @click="setSorting('keyword')" class="ma-sortable-header">
                                        Keyword {{ getSortIcon('keyword') }}
                                    </th>
                                    <th @click="setSorting('count')" class="ma-sortable-header">
                                        Count {{ getSortIcon('count') }}
                                    </th>
                                    <th @click="setSorting('density')" class="ma-sortable-header">
                                        Density (%) {{ getSortIcon('density') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="result in store.paginatedDensityResults" :key="result.keyword">
                                    <td class="ma-keyword-cell">{{ result.keyword }}</td>
                                    <td class="ma-count-cell">{{ result.count }}</td>
                                    <td class="ma-density-cell">{{ result.density }}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ma-summary">
                        <p class="ma-summary-text">
                            Total words analyzed: {{ store.textStats.totalWords }}
                        </p>
                        <div class="ma-pagination-info">
                            Showing {{ paginationInfo.start }}-{{ paginationInfo.end }} of {{ paginationInfo.total }} results
                        </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div v-if="store.totalPages > 1" class="ma-pagination">
                        <MaButton 
                            @click="prevPage" 
                            :disabled="store.currentPage === 1"
                            size="small"
                            variant="stroke"
                        >
                            Previous
                        </MaButton>
                        
                        <div class="ma-pagination-numbers">
                            <button 
                                v-for="page in Math.min(5, store.totalPages)" 
                                :key="page"
                                @click="goToPage(page)"
                                :class="['ma-pagination-btn', { 'active': store.currentPage === page }]"
                            >
                                {{ page }}
                            </button>
                            <span v-if="store.totalPages > 5" class="ma-pagination-ellipsis">...</span>
                        </div>
                        
                        <MaButton 
                            @click="nextPage" 
                            :disabled="store.currentPage === store.totalPages"
                            size="small"
                            variant="stroke"
                        >
                            Next
                        </MaButton>
                    </div>
                    
                    <div class="ma-copy-btn-container">
                        <MaButton
                            icon="copy"
                            color="primary"
                            size="small"
                            @click="copyResultsToClipboard"
                        >
                            Copy to Clipboard
                        </MaButton>
                    </div>
                </div>
                <div v-else class="ma-empty-state">
                    <MaEmpty description="Density results will appear here once analyzed" animation="no-data-found" size="medium" />
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.ma-container {
    @apply mt-4 flex flex-wrap gap-6 p-4 lg:flex-nowrap;

    .ma-input-card,
    .ma-results-card {
        @apply flex-1 min-w-0 md:min-w-80;
    }

    .ma-input-card {
        :deep(.ak-card__body) {
            @apply flex flex-col gap-5;
        }

        .ma-controls {
            @apply flex items-center gap-4 flex-wrap justify-start py-2 sm:flex-nowrap;
        }
    }

    .ma-results-card {
        .ma-table-container {
            @apply w-full overflow-x-auto;
        }

        .ma-density-table {
            @apply w-full border-collapse;
            table-layout: fixed;
            
            th {
                @apply bg-gray-50 px-2 py-2 text-left text-xs font-semibold text-gray-700 border-b border-gray-200 sm:px-4 sm:py-3 sm:text-sm;
            }

            td {
                @apply px-2 py-2 text-xs border-b border-gray-100 sm:px-4 sm:py-3 sm:text-sm;
            }

            th:nth-child(1), td:nth-child(1) {
                width: 50%;
            }

            th:nth-child(2), td:nth-child(2) {
                width: 20%;
            }

            th:nth-child(3), td:nth-child(3) {
                width: 30%;
            }

            .ma-keyword-cell {
                @apply font-medium text-gray-900;
            }

            .ma-count-cell {
                @apply text-left text-gray-600;
            }

            .ma-density-cell {
                @apply text-left font-semibold text-teal-600;
            }

            tbody tr:hover {
                @apply bg-gray-50;
            }
        }

        .ma-summary {
            @apply mt-4 pt-4 border-t border-gray-200;
        }

        .ma-summary-text {
            @apply text-xs text-gray-600 sm:text-sm;
        }

        .ma-empty-state {
            @apply w-full py-8;
        }

        .ma-error-message {
            @apply relative bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4;
        }

        .ma-error-close {
            @apply absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-lg leading-none bg-transparent border-0 cursor-pointer;
        }

        .ma-sortable-header {
            @apply cursor-pointer hover:bg-gray-100 select-none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .ma-pagination {
            @apply flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200;
        }

        .ma-pagination-numbers {
            @apply flex items-center gap-1;
        }

        .ma-pagination-btn {
            @apply px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 cursor-pointer;
        }

        .ma-pagination-btn.active {
            @apply bg-blue-500 text-white border-blue-500;
        }

        .ma-pagination-ellipsis {
            @apply px-2 text-gray-500;
        }

        .ma-pagination-info {
            @apply text-xs text-gray-500 mt-2;
        }
        
        .ma-copy-btn-container {
            @apply flex justify-end mt-4;
        }
    }



    .ma-options {
        @apply mb-4 flex flex-col gap-3;
    }

    .ma-merge-option {
        @apply flex items-center;
    }

    .ma-filter-option {
        @apply flex items-center;
    }

    .ma-character-count {
        @apply text-sm text-gray-500 text-right mt-1;
    }
}

// Mobile-first responsive design
@media (max-width: 640px) {
    .ma-container {
        @apply flex-col gap-4 p-2;
        
        .ma-input-card,
        .ma-results-card {
            @apply w-full min-w-0;
        }
    }
}
</style>