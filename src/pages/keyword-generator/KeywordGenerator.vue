<script setup>
// ref is for storing the raw description input by the user, while computed properties are used to derive the list of words and the generated keywords based on that description. 
import { computed, ref } from 'vue'
import { cleanDescription } from '../../utils/CleanDescription'

// kullanıcının girdiği inputu storeluyorum (başlangıç değer boş string)
const description = ref('')

// temizlenmiş kelimeleri tutan computed property, description değiştiğinde otomatik olarak güncellenir
const words = computed(() => {
    const cleanedText = cleanDescription(description.value)

    //boşsa boş returnlüyor
    if (!cleanedText) {
        return []
    }

    // temizlenmiş metni kelimelere bölüyoruz, boşluklara göre bölüyoruz ve boş olmayanları filtreliyoruz
    return cleanedText.split(' ').filter(Boolean)
})

//n gramı ürettiğim fonksiyon (token=kelimeler, size=kaç kelimelik grup)
function buildNGrams(tokens, size) {

    //boşsa ya da token sayısı istenenden azsa boş return
    if (tokens.length < size) {
        return []
    }

    // her n-gram arrayı anlık boş
    const phrases = []

    //tokenlara bölme işlemi sırasyla, size a bağlı ekleniyor her token
    for (let index = 0; index <= tokens.length - size; index += 1) {
        phrases.push(tokens.slice(index, index + size).join(' '))
    }

    //tekrarlar kaldırılır
    return [...new Set(phrases)]
}

// 3 farklı n-gram oluşturmak için computed property, 1-gram, 2-gram ve 3-gram'ları oluşturur
const generatedKeywords = computed(() => ({
    1: buildNGrams(words.value, 1),
    2: buildNGrams(words.value, 2),
    3: buildNGrams(words.value, 3)
}))

// keyword gruplarını oluşturmak için computed property, her grup için boyut ve ilgili anahtar kelimeleri içeren bir nesne döner
const keywordGroups = computed(() => [1, 2, 3].map((size) => ({
    size,
    keywords: generatedKeywords.value[size]
})))
</script>

<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
        </div>

        <section class="input-panel">
            <label for="keyword-source">Enter description</label>
            <textarea
                id="keyword-source"
                v-model="description"
                rows="7"
                placeholder="Paste an app description here..."
            />
        </section>

        <section class="results-panel">
            <div v-if="words.length === 0" class="empty-state">
                Type or paste text to generate 1-gram, 2-gram, and 3-gram keywords.
            </div>

            <div v-else class="keyword-groups">
                <article
                    v-for="group in keywordGroups"
                    :key="group.size"
                    class="keyword-group"
                >
                    <h2>{{ group.size }}-gram keywords</h2>

                    <p class="group-meta">
                        {{ group.keywords.length }} unique keywords
                    </p>

                    <ul class="keyword-list">
                        <li
                            v-for="keyword in group.keywords"
                            :key="keyword"
                            class="keyword-item"
                        >
                            {{ keyword }}
                        </li>
                    </ul>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped>
.ma-keywords-generator {
    max-width: 960px;
    margin: 0 auto;
    padding: 24px;
}

.ma-header {
    margin-bottom: 24px;
    font-size: 1.75rem;
    font-weight: 700;
}

.input-panel,
.results-panel {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
}

.input-panel label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
}

.input-panel textarea {
    width: 100%;
    min-height: 160px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 12px;
    resize: vertical;
    font: inherit;
}

.keyword-groups {
    display: grid;
    gap: 16px;
}

.keyword-group h2 {
    margin: 0 0 6px;
    font-size: 1.1rem;
}

.group-meta {
    margin: 0 0 12px;
    color: #6b7280;
    font-size: 0.95rem;
}

.keyword-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.keyword-item {
    padding: 8px 12px;
    border-radius: 999px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
}

.empty-state {
    color: #6b7280;
}
</style>