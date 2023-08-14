

export function cleanFunc(wordsArray) {
  const result = wordsArray.split(/\s+/).map(word => word.toLowerCase().trim());
  return [...new Set(result)];
}

export function removeUnwantedWords(wordsArray) {
  const unwantedWords = ['is', 'a', 'an', 'the'];
  return wordsArray.filter((word) => !unwantedWords.includes(word.toLowerCase()));
}

