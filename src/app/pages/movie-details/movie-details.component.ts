import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetails } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (movie) {
      <div class="movie-details">
        <div class="backdrop" [style.backgroundImage]="'url(' + movieService.getImageUrl(movie.backdrop_path, 'original') + ')'">
          <div class="overlay">
            <div class="content">
              <img [src]="movieService.getImageUrl(movie.poster_path)" [alt]="movie.title" class="poster">
              <div class="info">
                <h1>{{ movie.title }}</h1>
                <div class="meta">
                  <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
                  @if (movie.runtime) {
                    <span class="runtime">{{ movie.runtime }} min</span>
                  }
                  <span class="release">{{ movie.release_date | date:'yyyy' }}</span>
                </div>
                <div class="genres">
                  @for (genre of movie.genres; track genre.id) {
                    <span class="genre">{{ genre.name }}</span>
                  }
                </div>
                <p class="overview">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="cast-section">
          <h2>Cast</h2>
          <div class="cast-grid">
            @for (actor of movie.credits?.cast?.slice(0, 6) || []; track actor.id) {
              <div class="cast-card">
                <img [src]="movieService.getImageUrl(actor.profile_path)" [alt]="actor.name">
                <h3>{{ actor.name }}</h3>
                <p>{{ actor.character }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    } @else {
      <div class="loading">
        <p>Loading movie details...</p>
      </div>
    }
  `,
  styles: [`
    .movie-details {
      min-height: 100vh;
    }
    .backdrop {
      background-size: cover;
      background-position: center;
      min-height: 70vh;
      position: relative;
    }
    .overlay {
      background: rgba(0,0,0,0.7);
      min-height: 70vh;
      padding: 2rem;
    }
    .content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
      color: white;
    }
    .poster {
      width: 300px;
      border-radius: 8px;
    }
    .info {
      flex: 1;
    }
    .meta {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }
    .genres {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    .genre {
      background: rgba(255,255,255,0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
    }
    .cast-section {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }
    .cast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .cast-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .cast-card img {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
    }
    .cast-card h3, .cast-card p {
      padding: 0.5rem;
      margin: 0;
    }
    .cast-card p {
      color: #666;
      font-size: 0.9rem;
    }
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-size: 1.2rem;
      color: #666;
    }
  `]
})
export class MovieDetailsComponent implements OnInit {
  movie?: MovieDetails;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (movie) => this.movie = movie,
        error: (error) => {
          console.error('Error fetching movie details:', error);
          this.error = 'Failed to load movie details';
        }
      });
    }
  }
}