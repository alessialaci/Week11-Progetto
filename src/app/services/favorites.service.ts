import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorite } from '../models/favorite.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FavoritesService {

    constructor(private http: HttpClient) { }

    getFavorites(): Observable<Favorite[]> {
        return this.http.get<Favorite[]>('http://localhost:4201/favorites');
    }

    postFavorites(newFavorite: Partial<Favorite>) {
        return this.http.post<Favorite>('http://localhost:4201/favorites', newFavorite);
    }

    deleteFavorite(id: number) {
        return this.http.delete(`http://localhost:4201/favorites/${id}`);
    }

}
