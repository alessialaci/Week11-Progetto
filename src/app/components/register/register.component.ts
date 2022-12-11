import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-register',
  template: `
    <div id="background" class="container-fluid d-flex justify-content-center align-items-center">
        <div>
            <img src="../../assets/img/logo.png" class="top-0 start-0 position-absolute" alt="Logo">
        </div>
        <div class="card text-muted text-center px-4">
            <div class="card-body">
                <h1 class="card-title text-light mt-2 mb-5">Sign up</h1>
                <form #form="ngForm" (ngSubmit)="onsubmit(form)">
                    <div class="form-group my-3">
                        <label for="name" class="form-label">Name</label>
                        <input name="name" type="text" class="form-control bg-dark text-light border-secondary" id="name" ngModel>
                    </div>
                    <div class="form-group my-3">
                        <label for="email" class="form-label">Email address</label>
                        <input name="email" type="email" class="form-control bg-dark text-light border-secondary" id="email" required ngModel>
                    </div>
                    <div class="form-group my-3">
                        <label for="password" class="form-label">Password</label>
                        <input name="password" type="password" class="form-control bg-dark text-light border-secondary" id="password" required ngModel>
                    </div>
                    <button type="submit" class="btn btn-danger" [disabled]="form.invalid">Sign up</button>
                </form>
            </div>
            <div class="card-footer my-3">
                <p>Already registered? <a class="text-danger text-decoration-none" [routerLink]="['/login']">Login</a></p>
            </div>
        </div>
    </div>
  `,
  styles: [
    `
    #background {
      height: 100vh;
      background-image: url('../../../assets/img/cover.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      img {
        width: 15em;
        padding: 10px 20px;
      }

    }

    .card {
      background-color: #100f0fad;
      height: fit-content;
      width: 25%;
    }

    @media screen and (max-width: 1200px) {
      .card {
        width: 50%;
      }
    }

    @media screen and (max-width: 576px) {
      .card {
        width: stretch;
      }
    }
    `
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    console.log(form.value)
    try {
      await this.authSrv.registration(form.value).toPromise()
      this.router.navigate(['/login'])
    } catch (error) {
      console.error(error)

    }
  }

}
