export const generateKeyword = (text) => {

    text = cleanText(text);
    let textArray = text.split(' ');

    const result = [];

    for(let i=1;i<=3;i++){
        result.push({ngram: i, keywords: generateNGram(textArray, i)});
    }

    return result;
}

const cleanText = (text) => {

    const regex = /\s+/g;
    return text.replace(/\s+/g, ' ').trim();
}

const generateNGram = (array, ngram) => {

    const newArray = [];

    for(let i = 0; i <= array.length - ngram; i++){
        const element = array.slice(i, i + ngram).join(" ");
        newArray.push(element);
    }

    return newArray;
}
