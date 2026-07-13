export function oneGramGeneration(cleanedDescription) {
  const oneGram = cleanedDescription.split(" ");
  return removeDuplicateNGrams(oneGram);
}

export function twoGramGeneration(cleanedDescription) {
  const descriptionArray = cleanedDescription.split(" ");
  if (descriptionArray.length < 2) {
    return [];
  }
  const arrTwoGram = [];

  for (let i = 0; i < descriptionArray.length - 1; i++) {
    const twoGram = descriptionArray[i] + " " + descriptionArray[i + 1];
    arrTwoGram.push(twoGram);
  }
  return removeDuplicateNGrams(arrTwoGram);
}

export function threeGramGeneration(cleanedDescription) {
  const descriptionArray = cleanedDescription.split(" ");
  if (descriptionArray.length < 3) {
    return [];
  }
  const arrThreeGram = [];
  for (let i = 0; i < descriptionArray.length - 2; i++) {
    const threeGram =
      descriptionArray[i] +
      " " +
      descriptionArray[i + 1] +
      " " +
      descriptionArray[i + 2];
    arrThreeGram.push(threeGram);
  }
  return removeDuplicateNGrams(arrThreeGram);
}

function removeDuplicateNGrams(ngrams) {
  const uniqueNGrams = new Set(ngrams);
  return [...uniqueNGrams];
}
