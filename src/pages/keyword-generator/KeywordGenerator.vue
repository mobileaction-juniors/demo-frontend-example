<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';

const inputText = ref('');

const nGrams = computed(() => 
{
    const text = inputText.value;
    if (!text.trim()) return { oneGrams: [], twoGrams: [], threeGrams: [] };

    // Clean the text: lowercase, replace non-letter/number characters with spaces, 
    // and split by whitespace
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
    <div class="ma-keywords-generator" style="padding: 20px; max-width: 1000px; margin: 0 auto; font-family: sans-serif;">
        <div class="ma-header" style="margin-bottom: 24px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 8px 0; color: #2c3e50;">Keyword Generator</h1>
            <p style="color: #666; margin: 0; font-size: 16px;">Generate 1,2,3-gram keywords from your text without duplicates.</p>
        </div>

        <div style="margin-bottom: 30px;">
            <textarea
                v-model="inputText"
                placeholder="Enter your text here (e.g., app description)..."
                rows="8"
                style="width: 100%; padding: 16px; border: 1px solid #dcdfe6; border-radius: 8px; font-size: 16px; resize: vertical; box-sizing: border-box; outline: none; transition: border-color 0.2s;"
                onfocus="this.style.borderColor='#409eff'"
                onblur="this.style.borderColor='#dcdfe6'"
            ></textarea>
        </div>

        <div v-if="inputText.trim().length > 0" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
            <!-- 1-grams -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #ebeef5; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; margin-top: 0; margin-bottom: 16px; color: #303133; display: flex; align-items: center; justify-content: space-between;">
                    <span>1-Gram</span>
                    <span style="font-size: 14px; background: #e0e6ed; padding: 2px 8px; border-radius: 12px; color: #606266;">{{ nGrams.oneGrams.length }}</span>
                </h2>
                <ul style="list-style-type: none; padding: 0; margin: 0; max-height: 400px; overflow-y: auto;">
                    <li v-for="kw in nGrams.oneGrams" :key="kw" style="padding: 8px 0; border-bottom: 1px solid #ebeef5; color: #606266; font-size: 15px;">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.oneGrams.length === 0" style="color: #909399; font-style: italic; margin-top: 10px;">No 1-grams generated</div>
            </div>

            <!-- 2-grams -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #ebeef5; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; margin-top: 0; margin-bottom: 16px; color: #303133; display: flex; align-items: center; justify-content: space-between;">
                    <span>2-Gram</span>
                    <span style="font-size: 14px; background: #e0e6ed; padding: 2px 8px; border-radius: 12px; color: #606266;">{{ nGrams.twoGrams.length }}</span>
                </h2>
                <ul style="list-style-type: none; padding: 0; margin: 0; max-height: 400px; overflow-y: auto;">
                    <li v-for="kw in nGrams.twoGrams" :key="kw" style="padding: 8px 0; border-bottom: 1px solid #ebeef5; color: #606266; font-size: 15px;">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.twoGrams.length === 0" style="color: #909399; font-style: italic; margin-top: 10px;">No 2-grams generated</div>
            </div>

            <!-- 3-grams -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #ebeef5; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);">
                <h2 style="font-size: 20px; margin-top: 0; margin-bottom: 16px; color: #303133; display: flex; align-items: center; justify-content: space-between;">
                    <span>3-Gram</span>
                    <span style="font-size: 14px; background: #e0e6ed; padding: 2px 8px; border-radius: 12px; color: #606266;">{{ nGrams.threeGrams.length }}</span>
                </h2>
                <ul style="list-style-type: none; padding: 0; margin: 0; max-height: 400px; overflow-y: auto;">
                    <li v-for="kw in nGrams.threeGrams" :key="kw" style="padding: 8px 0; border-bottom: 1px solid #ebeef5; color: #606266; font-size: 15px;">
                        {{ kw }}
                    </li>
                </ul>
                <div v-if="nGrams.threeGrams.length === 0" style="color: #909399; font-style: italic; margin-top: 10px;">No 3-grams generated</div>
            </div>
        </div>
    </div>
</template>