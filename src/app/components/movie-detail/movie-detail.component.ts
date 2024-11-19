import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="movie-details">
      @if (movie) {
        <div>
          <img [src]="movie.imageUrl" [alt]="movie.title">
          <h1>{{ movie.title }}</h1>
          <p>{{ movie.description }}</p>
          <p><strong>Release Year:</strong> {{ movie.releaseYear }}</p>
          <p><strong>Genre:</strong> {{ movie.genre }}</p>
          <p><strong>Rating:</strong> {{ movie.rating }}/10</p>
          <button routerLink="/">Back to Movies</button>
        </div>
      } @else {
        <p class="error-message">Movie not found</p>
      }
    </div>
  `
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(
      movie => this.movie = movie
    );
  }
}