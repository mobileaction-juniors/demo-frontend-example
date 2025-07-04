import { regex, splitRegex, filterArr } from '../cleanupResources'

const stopWords = new Set(filterArr)

const cleanText = (text) => {
  let cleaned = text.replace(regex, ' ')
  cleaned = cleaned.replace(splitRegex, ' ')
  cleaned = cleaned.toLowerCase().trim()
  cleaned = cleaned.replace(/\s+/g, ' ')
  
  // Split into words and filter out stop words
  const words = cleaned.split(' ').filter(word => word.length > 0)
  return words.filter(word => !stopWords.has(word))
}

export const generateNGrams = (words, n) => {
  const ngrams = []
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(' ')
    ngrams.push(ngram)
  }
  return ngrams
}

// Main keyword generation function
export const generateKeywords = (inputText, selectedNGrams) => {
  if (!inputText.trim()) {
    return selectedNGrams.reduce((acc, n) => {
      acc[`${n}-gram`] = []
      return acc
    }, {})
  }

  const filteredWords = cleanText(inputText)

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