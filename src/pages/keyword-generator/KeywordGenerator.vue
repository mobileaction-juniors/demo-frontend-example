<script setup>
// ref is used to create reactive state variables, and computed is used to create derived state that automatically updates when its dependencies change.
import { computed, ref } from 'vue'
import { cleanDescription } from '../../utils/CleanDescription'

// reactive state variables for the descirption inputs, description - text that will be entered in textarea
const description = ref('')
//selectedGramSize - which n-grams will be showed in the results (initially 1,2,3)
const selectedGramSizes = ref([1, 2, 3])
//selectedStopWords - which words will be exclueded from the keywords initally those below
const selectedStopWords = ref(['is', 'a', 'an', 'the'])

//gramSizeOptions - options for n-grams selection, from 1 to 10
const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1)

//stopWordOptions - options for stop words selection, a list of common English stop words
const stopWordOptions = [
    'is',
    'a',
    'an',
    'the',
    'and',
    'or',
    'of',
    'to',
    'in',
    'on',
    'for',
    'with',
    'at',
    'by',
    'from',
    'up',
    'about'
]

function normalizeOptionList(values) {
    return [...new Set(values.map((value) => Number(value)).filter((value) => Number.isInteger(value) && value >= 1 && value <= 10))].sort((left, right) => left - right)
}

// create n-grams from a list of tokens, where size is the number of words in each n-gram. It returns an array of unique n-grams.
function buildNGrams(tokens, size) {
    if (tokens.length < size) { 
        return []
    }

    //empty phrases array to store
    const phrases = []

    //allowing to loop through the tokens and create n-grams by slicing the tokens array from the current index to the index plus the size of the n-gram, and then joining those tokens into a single string. Each n-gram is added to the phrases array.
    for (let index = 0; index <= tokens.length - size; index += 1) {
        phrases.push(tokens.slice(index, index + size).join(' '))
    }

    //using set to remove duplicates and return the unique n-grams as an array.
    return [...new Set(phrases)]
}

// computed property, processes the description text by cleaning it and splitting it into individual words, while filtering out any empty strings. 
const cleanedWords = computed(() => {
    const cleanedText = cleanDescription(description.value)

    if (!cleanedText) {
        return []
    }

    return cleanedText.split(' ').filter(Boolean)
})

//computed property, further filtering by deleting any words that are included in the selected forbidden words list
const filteredWords = computed(() => {
    //everything is lowercased
    const stopWords = new Set(selectedStopWords.value.map((word) => word.toLowerCase()))

    //filtering the cleaned words by excluding any that are present in the stopwords set
    return cleanedWords.value.filter((word) => !stopWords.has(word))
})

//computed property for normalizing the selected n-gram sizes, ensuring they are unique, valid integers between 1 and 10, and sorted in ascending order. 
const selectedSizes = computed(() => normalizeOptionList(selectedGramSizes.value))

//creating the output groups for the keywords
const keywordGroups = computed(() => selectedSizes.value.map((size) => ({
    size,
    keywords: buildNGrams(filteredWords.value, size)
})))

// finding the total number of keywords in each group
const totalKeywords = computed(() => keywordGroups.value.reduce((count, group) => count + group.keywords.length, 0))
</script>

