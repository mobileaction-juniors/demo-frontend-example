import { cleanDescription } from '@/utils/CleanDescription';
import { generateNGrams } from '@/utils/generateNGrams';

export function validateInput(sourceDescriptionText, selectedNGrams, cleanedSourceText, shouldRemoveStopWords) {
    if (!sourceDescriptionText || sourceDescriptionText.trim().length === 0) {
        return { 
            isValid: false, 
            errorTitle: 'Text Required', 
            errorMessage: 'Paste an app description or keyword list before generating keyword ideas.' 
        };
    }

    if (!selectedNGrams || selectedNGrams.length === 0) {
        return { 
            isValid: false, 
            errorTitle: 'N-Gram Selection Required', 
            errorMessage: 'Select at least one n-gram size so the generator knows which keyword groups to build.' 
        };
    }

    if (!cleanedSourceText) {
        return { 
            isValid: false, 
            errorTitle: 'No Keywords After Cleaning', 
            errorMessage: shouldRemoveStopWords
                ? 'Your text only contains stop words or unsupported characters. Add more descriptive words or turn off stop word removal.'
                : 'Your text only contains unsupported characters. Add words or phrases before generating keywords.' 
        };
    }
    return { isValid: true };
}

export function processKeywords(sourceDescriptionText, selectedNGrams, shouldRemoveStopWords) {
    const cleanedText = sourceDescriptionText.trim()
        ? cleanDescription(sourceDescriptionText, shouldRemoveStopWords)
        : '';

    const validation = validateInput(sourceDescriptionText, selectedNGrams, cleanedText, shouldRemoveStopWords);
    
    if (!validation.isValid) {
        return { success: false, error: validation };
    }

    const sortedNGrams = [...selectedNGrams].sort((a, b) => a - b);
    const generatedKeywordNGrams = generateNGrams(cleanedText, sortedNGrams);
    const totalCount = generatedKeywordNGrams.reduce((total, category) => total + category.keywords.length, 0);
    const labels = sortedNGrams.map(n => `${n}-gram`).join(', ');

    return {
        success: true,
        generatedKeywordNGrams,
        totalCount,
        labels
    };
}
