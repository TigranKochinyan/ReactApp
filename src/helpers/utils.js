export function fromatingDate(dateString="") {
    return dateString.slice(0, 10);
}

export function cutText(text) {
    if( text.length < 60 ) {
        return text;
    }
    return `${text.slice(0,60)}...`;
}