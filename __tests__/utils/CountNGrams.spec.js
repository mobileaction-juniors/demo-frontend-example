import { describe, it, expect } from 'vitest'
import { sanitizeAndTokenize } from '@/utils/CleanDescription.js'
import {generateNgramRange, nthGram} from '@/utils/NGram.js'

describe('NGram generation workflow', () => {
    it('should generate correct n-grams with clearUnwantedSelected false and true', () => {
        const inputText = "This is a test test sentence."

        // Case 1: clearUnwantedSelected = false
        let cleanedText = sanitizeAndTokenize(inputText, false)
        let wordCount = cleanedText.length
        let maxN = 3
        let minN = 1
        let newGrams = []

        const sorted = generateNgramRange(maxN, minN)
        for (let n of sorted) {
            const resultN = nthGram(n, wordCount, cleanedText)

            if (resultN.size > 0) {
                for (const [ngram, count] of resultN.entries()) {
                    newGrams.push({
                        word: ngram,
                        count,
                        density: (count / wordCount) * 100
                    })
                }
            }
        }
        newGrams.sort((a, b) => b.count - a.count)

        // Example expected n-grams with counts and densities for this input and false flag
        // Adjust the expected array depending on your actual sanitizeAndTokenize implementation
        const expectedFalse = [
            { word: 'test', count: 2, density: (2 / wordCount) * 100 },
            { word: 'this', count: 1, density: (1 / wordCount) * 100 },
            { word: 'is', count: 1, density: (1 / wordCount) * 100 },
            { word: 'a', count: 1, density: (1 / wordCount) * 100 },
            { word: 'sentence', count: 1, density: (1 / wordCount) * 100 },
            { word: 'this is', count: 1, density: (1 / wordCount) * 100 },
            { word: 'is a', count: 1, density: (1 / wordCount) * 100 },
            { word: 'a test', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test test', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test sentence', count: 1, density: (1 / wordCount) * 100 },
            // For trigrams
            { word: 'this is a', count: 1, density: (1 / wordCount) * 100 },
            { word: 'is a test', count: 1, density: (1 / wordCount) * 100 },
            { word: 'a test test', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test test sentence', count: 1, density: (1 / wordCount) * 100 },
        ]

        expect(newGrams).toEqual(expectedFalse)

        // Case 2: clearUnwantedSelected = true
        cleanedText = sanitizeAndTokenize(inputText, true)
        wordCount = cleanedText.length
        newGrams = []

        for (let n of sorted) {
            const resultN = nthGram(n, wordCount, cleanedText)

            if (resultN.size > 0) {
                for (const [ngram, count] of resultN.entries()) {
                    newGrams.push({
                        word: ngram,
                        count,
                        density: (count / wordCount) * 100
                    })
                }
            }
        }
        newGrams.sort((a, b) => b.count - a.count)

        // Expected results after stopword removal depends on your stopword list
        // Example (assuming stopwords removed: "this", "is", "a")
        const expectedTrue = [
            { word: 'test', count: 2, density: (2 / wordCount) * 100 },
            { word: 'sentence', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test test', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test sentence', count: 1, density: (1 / wordCount) * 100 },
            { word: 'test test sentence', count: 1, density: (1 / wordCount) * 100 },
        ]

        expect(newGrams).toEqual(expectedTrue)
    })
})
