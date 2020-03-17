import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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

    userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _user$: Observable<User>;

    constructor(private router: Router) {
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

    register(userData) {
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

    private writeUserData(data) {
        const usr = new User();
        if (data) {
            if (data.description) {
                usr.description = data.description;
            }
            usr.name = data.name;
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
