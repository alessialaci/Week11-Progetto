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
              <button type="button" class="btn {{ movie.like ? 'text-danger' : 'text-light' }} mx-2" (click)="like(movie.id, $event)"><i class="bi bi-suit-heart-fill"></i></button>
            </div>
        </div>
      </div>
    </div>
  `,
    styles: [
        `
        .card {
        background-color: #100f0fad;
        transition: all .3s ease-in-out;
            &:hover {
                transform: scale(1.1)
            }
        }
        `
    ]
})

export class HomeComponent implements OnInit {

    sub: Subscription | undefined;
    movies: Movie[] | undefined;
    userdata: any = [];
    favorites: Favorite[] | undefined;

    constructor(private moviesSrv: MoviesService, private favoriteSrv: FavoritesService) { }

    ngOnInit(): void {
        this.getFilms();
        this.getProfile();
        this.load();
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

    load() {
        this.moviesSrv.getMovies().subscribe(movies => {
            this.movies = movies;
            if (this.userdata.user.id !== null) {
                this.favoriteSrv.getFavorites().subscribe(fav => {
                    this.movies = this.movies!.map(movie => {
                        if (fav.find(value => value.movieId === movie.id && value.userId === this.userdata.user.id)) {
                            movie.like = true;
                            movie.userId = this.userdata.user.id;
                        }
                        return movie;
                    })
                })
            }

        })
    }

    like(movie: number, event: any) {
        this.sub = this.favoriteSrv.getFavorites().subscribe((fav) => {
            this.favorites = fav;
            if (fav.find(item => item.movieId === movie && item.userId === this.userdata.user.id)) {
                event.target.classList.remove('text-danger');
                event.target.classList.add('text-light');

                const item = fav.find(item => item.movieId === movie && item.userId === this.userdata.user.id);
                const id = item ? item.id : undefined;

                this.sub = this.favoriteSrv.deleteFavorite(id!).subscribe(() => {
                    console.log('Elemento rimosso dai preferiti');
                });
            } else {
                event.target.classList.add('text-danger');
                event.target.classList.remove('text-light');

                let newFavorite: {
                    movieId: number,
                    userId: number
                } = {
                    movieId: movie,
                    userId: this.userdata.user.id
                }

                this.sub = this.favoriteSrv.postFavorites(newFavorite).subscribe(() => {
                    console.log('Elemento aggiunto ai preferiti');
                });
            }
        });
    }

}
