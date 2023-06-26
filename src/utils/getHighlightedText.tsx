import React from "react";
import escapeRegExp from "lodash/escapeRegExp";
import normalizeStringForSearch from "./normalizeStringForSearch";
import memoize from "./memoize";

function addAccents(str: string) {
    return str
        .replace(/a/ig, "[aàáâãäåæ]")
        .replace(/c/ig, "[cç]")
        .replace(/i/ig, "[iìíîï]")
        .replace(/n/ig, "[nñ]")
        .replace(/o/ig, "[oòóôõöø]")
        .replace(/s/ig, "[sß]")
        .replace(/u/ig, "[uùúûü]")
        .replace(/y/ig, "[yÿ]")
        .replace(/e/ig, "[eéèêë]")
}

const getHighlightRegexp = memoize((str: string) => {
    return new RegExp(`(${addAccents(escapeRegExp(str))})`, "ig")
});

function getHighlightedText(text: string, highlight: string) {
    const normalizedHighlight = normalizeStringForSearch(highlight);
    const parts = text.split(getHighlightRegexp(highlight));
    return parts.map((part: string, index: number) => (
        <React.Fragment key={index}>
            {normalizeStringForSearch(part) === normalizedHighlight ? (
                <mark>{part}</mark>
            ) : (
                part
            )}
        </React.Fragment>
    ));
}

export default getHighlightedText;
