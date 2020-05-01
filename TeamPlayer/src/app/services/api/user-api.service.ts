import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { API_URL, usersApiPath } from './endpoints';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) {
    }

    getUserData(id: number): Observable<User> {
        return this.http.get<User>(API_URL + usersApiPath + id);
    }
}
