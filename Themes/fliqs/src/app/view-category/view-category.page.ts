import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { map, debounceTime } from 'rxjs/operators';
import { MovieCategory } from '../interfaces/movie-category';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.page.html',
  styleUrls: ['./view-category.page.scss'],
})
export class ViewCategoryPage implements OnInit {

  public category: MovieCategory;
  public movies: Movie[];
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
        this.movies = this.category.items;
      }
    });

    this.searchForm.get('searchControl').valueChanges.pipe(
      debounceTime(700) 
    ).subscribe(search => {
      this.searching = false;
      this.setFilteredMovies();
    });

  }

  clearFilter(){
    this.movies = this.category.items;
  }

	setFilteredMovies(){
		this.movies = this.dataService.filterMovies(this.searchForm.get('searchControl').value, this.category.items)
	}

	onSearchInput(){
		this.searching = true;
	}

}
