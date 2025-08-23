export function pow(n: number, p: number): number {
    if (n === 0) {
        if (p < 0) {
            throw new Error("Math Error!");
        }
        return 0;
    } else if (p === 0) {
        return 1;
    }

    if (p % 2 === 0) {
        return pow(n, p / 2) * pow(n, p / 2);
    }

    return n * pow(n, p - 1);
}
