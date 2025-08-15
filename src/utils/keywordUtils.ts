
export function cleanToTokens(text) {
  if (!text) return [];
  const normalized = text
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, " ")  
    .replace(/\d+/g, " ")              
    .replace(/\s+/g, " ")              
    .trim();

  const tokens = normalized.length ? normalized.split(" ") : [];

  const seen = new Set();
  const uniq = [];
  for (const t of tokens) {
    if (!seen.has(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
return [...new Set(tokens)];
}

export function ngrams({ tokens, size }) {
  const uniqueNgrams = new Set();
  for (let startIndex = 0; startIndex <= tokens.length - size; startIndex++) {
    const ngram = tokens.slice(startIndex, startIndex + size).join(" ");
    uniqueNgrams.add(ngram);
  }
  return [...uniqueNgrams];
}

export function generateAllNgrams(text) {
  const tokens = cleanToTokens(text);
  return {
    unigrams: ngrams({ tokens, size: 1 }),
    bigrams: ngrams({ tokens, size: 2 }),
    trigrams: ngrams({ tokens, size: 3 }),
    tokens, 
  };
}