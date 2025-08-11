// src/utils/keywordUtils.js
// Temizleme: lower-case, rakam/emoji/punktuasyon temizle, çoklu boşluğu tek boşluğa indir
export function cleanToTokens(text) {
  if (!text) return [];
  const normalized = text
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, " ")   // noktalama/semboller
    .replace(/\d+/g, " ")              // sayılar
    .replace(/\s+/g, " ")              // çoklu boşluk
    .trim();

  // kelime tanımı: boşlukla ayrılmış token
  const tokens = normalized.length ? normalized.split(" ") : [];

  // uniq (ilk görüleni koru)
  const seen = new Set();
  const uniq = [];
  for (const t of tokens) {
    if (!seen.has(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
  return uniq;
}

// n-gram üretimi (uniq; orijinal sıralamayı koru)
export function ngrams(tokens, n) {
  const out = [];
  const seen = new Set();
  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i + n).join(" ");
    if (!seen.has(gram)) {
      seen.add(gram);
      out.push(gram);
    }
  }
  return out;
}

// 1,2,3-gram hepsi
export function generateAllNgrams(text) {
  const tokens = cleanToTokens(text);
  return {
    unigrams: ngrams(tokens, 1),
    bigrams: ngrams(tokens, 2),
    trigrams: ngrams(tokens, 3),
    tokens, // istersen hammadde
  };
}