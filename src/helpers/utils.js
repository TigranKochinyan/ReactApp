export function fromatingDate(dateString="") {
    return dateString.slice(0, 10);
}

export function cutText(text, size=60) {
    if( text.length < size ) {
        return text;
    }
    return `${text.slice(0,size)}...`;
}