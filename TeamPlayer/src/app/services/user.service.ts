import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserApiService } from './api/user-api.service';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    get user(): Observable<User> {
        return this._user$;
    }

    set userData(data) {
        this._user$ = data;
    }
    // todo default false
    userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private userId: number = 3;
    private _user$: Observable<User>;

    constructor(private router: Router, private userApiService: UserApiService
    ) {
        this.getUserData();
    }

    // TODO odpowiednie typy i obsługa logowania
    logIn(): void {
        this.apiLogIn(null).then(
            () => {
                this.userLoggedIn$.next(true);
                this.writeUserData(null);
                this.router.navigate([ '/' ]);
            }, err => {
            }
        );
    }

    logOut(): boolean {
        this.userLoggedIn$.next(false);
        return true;
    }

    register(userData): void {
        this.apiRegister(userData).then(
            () => {
                alert('User registered!');
                this.writeUserData(userData);
                this.logIn();
                this.router.navigate([ '/' ]);
            },
            err => {
            }
        );
    }

    getUserData(id: number = this.userId): Observable<User> {
        return this.userApiService.getUserData(id)
            .pipe(
                map((user: User) => {
                    this.userData = user;
                    return user;
                }),
                catchError((err: HttpErrorResponse) => {
                    switch (err.status) {
                        case 401:
                            break;
                        case 403:
                            break;
                        case 404:
                            break;
                        case 500:
                            break;
                    }
                    return of(null);
                })
            );
    }

    private writeUserData(data): void {
        const usr = new User();
        if (data) {
            if (data.description) {
                usr.description = data.description;
            }
            usr.username = data.name;
            usr.description = '';
        }
        this.userData = usr;
    }

    private apiRegister(userdata): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(true);
            }, 600);
        });
    }

    private apiLogIn(userdata): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(true);
            }, 600);
        });
    }
}
