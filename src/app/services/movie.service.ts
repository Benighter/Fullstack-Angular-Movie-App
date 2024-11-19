import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Movie, MovieDetails, Genre } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '8d595551f86c5ed63a30f17469f09f1a';
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}&language=en-US`
    ).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=credits&language=en-US`
    ).pipe(
      catchError(this.handleError)
    );
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=en-US&page=1&include_adult=false`
    ).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(
      `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`
    ).pipe(
      map(response => response.genres),
      catchError(this.handleError)
    );
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}