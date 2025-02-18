export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const dateFormat = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Istanbul',
        hour12: true,
        long: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        milliseconds: '3-digit',
    });
}

export const message = msg => console.log(`[${dateFormat()}] ${msg}`);
