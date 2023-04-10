export function generateHash(length): string {
    const rand = (max: number) => Math.floor(Math.random() * Math.floor(max));
    const SYMBOLS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';
    for (let i = 0; i < length; i++) {
        const selector = rand(2);
        result += selector ? SYMBOLS[rand(SYMBOLS.length)] : rand(10);
    }
    return result;
}