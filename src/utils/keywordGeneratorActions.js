import { MaNotification } from '@mobileaction/action-kit';

export function validateInput(sourceDescriptionText, selectedNGrams, cleanedSourceText, shouldRemoveStopWords) {
    if (!sourceDescriptionText || sourceDescriptionText.trim().length === 0) {
        MaNotification.error({
            title: 'Text Required',
            message: 'Paste an app description or keyword list before generating keyword ideas.'
        });
        return false;
    }

    if (!selectedNGrams || selectedNGrams.length === 0) {
        MaNotification.error({
            title: 'N-Gram Selection Required',
            message: 'Select at least one n-gram size so the generator knows which keyword groups to build.'
        });
        return false;
    }

    if (!cleanedSourceText) {
        MaNotification.error({
            title: 'No Keywords After Cleaning',
            message: shouldRemoveStopWords
                ? 'Your text only contains stop words or unsupported characters. Add more descriptive words or turn off stop word removal.'
                : 'Your text only contains unsupported characters. Add words or phrases before generating keywords.'
        });
        return false;
    }
    return true;
}

export function showSuccessNotification(totalGeneratedKeywordCount, selectedNGramLabels) {
    MaNotification.success({
        title: 'Keywords Generated',
        message: `${totalGeneratedKeywordCount} unique keyword${totalGeneratedKeywordCount === 1 ? '' : 's'} created across ${selectedNGramLabels}.`
    });
}
