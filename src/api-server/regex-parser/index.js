import drop from 'lodash/drop';

export const pickBackReferences = (str, regexp) => {
    if (typeof str !== 'string') return [];
    const match = str.match(regexp);
    if (!match) return [];
    return drop(match, 1);
};