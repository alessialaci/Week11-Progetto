import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:4201/users');
    }

}
