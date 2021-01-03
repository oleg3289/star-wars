import { Person } from "../models/character";

export interface ICharactersData {
    count: number;
    next: string;
    previous: string;
    _results: Person[];
}