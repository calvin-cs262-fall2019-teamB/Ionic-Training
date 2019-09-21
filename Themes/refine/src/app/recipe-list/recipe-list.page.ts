import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { map, debounceTime } from 'rxjs/operators';
import { RecipeCategory } from '../interfaces/recipe-category';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {

  public category: RecipeCategory;
  public recipes: Recipe[];
  public searching: boolean = false;
  public searchForm: FormGroup;

  constructor(public dataService: DataService, private route: ActivatedRoute) { 
    
    this.searchForm = new FormGroup({
      searchControl: new FormControl('')
    });

  }

  ngOnInit() {

    this.dataService.categories.pipe(
      map(categories => {
        return categories.find(category => category.id === this.route.snapshot.paramMap.get('id'));
      })
    ).subscribe(category => {
      if(category != null){
        this.category = category;
        this.recipes = this.category.recipes;
      }
    });

    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(700) 
    ).subscribe(search => {
      this.searching = false;
      this.setFilteredRecipes();
    });

  }

  clearFilter(){
    this.recipes = this.category.recipes;
  }

	setFilteredRecipes(){
		this.recipes = this.dataService.filterRecipes(this.searchForm.get('searchControl').value, this.category.recipes)
	}

	onSearchInput(){
		this.searching = true;
	}

}