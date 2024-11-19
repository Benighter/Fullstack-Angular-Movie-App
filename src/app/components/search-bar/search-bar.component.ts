import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <input
        type="text"
        [(ngModel)]="searchQuery"
        (keyup.enter)="search()"
        placeholder="Search for movies..."
        class="search-input"
      />
      <button (click)="search()" class="search-button">Search</button>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      gap: 0.5rem;
    }
    .search-input {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      width: 300px;
    }
    .search-button {
      padding: 0.5rem 1rem;
      background: #01b4e4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .search-button:hover {
      background: #0099c9;
    }
  `]
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery }
      });
    }
  }
}