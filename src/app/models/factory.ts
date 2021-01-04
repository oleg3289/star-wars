export class Factory {
    static create<T>(type: (new (p) => T), p): T {
        return new type(p);
    }
}