import { cleanDescription } from './CleanDescription';

function getWordCount(text) {
    const cleanedText = cleanDescription(text, false);
    const words = cleanedText.split(/\s+/).filter(w => w.length > 0);
    return words.length;
}

function getWordsList(text, removeStopWords) {
    const processedText = cleanDescription(text, removeStopWords);
    return processedText.split(/\s+/).filter(w => w.length > 0);
}

function countWordFrequencies(words) {
    const counts = {};
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

function groupWordsByFrequency(counts) {
    const countGroups = {};
    for (const [word, count] of Object.entries(counts)) {
        if (!countGroups[count]) {
            countGroups[count] = [];
        }
        countGroups[count].push(word);
    }
    return countGroups;
}

function calculateStatsArray(countGroups, totalWords) {
    const statsArray = Object.entries(countGroups).map(([countStr, wordsArray]) => {
        const count = parseInt(countStr);
        return {
            word: wordsArray.join(', '),
            count,
            percentage: ((count / totalWords) * 100).toFixed(1)
        };
    });

    statsArray.sort((a, b) => b.count - a.count);
    return statsArray;
}

export function processKeywordDensity(text, shouldRemoveStopWords) {
    if (!text.trim()) {
        return { stats: [], totalWords: 0 };
    }

    const totalWords = getWordCount(text);
    const words = getWordsList(text, shouldRemoveStopWords);

    if (words.length === 0) {
        return { stats: [], totalWords };
    }

    const counts = countWordFrequencies(words);
    const countGroups = groupWordsByFrequency(counts);
    const stats = calculateStatsArray(countGroups, totalWords);

    return { stats, totalWords };
}
