import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MovieCategory } from '../interfaces/movie-category';
import { Movie } from '../interfaces/movie';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.page.html',
  styleUrls: ['./watch-list.page.scss'],
})
export class WatchListPage implements OnInit {

  public movies: Movie[] = [];

  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    this.dataService.categories.pipe(

      map((categories: MovieCategory[]) => {

        let allMovies = [];

        categories.forEach(category => {
          allMovies.push(...category.items);
        });
        
        let favourites = allMovies.filter((movie) => {
          return movie.favourite;
        });

        return favourites;

      })
      
    ).subscribe((movies) => {
      this.movies = movies;
    });

  }

	toggleFavouriteMovie(movie){
		
		this.dataService.toggleFavouriteMovie(movie);

	}

}