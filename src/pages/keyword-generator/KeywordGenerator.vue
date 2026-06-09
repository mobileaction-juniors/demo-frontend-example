<script setup>
import { computed, ref } from 'vue'
import { MaButton, MaTextarea } from '@mobileaction/action-kit'
import { cleanDescription } from '../../utils/CleanDescription'

//Initial empty ref values for description
const description = ref('')

//Since I added the button logic, I needed another ref to keep submitted description seperate from the typed version.
const submittedDescription = ref('')

//Initially 1, 2, 3 are selected.
const selectedGramSizes = ref([1, 2, 3])

//Initial forbidden words for keywording.
const selectedStopWords = ref(['is', 'a', 'an', 'the'])

//const var for options in the select inputs up to 10
const gramSizeOptions = Array.from({ length: 10 }, (_, index) => index + 1)

// options for forbidden words
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

//noralizing the selected options for sizes by mapping also filtering out invalid values and sorting.
function normalizeOptionList(values) {
    return [...new Set(values.map((value) => Number(value)).filter((value) => Number.isInteger(value) && value >= 1 && value <= 10))].sort((left, right) => left - right)
}

//function for building n grams from the filtered words. 
function buildNGrams(tokens, size) {

    //the case where token length is less than the n-gram size or tokens is empty
    if (tokens.length < size) {
        return []
    }

    //creating initiallly an empty array for phrases.
    const phrases = []

    //splitting of words into n-grams by slicing the tokens arrays.
    for (let index = 0; index <= tokens.length - size; index += 1) {
        phrases.push(tokens.slice(index, index + size).join(' '))
    }

    //turning the array into set so that duplicates are removed. 
    return [...new Set(phrases)]
}

//handling the button click. 
function handleGenerateKeywords() {
    submittedDescription.value = description.value
}

//computed property for cleaning the description by using imported cleanDescription function.
const cleanedWords = computed(() => {
    const cleanedText = cleanDescription(submittedDescription.value)

    if (!cleanedText) {
        return []
    }

    //splitting the cleaned text into words by space. Also filters empty strings.
    return cleanedText.split(' ').filter(Boolean)
})


//new pull request
//filtering cleaned words by removing initally selected stop words.
const filteredWords = computed(() => {
    const stopWords = new Set(selectedStopWords.value.map((word) => word.toLowerCase()))

    return cleanedWords.value.filter((word) => !stopWords.has(word))
})

// normalizing the selected n-gram sizes for building the keyword groups.
const selectedSizes = computed(() => normalizeOptionList(selectedGramSizes.value))

//the place where n-grams are built by mapping selected sizes and using the buildNGrams.
const keywordGroups = computed(() => selectedSizes.value.map((size) => ({
    size,
    keywords: buildNGrams(filteredWords.value, size)
})))

//computation of total number of keywords for each n-gram group.
const totalKeywords = computed(() => keywordGroups.value.reduce((count, group) => count + group.keywords.length, 0))


const hasGeneratedText = computed(() => submittedDescription.value.trim().length > 0)
</script>

<template>
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
        <header class="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">ONB-203</p>
            <div class="mt-3 space-y-3">
                <h1 class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                    Keyword Generator Review App
                </h1>
                <p class="max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
                    Write a description, press generate button, and the app will clean the text,
                    remove selected stop words, and show unique n-grams as tags.
                </p>
            </div>
        </header>
        <!-- v-model is the place where the description input is bound (ref variable) -->
        <section class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div class="space-y-5">
                    <div class="space-y-2">
                        <label for="keyword-source" class="text-sm font-semibold text-slate-800">
                            Text Area
                        </label>
                        <MaTextarea
                            id="keyword-source"
                            v-model="description"
                            rows="10"
                            placeholder="Paste an app description here..."
                            class="w-full"
                        />
                    </div>

                    <!-- N-gram sizes selection part v-model - ref var selectedGramSizes-->
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="space-y-2">
                            <label for="gram-sizes" class="text-sm font-semibold text-slate-800">
                                N-grams to show
                            </label>
                            <select
                                id="gram-sizes"
                                v-model="selectedGramSizes"
                                multiple
                                size="10"
                                class="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            >
                                <option
                                    v-for="size in gramSizeOptions"
                                    :key="size"
                                    :value="size"
                                >
                                    {{ size }}-gram
                                </option>
                            </select>
                            <p class="text-sm text-slate-500">
                                Use multi select to choose any combination from 1 to 10.
                            </p>
                        </div>

                        <div class="space-y-2">
                            <label for="stop-words" class="text-sm font-semibold text-slate-800">
                                Remove unwanted words
                            </label>
                            <select
                                id="stop-words"
                                v-model="selectedStopWords"
                                multiple
                                size="10"
                                class="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            >
                                <option
                                    v-for="word in stopWordOptions"
                                    :key="word"
                                    :value="word"
                                >
                                    {{ word }}
                                </option>
                            </select>
                            <p class="text-sm text-slate-500">
                                Select words such as is, a, an, and the to remove them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <aside class="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                <div class="flex h-full flex-col justify-between gap-6">
                    <div class="space-y-3">
                        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                            Generate on demand
                        </p>
                        <h2 class="text-2xl font-bold tracking-tight text-white">
                            Press the button to convert text into keywords.
                        </h2>
                        <p class="text-sm leading-6 text-slate-300">
                            The page keeps the typed text separate until you explicitly generate
                            the keywords.
                        </p>
                    </div>

                    <MaButton
                        :disabled="!description.trim()"
                        class="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
                        @click="handleGenerateKeywords"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            class="h-4 w-4 shrink-0 fill-current"
                        >
                            <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                        </svg>
                        <span>Generate keywords</span>
                    </MaButton>

                    <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                        <div class="flex items-center justify-between gap-4">
                            <span class="text-slate-400">Text ready</span>
                            <span class="font-semibold text-white">{{ hasGeneratedText ? 'Yes' : 'No' }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-4">
                            <span class="text-slate-400">Words after filtering</span>
                            <span class="font-semibold text-white">{{ filteredWords.length }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-4">
                            <span class="text-slate-400">Total tags</span>
                            <span class="font-semibold text-white">{{ totalKeywords }}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </section>

        <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h2 class="text-xl font-bold text-slate-900">Generated Keywords</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Generated keywords are shown as tags after pressing the button.
                    </p>
                </div>
                <div class="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                    {{ totalKeywords }} tags
                </div>
            </div>

            <div v-if="!hasGeneratedText" class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                Type a description and press the generate button to see keywords here.
            </div>

            <div v-else class="mt-6 grid gap-5">
                <article
                    v-for="group in keywordGroups"
                    :key="group.size"
                    class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="text-base font-semibold text-slate-900">{{ group.size }}-gram</h3>
                        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                            {{ group.keywords.length }}
                        </span>
                    </div>

                    <p v-if="group.keywords.length === 0" class="mt-3 text-sm text-slate-500">
                        Not enough words remain for this n-gram.
                    </p>

                    <div v-else class="mt-3 flex flex-wrap gap-2">
                        <span
                            v-for="keyword in group.keywords"
                            :key="keyword"
                            class="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700"
                        >
                            {{ keyword }}
                        </span>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>