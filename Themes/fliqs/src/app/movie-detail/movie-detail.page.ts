import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  @ViewChild('trailer') trailer: any;

  public movie: Movie;
  public trailerPlaying: boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService) { 

  }

  ngOnInit() {

    this.dataService.categories.pipe(
      map(categories => {

        let allMovies = [];

        categories.forEach((category) => {
          allMovies.push(...category.items);
        });
    
        return allMovies.find(movie => movie.id === this.route.snapshot.paramMap.get('id'));

      })
    ).subscribe((movie: Movie) => {
      if(movie != null){
        this.movie = movie;
      }
    });

  }

	togglePlay(){

		this.trailerPlaying ? this.trailer.nativeElement.pause() : this.trailer.nativeElement.play();
		
    this.trailerPlaying = !this.trailerPlaying;
    
	}  

}
