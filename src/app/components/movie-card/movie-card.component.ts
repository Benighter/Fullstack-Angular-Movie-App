import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="movie-card" [routerLink]="['/movie', movie.id]">
      <img [src]="movieService.getImageUrl(movie.poster_path)" [alt]="movie.title">
      <div class="movie-info">
        <h3>{{ movie.title }}</h3>
        <div class="movie-meta">
          <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
          <span class="date">{{ movie.release_date | date:'mediumDate' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .movie-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
      cursor: pointer;
    }
    .movie-card:hover {
      transform: translateY(-5px);
    }
    .movie-card img {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
    }
    .movie-info {
      padding: 1rem;
    }
    .movie-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      color: #666;
    }
    .rating {
      color: #f5c518;
    }
  `]
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(public movieService: MovieService) {}
}