import { cleanDescription } from '@/utils/CleanDescription';
import { removeStopWords } from '@/utils/removeStopWords';
import { splitIntoWords } from '@/utils/textUtils';

function countWordFrequencies(words) {
    const counts = {};
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

function createKeywordDensityStats(counts, totalWords) {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const statsArray = [];
    
    for (const [word, count] of entries) {
        if (statsArray.length > 0 && statsArray[statsArray.length - 1].count === count) {
            statsArray[statsArray.length - 1].word += `, ${word}`;
        } else {
            statsArray.push({
                word: word,
                count: count,
                percentage: ((count / totalWords) * 100).toFixed(1)
            });
        }
    }
    
    return statsArray;
}

export function processKeywordDensity(text, shouldRemoveStopWords) {
    if (!text.trim()) {
        return { stats: [], totalWords: 0 };
    }

    const baseCleanedText = cleanDescription(text, false);
    const baseWords = splitIntoWords(baseCleanedText);
    const totalWords = baseWords.length;

    if (totalWords === 0) {
        return { stats: [], totalWords: 0 };
    }

    const finalCleanedText = shouldRemoveStopWords ? removeStopWords(baseCleanedText) : baseCleanedText;
    const words = splitIntoWords(finalCleanedText);

    const counts = countWordFrequencies(words);
    const stats = createKeywordDensityStats(counts, totalWords);

    return { stats, totalWords };
}
