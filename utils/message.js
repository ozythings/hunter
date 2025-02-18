export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const dateFormat = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Istanbul',
        hour12: true,
        long: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}
export const date = () => {
    return new Date().toLocaleString('tr-TR', {
        timeZone: 'Europe/Istanbul',
        hour12: false,
        long: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export const message = msg => console.log(`[${dateFormat()}] ${msg}`);
