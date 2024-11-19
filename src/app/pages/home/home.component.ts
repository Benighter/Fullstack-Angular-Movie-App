import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="home-container">
      <h1>Popular Movies</h1>
      <div class="movie-grid">
        @for (movie of movies; track movie.id) {
          <app-movie-card [movie]="movie"></app-movie-card>
        }
      </div>
      <div class="load-more">
        <button (click)="loadMore()" class="load-more-button">Load More</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }
    h1 {
      margin-bottom: 2rem;
      color: #032541;
    }
    .movie-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .load-more {
      text-align: center;
    }
    .load-more-button {
      padding: 0.75rem 2rem;
      background: #01b4e4;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-size: 1rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getPopularMovies(this.currentPage).subscribe(
      movies => this.movies = [...this.movies, ...movies]
    );
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }
}