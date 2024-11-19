import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="movie-grid">
      @for (movie of movies; track movie.id) {
        <div class="movie-card" [routerLink]="['/movie', movie.id]">
          <img [src]="movieService.getImageUrl(movie.poster_path)" [alt]="movie.title">
          <div class="movie-info">
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.release_date | date:'yyyy' }}</p>
            <div class="rating">
              <span [style.color]="getRatingColor(movie.vote_average)">
                {{ movie.vote_average | number:'1.1-1' }}/10
              </span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .movie-info {
      padding: 1rem;
    }
    .rating {
      font-weight: bold;
      margin-top: 0.5rem;
    }
  `]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.movieService.searchMovies(query).subscribe(
          movies => this.movies = movies
        );
      } else {
        this.movieService.getPopularMovies().subscribe(
          movies => this.movies = movies
        );
      }
    });
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return '#2ecc71';
    if (rating >= 5) return '#f1c40f';
    return '#e74c3c';
  }
}