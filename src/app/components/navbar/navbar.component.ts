import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/']"><img src="../../assets/img/logo.png" alt="Logo"></a>
        <button class="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list text-light"></i>
        </button>
        <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link text-light mx-3 my-2" aria-current="page" [routerLink]="['/']" routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light mx-3 my-2" [routerLink]="['/profile']">Profilo</a>
              </li>
              <button type="submit" class="btn btn-danger mx-3 my-2" (click)="logout()">Logout</button>
            </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
    nav {
      background-color: #100f0fad;
    }

    .navbar-brand img {
      width: 7em;
    }
    `
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authSrv.logout();
  }

}
