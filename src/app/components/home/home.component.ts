import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { Favorite } from 'src/app/models/favorite.interface';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
    selector: 'app-home',
    template: `
    <app-navbar></app-navbar>

    <div class="text-light text-center m-5">
        <h1>Movies</h1>
    </div>

    <div class="container d-flex flex-wrap justify-content-center">
      <div class="card shadow text-light m-3" style="width: 18rem;" *ngFor="let movie of movies">
        <img src="http://image.tmdb.org/t/p/w500/{{ movie.poster_path }}" class="card-img-top" alt="Movie image">
        <div class="card-body text-center">
          <h5 class="card-title">{{ movie.title }}</h5>
            <div>
              <button type="button" class="btn text-light mx-2" (click)="like(movie.id, 4)"><i class="bi bi-suit-heart-fill"
              [ngClass]="{
                'text-danger': heart == true,
                'text-light': heart == false
                }"></i></button>
              <!-- <button type="button" class="btn text-light mx-2"><i class="bi bi-eye-fill"></i></button> -->
            </div>
        </div>
      </div>
    </div>
  `,
    styles: [
        `
    .card {
      background-color: #100f0fad;
      &:hover {
        animation: scale 0.4s ease;
      }
    }

    @keyframes scale {
        0% {transform: scale(1);}
        100% {transform: scale(1.1);}
    }
    `
    ]
})

export class HomeComponent implements OnInit {

    heart: boolean = false;

    sub!: Subscription | undefined;
    movies: Movie[] | undefined;
    userdata: any = [];
    favorites: Favorite[] | undefined;

    constructor(private moviesSrv: MoviesService, private favoriteSrv: FavoritesService) { }

    ngOnInit(): void {
        this.getFilms();
        this.getProfile();
    }

    getFilms() {
        this.sub = this.moviesSrv.getMovies().subscribe(mov => {
            this.movies = mov;
        });
    }

    getProfile() {
        let userLogged: any = localStorage.getItem('user');
        this.userdata = JSON.parse(userLogged);
    }

    like(movie: number, i: number) {
        this.heart = true;
        this.sub = this.favoriteSrv.getFavorites().subscribe((fav) => {
            this.favorites = fav;
            if (!fav.some(item => item.movieId === movie && item.userId === this.userdata.user.id)) {
                let newFavorite: {
                    movieId: number,
                    userId: number,
                } = {
                    movieId: movie,
                    userId: this.userdata.user.id
                }
                this.sub = this.favoriteSrv.postFavorites(newFavorite).subscribe((ris) => {
                    console.log(ris);
                });
            } else {
                this.sub = this.favoriteSrv.deleteFavorite(i).subscribe((ris) => {
                    console.log(ris);
                });

            }
        });
    }

}
