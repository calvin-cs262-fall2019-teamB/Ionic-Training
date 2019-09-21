import { Recipe } from './recipe';

export interface RecipeCategory {
    id: string;
    title: string;
    image: string;
    recipes: Recipe[];
}