import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MoviesService {

    constructor(private http: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>('http://localhost:4201/movies-popular');
    }

}
