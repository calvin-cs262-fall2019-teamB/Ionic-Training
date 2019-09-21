import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { MovieData } from '../interfaces/movie-data';
import { MovieCategory } from '../interfaces/movie-category';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	public movieData: MovieData;
	public categories: BehaviorSubject<MovieCategory[]> = new BehaviorSubject<MovieCategory[]>([]);

	constructor(private http: HttpClient, private storage: Storage) { 

	}

	load(): void {

		this.storage.get('movieData').then((data) => {
			
			if(data != null){

				//Load data from storage
				this.movieData = data;
				this.categories.next(data.categories);

			} else {

				//Load data from source
				this.http.get('assets/data/movie-data.json').subscribe((res: MovieData) => {
					this.movieData = res;
					this.storage.set('movieData', res);
					this.categories.next(res.categories);
				});

			}

		});

  	}

	clearFilter(): void {
		this.categories.next(this.movieData.categories);
	}

	filterCategories(searchTerm): void {

		this.clearFilter();

		let filteredCategories = [];
		let categories = this.categories.value; 

		for(let i = 0; i < categories.length; i++){

			let filteredCategory = {
				id: categories[i].id,
				title: categories[i].title,
				items: []
			};

			categories[i].items.filter((movie) => {

				if(movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
					filteredCategory.items.push(movie);
				}

			});

			if(filteredCategory.items.length > 0){
				filteredCategories.push(filteredCategory);
			}

		}

		this.categories.next(filteredCategories);	


	}

	filterMovies(searchTerm, movies): Movie[] {

		return movies.filter((movie) => {
			return movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});	

	}

	toggleFavouriteMovie(movie): void {

		let updatedMovie = movie;

		updatedMovie.favourite = !updatedMovie.favourite;

		this.updateMovie(updatedMovie);

	}

	updateMovie(movie): void {

		let categories = this.categories.value;

		for(let i = 0; i < categories.length; i++){

			let index = categories[i].items.indexOf(movie);

			if(index > -1){
				categories[i].items[index] = movie;
			}

		}

		this.categories.next(categories);
		this.movieData.categories = categories;
		this.storage.set('movieData', this.movieData);

	}

}