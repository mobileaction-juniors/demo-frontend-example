// Stop words to filter out
const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 
  'in', 'it', 'its', 'of', 'on', 'that', 'the', 'to',
  'but', 'or',
  'if', 'then', 'else', 'when', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off',
  'over', 'under', 'again', 'further', 'how', 'all', 'any', 'both', 'each', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very'
])

// Text cleaning function
export const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove special characters except spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
}

// Filter out stop words if enabled
export const filterStopWords = (words, removeStopWords = true) => {
  if (!removeStopWords) return words
  return words.filter(word => !stopWords.has(word))
}

// Generate n-gram keywords
export const generateNGrams = (words, n) => {
  const ngrams = []
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(' ')
    ngrams.push(ngram)
  }
  return ngrams
}

// Main keyword generation function
export const generateKeywords = (inputText, selectedNGrams, removeStopWords = true) => {
  if (!inputText.trim()) {
    return {}
  }

  const cleanedText = cleanText(inputText)
  const words = cleanedText.split(' ').filter(word => word.length > 0)
  const filteredWords = filterStopWords(words, removeStopWords)

  // Generate n-grams for selected n values 
  const newKeywords = {}
  selectedNGrams.forEach(n => {
    if (n <= filteredWords.length) {
      newKeywords[`${n}-gram`] = generateNGrams(filteredWords, n)
    } else {
      newKeywords[`${n}-gram`] = []
    }
  })

  return newKeywords
}

// Get available n-gram options
export const getNGramOptions = (max = 10) => {
  return Array.from({ length: max }, (_, i) => i + 1)
}

// Get n-gram class name
export const getNGramClass = (n) => {
  return `ngram-${n}`
} 