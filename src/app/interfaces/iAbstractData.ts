export interface IAbstractData<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}