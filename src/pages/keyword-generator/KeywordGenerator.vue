<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';

const inputText = ref('');

const nGrams = computed(() => 
{
    const text = inputText.value;
    if (!text.trim()) return { oneGrams: [], twoGrams: [], threeGrams: [] };

    // Cleaning is done using CleanDescription.js
    const cleanedText = cleanDescription(text);
    
    if (!cleanedText) return { oneGrams: [], twoGrams: [], threeGrams: [] };

    const words = cleanedText.split(' ');

    const oneGrams = [];
    const twoGrams = [];
    const threeGrams = [];

    for (let i = 0; i < words.length; i++) 
    {
        // 1-gram
        if (!oneGrams.includes(words[i])) {
            oneGrams.push(words[i]);
        }

        // 2-gram
        if (i < words.length - 1) 
        {
            const twoGram = `${words[i]} ${words[i+1]}`;
            if (!twoGrams.includes(twoGram)) {
                twoGrams.push(twoGram);
            }
        }

        // 3-gram
        if (i < words.length - 2) 
        {
            const threeGram = `${words[i]} ${words[i+1]} ${words[i+2]}`;
            if (!threeGrams.includes(threeGram)) {
                threeGrams.push(threeGram);
            }
        }
    }

    return {
        oneGrams,
        twoGrams,
        threeGrams,
    };
});
</script>

<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <h1>Keyword Generator</h1>
            <p>Generate 1,2,3-gram keywords from your text without duplicates.</p>
        </div>

        <div class="input-container">
            <textarea
                v-model="inputText"
                placeholder="Enter your text here (e.g., app description)..."
                rows="8"
            ></textarea>
        </div>

        <div v-if="inputText.trim().length > 0" class="results-grid">
            <!-- 1-grams -->
            <div class="gram-card">
                <h2>
                    <span>1-Gram</span>
                    <span class="count-badge">{{ nGrams.oneGrams.length }}</span>
                </h2>
                <ul>
                    <li v-for="kw in nGrams.oneGrams" :key="kw">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.oneGrams.length === 0" class="empty-state">No 1-grams generated</div>
            </div>

            <!-- 2-grams -->
            <div class="gram-card">
                <h2>
                    <span>2-Gram</span>
                    <span class="count-badge">{{ nGrams.twoGrams.length }}</span>
                </h2>
                <ul>
                    <li v-for="kw in nGrams.twoGrams" :key="kw">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.twoGrams.length === 0" class="empty-state">No 2-grams generated</div>
            </div>

            <!-- 3-grams -->
            <div class="gram-card">
                <h2>
                    <span>3-Gram</span>
                    <span class="count-badge">{{ nGrams.threeGrams.length }}</span>
                </h2>
                <ul>
                    <li v-for="kw in nGrams.threeGrams" :key="kw">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.threeGrams.length === 0" class="empty-state">No 3-grams generated</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keywords-generator {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    font-family: sans-serif;

    .ma-header {
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

    .input-container {
        margin-bottom: 30px;

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

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
    }

    .gram-card {
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

        .count-badge {
            font-size: 14px;
            background: #e0e6ed;
            padding: 2px 8px;
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
                font-size: 15px;
            }
        }

        .empty-state {
            color: #909399;
            font-style: italic;
            margin-top: 10px;
        }
    }
}
</style>