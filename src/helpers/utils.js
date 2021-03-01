export function fromatingDate(dateString="") {
    return dateString.slice(0, 10);
}

export function cutText(text = '', size = 60) {
    if( text.length < size ) {
        return text;
    }
    return `${text.slice(0,size)}...`;
}

export function textTransform(text) {
    if (typeof text !== 'string') return '';
    let edited = text.charAt(0).toUpperCase() + text.slice(1);
    return edited.split('_').join(' ');
}