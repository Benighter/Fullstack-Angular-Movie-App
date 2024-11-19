import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, SearchBarComponent],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="nav-brand">MovieDB</a>
        <app-search-bar></app-search-bar>
        <div class="nav-links">
          <a routerLink="/popular" routerLinkActive="active">Popular</a>
          <a routerLink="/upcoming" routerLinkActive="active">Upcoming</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #032541;
      padding: 1rem;
    }
    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .nav-brand {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 1rem;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .nav-links a.active {
      background: rgba(255,255,255,0.1);
    }
  `]
})
export class NavigationComponent {}