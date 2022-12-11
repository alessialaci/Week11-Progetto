import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <app-navbar></app-navbar>
    <div class="text-center text-light m-5">
        <h1 class="mb-5">User Details</h1>
        <p>Nome: {{ userdata.user.name }}</p>
        <p>Email: {{ userdata.user.email }}</p>
    </div>
  `,
  styles: [
  ]
})

export class ProfileComponent implements OnInit {

    userdata: any = [];

    constructor() { }

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile() {
        let userLogged: any = localStorage.getItem('user');
        this.userdata = JSON.parse(userLogged);
    }

}
