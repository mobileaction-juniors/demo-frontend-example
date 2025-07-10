import { cleanDescription, cleanStopWords } from '@/utils/CleanDescription';

export function useKeywordDensity() {
  function getFilteredWords(input, removeStopWordsFlag) {
    let words = cleanDescription(input).trim().toLowerCase().split(/\s+/).filter(Boolean);
    const stopWords = cleanStopWords(input);
    if (removeStopWordsFlag) {
      words = words.filter(w => !stopWords.includes(w));
    }
    return words;
  }

  function getFrequencyMap(words) {
    return words.reduce((acc, w) => {
      acc[w] = (acc[w] || 0) + 1;
      return acc;
    }, {});
  }

  function getMostFrequentWords(freqMap) {
    const uniqueKeywords = Object.keys(freqMap);
    let mostFrequentCount = 0;
    uniqueKeywords.forEach(k => {
      if (freqMap[k] > mostFrequentCount) {
        mostFrequentCount = freqMap[k];
      }
    });
    const mostFrequentWords = uniqueKeywords.filter(k => freqMap[k] === mostFrequentCount && mostFrequentCount > 0);
    return { mostFrequentWords, mostFrequentCount, uniqueKeywords };
  }

  function getHighestDensity(mostFrequentCount, wordCount) {
    return wordCount > 0 ? ((mostFrequentCount / wordCount) * 100).toFixed(1) : '0.0';
  }

  function analyzeKeywords(input, removeStopWords, freqMap, uniqueKeywords, stats, isInputChanged) {
    isInputChanged.value = false;

    const words = getFilteredWords(input.value, removeStopWords.value);
    
    const charCount = input.value.trim().length;
    const wordCount = words.length;

    freqMap.value = getFrequencyMap(words);
    
    const { mostFrequentWords, mostFrequentCount, uniqueKeywords: uniqueKeys } = getMostFrequentWords(freqMap.value);
    
    uniqueKeywords.value = uniqueKeys;
    
    const uniqueCount = uniqueKeywords.value.length;
    const highestDensity = getHighestDensity(mostFrequentCount, wordCount);
    
    stats.value = {
      charCount,
      wordCount,
      uniqueCount,
      mostFrequent: mostFrequentWords,
      highestDensity,
    };
    
    return { wordCount, uniqueKeywords: uniqueKeys };
  }

  function updateTableData(uniqueKeywords, freqMap, wordCount, currentPage, perPage) {
    return uniqueKeywords.value
      .map(k => ({
        keyword: k,
        count: freqMap.value[k],
        density: wordCount > 0 ? ((freqMap.value[k] / wordCount) * 100).toFixed(1) : '0.0',
      }))
      .sort((a, b) => b.count - a.count)
      .slice((currentPage - 1) * perPage, currentPage * perPage);
  }

  return {
    analyzeKeywords,
    updateTableData,
  };
} 