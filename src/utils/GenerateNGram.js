export function generateNGram(input, n) {
    const keywords = input.split(' ')
    const nGrams = new Set() //to remove duplicates
    for (let i = 0; i < keywords.length - (n - 1); i++) {
        nGrams.add(keywords.slice(i, i + n).join(' '))
    }
    return [...nGrams]
}