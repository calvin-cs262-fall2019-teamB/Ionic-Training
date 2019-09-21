import { Movie } from './movie';

export interface MovieCategory {
    id: string;
    title: string;
    items: Movie[];
}