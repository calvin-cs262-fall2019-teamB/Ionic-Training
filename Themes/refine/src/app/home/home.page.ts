import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeCategory } from '../interfaces/recipe-category';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  public categories: RecipeCategory[] = [];
  public searching: boolean = false;
  public searchForm: FormGroup;

  constructor(public dataService: DataService){

    this.searchForm = new FormGroup({
      searchControl: new FormControl('')
    });

  }

  ngOnInit(){

    this.dataService.categories.subscribe((categories) => {
      this.categories = categories;
    });

    this.searchForm.get('searchControl').valueChanges.subscribe((search) => {
      this.searching = true;
    })

    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(700) 
    ).subscribe(search => {
      this.searching = false;
      this.setFilteredCategories();
    });

  }

  setFilteredCategories(): void {

    let searchTerm = this.searchForm.get('searchControl').value;

    if(searchTerm.length > 0){
      this.dataService.filterCategories(searchTerm);
    } else {
      this.dataService.clearFilter();
    }

  }

}