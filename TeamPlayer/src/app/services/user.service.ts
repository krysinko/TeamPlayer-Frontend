import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';

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

    constructor() {
    }

    // TODO odpowiednie typy i obsługa logowania
    logIn(): boolean {
        this.userLoggedIn$.next(true);
        return true;
    }

    logOut(): boolean {
        this.userLoggedIn$.next(false);
        return true;
    }

    register(userData) {
        this.api_register(userData).then(() => {
                this.writeUserData(userData);
                this.logIn();
            },
            err => {
            });
    }

    private writeUserData(data) {
        const usr = new User();
        if (data.description) {
            usr.email = data.email;
        }
        usr.name = data.name;
        usr.description = '';
        this.userData = usr;
    }

    private api_register(userdata): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(true);
            }, 600);
        });
    }
}
