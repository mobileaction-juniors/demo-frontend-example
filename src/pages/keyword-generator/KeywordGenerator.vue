<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { generateNGrams } from '../../utils/generateNGrams';
import { MaTextarea as MaInput2, MaSelect2, MaBadge, MaButton, MaCheckbox } from '@mobileaction/action-kit';

const sourceDescriptionText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const shouldRemoveStopWords = ref(true);

const nGramOptions = [
    { value: 1, label: '1-Gram' },
    { value: 2, label: '2-Gram' },
    { value: 3, label: '3-Gram' },
    { value: 4, label: '4-Gram' },
    { value: 5, label: '5-Gram' },
    { value: 6, label: '6-Gram' },
    { value: 7, label: '7-Gram' },
    { value: 8, label: '8-Gram' },
    { value: 9, label: '9-Gram' },
    { value: 10, label: '10-Gram' },
];

const generatedKeywordNGrams = computed(() => {
    const text = sourceDescriptionText.value;
    if (!text.trim()) return [];

    const cleanedText = cleanDescription(text, shouldRemoveStopWords.value);
    
    return generateNGrams(cleanedText, selectedNGrams.value);
});
</script>

<template>
    <div class="ma-keyword-generator-page-wrapper">
        <div class="ma-page-header-section">
            <h1>Keyword Generator</h1>
            <p>Generate 1-10 gram keywords from your text without duplicates.</p>
        </div>

        <div class="ma-filters-section">
            <MaSelect2
                v-model:value="selectedNGrams"
                :options="nGramOptions"
                multiple
                placeholder="Select N-Grams to generate"
                class="ma-ngram-selector"
            />
            <MaCheckbox v-model:checked="shouldRemoveStopWords">
                Remove Stop Words
            </MaCheckbox>
        </div>

        <div class="ma-text-input-section">
            <MaInput2
                v-model="sourceDescriptionText"
                placeholder="Enter your text here (e.g., app description)..."
                :rows="8"
            />
            <div class="ma-action-buttons" v-if="sourceDescriptionText.trim().length > 0">
                <MaButton @click="sourceDescriptionText = ''">Clear Text</MaButton>
            </div>
        </div>

        <div v-if="sourceDescriptionText.trim().length > 0" class="ma-ngram-results-grid">
            <div v-for="nGramCategory in generatedKeywordNGrams" :key="nGramCategory.id" class="ma-ngram-category-card">
                <h2>
                    <span>{{ nGramCategory.title }}</span>
                    <span class="ma-keyword-count-badge">{{ nGramCategory.keywords.length }}</span>
                </h2>
                <div class="ma-keyword-tags-container">
                    <MaBadge 
                        v-for="keyword in nGramCategory.keywords" 
                        :key="keyword"
                        class="ma-keyword-badge"
                    >
                        {{ keyword }}
                    </MaBadge>
                </div>
                <div v-if="nGramCategory.keywords.length === 0" class="ma-empty-results-message">No {{ nGramCategory.id }}-grams generated</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keyword-generator-page-wrapper {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    font-family: sans-serif;

    .ma-page-header-section {
        margin-bottom: 24px;

        h1 {
            font-size: 28px;
            font-weight: bold;
            margin: 0 0 8px 0;
            color: #2c3e50;
        }

        p {
            color: #666;
            margin: 0;
            font-size: 16px;
        }
    }

    .ma-filters-section {
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .ma-ngram-selector {
            width: 100%;
            max-width: 400px;
        }
    }

    .ma-text-input-section {
        margin-bottom: 32px;

        .ma-action-buttons {
            margin-top: 12px;
            display: flex;
            justify-content: flex-end;
        }
    }

    .ma-ngram-results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(248px, 1fr));
        gap: 24px;
    }

    .ma-ngram-category-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);

        h2 {
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 16px;
            color: #303133;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .ma-keyword-count-badge {
            font-size: 16px;
            background: #e0e6ed;
            padding: 4px 8px;
            border-radius: 12px;
            color: #606266;
        }

        .ma-keyword-tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            max-height: 400px;
            overflow-y: auto;
            
            .ma-keyword-badge {
                margin-right: 4px;
                margin-bottom: 4px;
            }
        }

        .ma-empty-results-message {
            color: #909399;
            font-style: italic;
            margin-top: 12px;
        }
    }
}
</style>
