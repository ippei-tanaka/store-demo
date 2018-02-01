import R from "ramda";

export const pickBackReferences = (str, regexp) =>
{
    if (typeof str !== "string") return [];
    const match = str.match(regexp);
    if (!match) return [];
    return R.drop(1, match);
};