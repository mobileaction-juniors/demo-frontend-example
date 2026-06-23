<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { generateNGrams } from '../../utils/generateNGrams';

const sourceDescriptionText = ref('');

const generatedKeywordNGrams = computed(() => 
{
    const text = sourceDescriptionText.value;
    if (!text.trim()) return [];

    const cleanedText = cleanDescription(text);
    
    return generateNGrams(cleanedText);
});
</script>

<template>
    <div class="ma-keyword-generator-page-wrapper">
        <div class="ma-page-header-section">
            <h1>Keyword Generator</h1>
            <p>Generate 1,2,3-gram keywords from your text without duplicates.</p>
        </div>

        <div class="ma-text-input-section">
            <textarea
                v-model="sourceDescriptionText"
                placeholder="Enter your text here (e.g., app description)..."
                rows="8"
            ></textarea>
        </div>

        <div v-if="sourceDescriptionText.trim().length > 0" class="ma-ngram-results-grid">
            <div v-for="nGramCategory in generatedKeywordNGrams" :key="nGramCategory.id" class="ma-ngram-category-card">
                <h2>
                    <span>{{ nGramCategory.title }}</span>
                    <span class="ma-keyword-count-badge">{{ nGramCategory.keywords.length }}</span>
                </h2>
                <ul>
                    <li v-for="keyword in nGramCategory.keywords" :key="keyword">
                        {{ keyword }}
                    </li>
                </ul>
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

    .ma-text-input-section {
        margin-bottom: 32px;

        textarea {
            width: 100%;
            padding: 16px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            font-size: 16px;
            resize: vertical;
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.2s;

            &:focus {
                border-color: #409eff;
            }
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

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            max-height: 400px;
            overflow-y: auto;

            li {
                padding: 8px 0;
                border-bottom: 1px solid #ebeef5;
                color: #606266;
                font-size: 16px;
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
