function removeDuplicateNGrams(ngrams) {
  const uniqueNGrams = new Set(ngrams);
  return [...uniqueNGrams];
}

export function nGramGenerater(cleanedDescription, n) {
  const descriptionArray = cleanedDescription.split(" ");
  if (descriptionArray.length < n) {
    return [];
  }
  const arrNGram = [];
  for (let i = 0; i < descriptionArray.length - (n - 1); i++) {
    arrNGram.push(descriptionArray.slice(i, i + n).join(" "));
  }
  return removeDuplicateNGrams(arrNGram);
}


