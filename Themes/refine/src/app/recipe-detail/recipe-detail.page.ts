import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from  '../services/data.service';
import { Recipe } from '../interfaces/recipe';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  public recipe: Recipe;

  constructor(private dataService: DataService, private route: ActivatedRoute) { 

  }

  ngOnInit() {

    this.dataService.categories.pipe(
      map(categories => {

        let allRecipes = [];

        categories.forEach((category) => {
          allRecipes.push(...category.recipes);
        });
    
        return allRecipes.find(recipe => recipe.id === this.route.snapshot.paramMap.get('id'));

      })
    ).subscribe((recipe: Recipe) => {
      if(recipe != null){
        this.recipe = recipe;
      }
    });

  }

}