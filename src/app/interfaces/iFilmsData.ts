import { Film } from "../models/film";

export interface IFilmsData {
    count: number;
    next: string;
    previous: string;
    _results: Film[];
}