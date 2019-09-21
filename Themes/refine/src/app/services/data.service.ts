import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { RecipeData } from '../interfaces/recipe-data';
import { RecipeCategory } from '../interfaces/recipe-category';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	public recipeData: RecipeData;
	public categories: BehaviorSubject<RecipeCategory[]> = new BehaviorSubject<RecipeCategory[]>([]);

	constructor(private storage: Storage, private http: HttpClient) { 

	}

	load(): void {

		this.storage.get('recipeData').then((data) => {
				
			if(data != null){

				//Load data from storage
				this.recipeData = data;
				this.categories.next(data.categories);

			} else {

				//Load data from source
				this.http.get('assets/data/recipe-data.json').subscribe((res: RecipeData) => {
					this.recipeData = res;
					this.storage.set('recipeData', res);
					this.categories.next(res.categories);
				});

			}

		});

	}

	clearFilter(): void {
		this.categories.next(this.recipeData.categories);
	}

	filterCategories(searchTerm): void {

    this.clearFilter();

		let filteredData = this.categories.value.filter((category) => {
			return category.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});	

		this.categories.next(filteredData);	

	}

	filterRecipes(searchTerm, recipes): Recipe[] {

	  return recipes.filter((recipe) => {
	    return recipe.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});	
		
	}

}