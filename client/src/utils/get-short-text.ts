export const getShortText = (text: string) => {
    return text.split(' ').slice(0, 30).join(' ');
}