<template>
    <div class="ma-keywords-generator">
        <header class="page-header">
            <p class="eyebrow">ONB-202</p>
            <h1>Keyword Generator</h1>
            <p class="page-description">
                Paste a description, remove unwanted words, pick the n-grams you want,
                and the page will turn the result into tags.
            </p>
        </header>

        <section class="card">
            <div class="field-group">
                <label for="keyword-source">ActionKit UI text area</label>
                <textarea
                    id="keyword-source"
                    v-model="description"
                    class="ak-textarea"
                    rows="8"
                    placeholder="Paste an app description here..."
                />
                <p class="help-text">Vue keeps this field reactive with <code>v-model</code>.</p>
            </div>

            <div class="controls-grid">
                <div class="field-group">
                    <label for="gram-sizes">Select n-grams to show</label>
                    <select id="gram-sizes" v-model="selectedGramSizes" class="ak-select" multiple size="6">
                        <option
                            v-for="size in gramSizeOptions"
                            :key="size"
                            :value="size"
                        >
                            {{ size }}-gram
                        </option>
                    </select>
                    <p class="help-text">Use multi selection to show any combination from 1 to 10.</p>
                </div>

                <div class="field-group">
                    <label for="stop-words">Remove unwanted words</label>
                    <select id="stop-words" v-model="selectedStopWords" class="ak-select" multiple size="8">
                        <option
                            v-for="word in stopWordOptions"
                            :key="word"
                            :value="word"
                        >
                            {{ word }}
                        </option>
                    </select>
                    <p class="help-text">Select words like is, a, an, and the to exclude them from keywords.</p>
                </div>
            </div>
        </section>

        <section class="card results-card">
            <div class="results-header">
                <div>
                    <h2>Generated Keywords</h2>
                    <p class="help-text">
                        {{ filteredWords.length }} words remain after cleaning and filtering.
                    </p>
                </div>
                <div class="summary-pill">
                    {{ totalKeywords }} tags
                </div>
            </div>

            <div v-if="filteredWords.length === 0" class="empty-state">
                Add text above to generate keywords.
            </div>

            <div v-else class="keyword-groups">
                <article
                    v-for="group in keywordGroups"
                    :key="group.size"
                    class="keyword-group"
                >
                    <div class="group-header">
                        <h3>{{ group.size }}-gram</h3>
                        <span class="group-count">{{ group.keywords.length }}</span>
                    </div>

                    <div v-if="group.keywords.length === 0" class="empty-group">
                        Not enough words for this n-gram.
                    </div>

                    <div v-else class="tag-list" :aria-label="`${group.size}-gram keywords`">
                        <span
                            v-for="keyword in group.keywords"
                            :key="keyword"
                            class="keyword-tag"
                        >
                            {{ keyword }}
                        </span>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped>
.ma-keywords-generator {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px;
}

.page-header {
    margin-bottom: 24px;
}

.eyebrow {
    margin: 0 0 8px;
    color: #6b7280;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
}

.page-header h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.1;
}

.page-description {
    max-width: 720px;
    margin: 12px 0 0;
    color: #4b5563;
    line-height: 1.6;
}

.card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.06);
    padding: 20px;
    margin-bottom: 20px;
}

.field-group {
    display: grid;
    gap: 10px;
}

.field-group label {
    font-weight: 700;
    color: #111827;
}

.ak-textarea,
.ak-select {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    background: #f9fafb;
    color: #111827;
    font: inherit;
    padding: 12px;
}

.ak-textarea {
    min-height: 180px;
    resize: vertical;
}

.ak-textarea:focus,
.ak-select:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
    background: #ffffff;
}

.controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.help-text {
    margin: 0;
    color: #6b7280;
    font-size: 0.92rem;
    line-height: 1.5;
}

.help-text code {
    padding: 0.1rem 0.35rem;
    border-radius: 999px;
    background: #eef2ff;
    color: #3730a3;
}

.results-card {
    display: grid;
    gap: 16px;
}

.results-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
}

.results-header h2 {
    margin: 0;
    font-size: 1.4rem;
}

.summary-pill,
.group-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 6px 12px;
    border-radius: 999px;
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 700;
}

.keyword-groups {
    display: grid;
    gap: 16px;
}

.keyword-group {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
}

.group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
}

.group-header h3 {
    margin: 0;
    font-size: 1.05rem;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.keyword-tag {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #111827;
    line-height: 1.2;
}

.empty-state,
.empty-group {
    color: #6b7280;
}

@media (max-width: 640px) {
    .ma-keywords-generator {
        padding: 16px;
    }

    .card {
        padding: 16px;
    }

    .results-header {
        flex-direction: column;
    }
}
</style>