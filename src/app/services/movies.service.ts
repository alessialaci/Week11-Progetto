import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>('http://localhost:4201/movies-popular');
  }

}
